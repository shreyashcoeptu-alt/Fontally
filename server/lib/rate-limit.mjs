// Sliding-window, in-memory rate limiter keyed by client IP.
// Per serverless instance only, which is enough to stop one client from draining
// the shared Gemini quota. Use a shared store (e.g. Upstash) if you need it global.

export function clientIp(c) {
  return c.req.header('x-forwarded-for')?.split(',')[0]?.trim() || c.req.header('x-real-ip') || 'local'
}

export function createRateLimiter({ limit, windowMs = 60_000 }) {
  const hits = new Map()
  let lastSweep = 0

  return function isLimited(key) {
    const now = Date.now()
    // Periodically drop idle keys so the map cannot grow without bound
    if (now - lastSweep > windowMs) {
      lastSweep = now
      for (const [k, stamps] of hits) {
        if (!stamps.length || now - stamps[stamps.length - 1] >= windowMs) hits.delete(k)
      }
    }
    const recent = (hits.get(key) || []).filter((t) => now - t < windowMs)
    recent.push(now)
    hits.set(key, recent)
    return recent.length > limit
  }
}
