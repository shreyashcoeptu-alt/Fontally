import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { recommendRoute } from './routes/recommend.mjs'
import { fontsRoute } from './routes/fonts.mjs'
import { historyRoute } from './routes/history.mjs'
import { favouritesRoute } from './routes/favourites.mjs'
import { feedbackRoute } from './routes/feedback.mjs'
import { getModelChain } from './lib/gemini-client.mjs'
import { isSupabaseConfigured, isSupabaseAvailable } from './db/supabase.mjs'

export const app = new Hono()

// Global Middleware
// Browsers may only call the API from Fontally itself (and local dev). This
// stops other sites from spending the Gemini quota through visitors' browsers.
// Extra origins: ALLOWED_ORIGINS=https://a.com,https://b.com
const allowedOrigins = new Set([
  'https://fontally.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
  ...(process.env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean)
])
app.use('/api/*', cors({
  origin: (origin) => (allowedOrigins.has(origin) || /^https:\/\/fontally-[\w-]+\.vercel\.app$/.test(origin) ? origin : null),
  allowHeaders: ['Content-Type', 'x-session-id'],
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS']
}))
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
      geminiModels: getModelChain(),
      supabaseConfigured: isSupabaseConfigured(),
      supabaseReachable: isSupabaseConfigured() && isSupabaseAvailable(),
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
app.route('/api/feedback', feedbackRoute)

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
