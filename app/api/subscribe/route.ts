import { kv } from '@vercel/kv'
import { headers } from 'next/headers'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const IP_RATE_LIMIT = 5
const IP_RATE_WINDOW_MS = 3600 * 1000 // 1 hour

const ipRateMap = new Map<string, { count: number; resetAt: number }>()

function checkIpRate(ip: string): boolean {
  const now = Date.now()

  // Lazy cleanup: remove stale entries
  ipRateMap.forEach((entry, key) => {
    if (now > entry.resetAt) ipRateMap.delete(key)
  })

  const entry = ipRateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + IP_RATE_WINDOW_MS })
    return true
  }

  entry.count++
  return entry.count <= IP_RATE_LIMIT
}

export async function POST(request: Request) {
  try {
    const { email, visitorId } = await request.json()

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (!visitorId || typeof visitorId !== 'string') {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }

    const h = await headers()
    const ip = h.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

    if (!checkIpRate(ip)) {
      return Response.json({ error: 'Too many attempts' }, { status: 429 })
    }

    const normalized = email.toLowerCase().trim()
    const key = `subscriber:${normalized}`

    const existing = await kv.exists(key)
    if (existing) {
      return Response.json({ error: 'Already subscribed' }, { status: 409 })
    }

    const now = Date.now()

    await Promise.all([
      kv.hset(key, {
        email: normalized,
        subscribedAt: new Date(now).toISOString(),
        ip,
        userAgent: h.get('user-agent') || '',
        referer: h.get('referer') || '',
        country: h.get('x-vercel-ip-country') || '',
        city: h.get('x-vercel-ip-city') || '',
        region: h.get('x-vercel-ip-country-region') || '',
        visitorId,
      }),
      kv.zadd('subscribers', { score: now, member: normalized }),
    ])

    return Response.json({ message: 'Subscribed successfully' })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
