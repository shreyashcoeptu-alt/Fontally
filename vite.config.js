import { defineConfig, loadEnv } from 'vite'
import { createGeminiRecommendationHandler } from './server/gemini-recommendation.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const createHandler = () => createGeminiRecommendationHandler({
    apiKey: env.GEMINI_API_KEY,
    model: env.GEMINI_MODEL
  })

  return {
    plugins: [{
      name: 'fontally-gemini-api',
      configureServer(server) {
        server.middlewares.use('/api/recommend', createHandler())
      },
      configurePreviewServer(server) {
        server.middlewares.use('/api/recommend', createHandler())
      }
    }]
  }
})
