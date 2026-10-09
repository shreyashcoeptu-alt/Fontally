import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { recommendRoute } from './routes/recommend.mjs'
import { fontsRoute } from './routes/fonts.mjs'
import { historyRoute } from './routes/history.mjs'
import { favouritesRoute } from './routes/favourites.mjs'
import { isSupabaseConfigured } from './db/supabase.mjs'

export const app = new Hono()

// Global Middleware
app.use('*', cors())
app.use('*', timing())
if (process.env.NODE_ENV !== 'test') {
  app.use('*', logger())
}

// Health check and system capabilities endpoint
app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    features: {
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
      supabaseConfigured: isSupabaseConfigured(),
      vectorSearchSupported: isSupabaseConfigured(),
      fuzzySearchSupported: true
    }
  })
})

// Sub-routers
app.route('/api/recommend', recommendRoute)
app.route('/api/fonts', fontsRoute)
app.route('/api/history', historyRoute)
app.route('/api/favourites', favouritesRoute)

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found.' }, 404)
})

// Global Error Handler
app.onError((err, c) => {
  console.error('Unhandled app error:', err)
  const status = typeof err.status === 'number' ? err.status : 500
  return c.json({ error: err.message || 'Internal server error.' }, status)
})

export default app
