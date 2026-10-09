import { Hono } from 'hono'
import {
  getUserFavourites,
  saveUserFavourite,
  deleteUserFavourite
} from '../db/supabase.mjs'

export const favouritesRoute = new Hono()

favouritesRoute.get('/', async (c) => {
  const sessionId = c.req.header('x-session-id') || c.req.query('sessionId')
  if (!sessionId) {
    return c.json({ error: 'Session ID is required.' }, 400)
  }

  const favourites = await getUserFavourites(sessionId)
  return c.json({ favourites })
})

favouritesRoute.post('/', async (c) => {
  const sessionId = c.req.header('x-session-id')
  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body.' }, 400)
  }

  const targetSessionId = sessionId || body.sessionId
  if (!targetSessionId || !body.headingFont || !body.bodyFont) {
    return c.json({ error: 'sessionId, headingFont, and bodyFont are required.' }, 400)
  }

  const saved = await saveUserFavourite({
    sessionId: targetSessionId,
    profileId: body.profileId ? String(body.profileId).slice(0, 100) : null,
    headingFont: String(body.headingFont).slice(0, 120),
    bodyFont: String(body.bodyFont).slice(0, 120),
    label: body.label ? String(body.label).slice(0, 120) : null
  })

  return c.json({ favourite: saved }, 201)
})

favouritesRoute.delete('/:id', async (c) => {
  const sessionId = c.req.header('x-session-id') || c.req.query('sessionId')
  const id = c.req.param('id')

  if (!sessionId || !id) {
    return c.json({ error: 'sessionId and id are required.' }, 400)
  }

  const ok = await deleteUserFavourite(sessionId, id)
  return c.json({ success: ok })
})
