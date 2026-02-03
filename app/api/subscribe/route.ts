import { kv } from '@vercel/kv'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return Response.json({ error: 'Invalid email address' }, { status: 400 })
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
        userAgent: request.headers.get('user-agent') || '',
        referer: request.headers.get('referer') || '',
      }),
      kv.zadd('subscribers', { score: now, member: normalized }),
    ])

    return Response.json({ message: 'Subscribed successfully' })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
