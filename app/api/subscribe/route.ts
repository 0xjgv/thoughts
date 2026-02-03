import { kv } from '@vercel/kv'
import { headers } from 'next/headers'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const MAX_SUBSCRIPTIONS_PER_DEVICE = 3

export async function POST(request: Request) {
  try {
    const { email, visitorId } = await request.json()

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (visitorId && typeof visitorId === 'string') {
      const deviceCount = await kv.scard(`device:${visitorId}`)
      if (deviceCount >= MAX_SUBSCRIPTIONS_PER_DEVICE) {
        return Response.json({ error: 'Too many subscriptions' }, { status: 429 })
      }
    }

    const normalized = email.toLowerCase().trim()
    const key = `subscriber:${normalized}`

    const existing = await kv.exists(key)
    if (existing) {
      return Response.json({ error: 'Already subscribed' }, { status: 409 })
    }

    const h = await headers()
    const now = Date.now()

    await Promise.all([
      kv.hset(key, {
        email: normalized,
        subscribedAt: new Date(now).toISOString(),
        ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() || '',
        userAgent: h.get('user-agent') || '',
        referer: h.get('referer') || '',
        country: h.get('x-vercel-ip-country') || '',
        city: h.get('x-vercel-ip-city') || '',
        region: h.get('x-vercel-ip-country-region') || '',
        visitorId: visitorId || '',
      }),
      kv.zadd('subscribers', { score: now, member: normalized }),
      ...(visitorId ? [kv.sadd(`device:${visitorId}`, normalized)] : []),
    ])

    return Response.json({ message: 'Subscribed successfully' })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
