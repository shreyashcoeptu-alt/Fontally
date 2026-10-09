import { Hono } from 'hono'
import { getUserHistory, saveUserHistory } from '../db/supabase.mjs'

export const historyRoute = new Hono()

historyRoute.get('/', async (c) => {
  const sessionId = c.req.header('x-session-id') || c.req.query('sessionId')
  if (!sessionId) {
    return c.json({ error: 'Session ID is required.' }, 400)
  }

  const limit = Math.min(100, Math.max(1, parseInt(c.req.query('limit') || '20', 10)))
  const history = await getUserHistory(sessionId, limit)
  return c.json({ history })
})

historyRoute.post('/', async (c) => {
  const sessionId = c.req.header('x-session-id')
  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body.' }, 400)
  }

  const targetSessionId = sessionId || body.sessionId
  if (!targetSessionId || !body.brief || !body.profileId) {
    return c.json({ error: 'sessionId, brief, and profileId are required.' }, 400)
  }

  const saved = await saveUserHistory({
    sessionId: targetSessionId,
    brief: String(body.brief).slice(0, 1500),
    profileId: String(body.profileId).slice(0, 100),
    rationale: body.rationale ? String(body.rationale).slice(0, 1000) : null,
    tags: Array.isArray(body.tags) ? body.tags.slice(0, 10) : []
  })

  return c.json({ entry: saved }, 201)
})
