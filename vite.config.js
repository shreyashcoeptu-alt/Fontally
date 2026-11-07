import { defineConfig, loadEnv } from 'vite'
import { getRequestListener } from '@hono/node-server'

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Inject loaded env variables into process.env before server modules read them
  Object.assign(process.env, env)

  const { default: app } = await import('./server/app.mjs')

  // Vite's dev server speaks Node (req, res); Hono speaks Web Request/Response.
  // getRequestListener bridges the two (hono/vercel's handle() does not).
  const honoListener = getRequestListener(app.fetch)

  const apiMiddleware = (req, res, next) => {
    if (req.url && req.url.startsWith('/api')) {
      return honoListener(req, res)
    }
    next()
  }

  return {
    plugins: [{
      name: 'fontally-hono-api-middleware',
      configureServer(server) {
        server.middlewares.use(apiMiddleware)
      },
      configurePreviewServer(server) {
        server.middlewares.use(apiMiddleware)
      }
    }]
  }
})
