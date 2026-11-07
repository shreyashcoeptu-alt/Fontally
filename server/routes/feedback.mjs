import { Hono } from 'hono'
import { recordFeedback, CHOICE_EVENTS } from '../db/supabase.mjs'
import { clientIp, createRateLimiter } from '../lib/rate-limit.mjs'
import { SERVER_PROFILE_IDS } from '../lib/candidates.mjs'
import { normalizeBriefKey } from '../../shared/brief-key.js'

const isRateLimited = createRateLimiter({ limit: 60, windowMs: 60_000 })

export const feedbackRoute = new Hono()

/**
 * POST /api/feedback  { briefKey, profileId, event }
 * event: choose_alternate | copy_css | save | open_google_fonts
 * Used to promote the alternate visitors actually pick for a brief.
 */
feedbackRoute.post('/', async (c) => {
  if (isRateLimited(clientIp(c))) return c.json({ error: 'Too many feedback events.' }, 429)

  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body.' }, 400)
  }

  const briefKey = normalizeBriefKey(body.briefKey)
  const profileId = String(body.profileId || '')
  const event = String(body.event || '')
  if (!briefKey || !SERVER_PROFILE_IDS.has(profileId) || !CHOICE_EVENTS.has(event)) {
    return c.json({ error: 'briefKey, a known profileId, and a valid event are required.' }, 400)
  }

  await recordFeedback({
    sessionId: c.req.header('x-session-id') || null,
    briefKey,
    profileId,
    event
  })
  return c.json({ ok: true }, 202)
})
