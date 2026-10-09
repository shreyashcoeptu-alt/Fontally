import { defineConfig, loadEnv } from 'vite'
import { handle } from 'hono/vercel'
import app from './server/app.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Inject loaded env variables into process.env for server modules
  Object.assign(process.env, env)

  const honoHandler = handle(app)

  const apiMiddleware = (req, res, next) => {
    if (req.url && req.url.startsWith('/api')) {
      return honoHandler(req, res)
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
