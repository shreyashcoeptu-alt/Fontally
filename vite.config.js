import { defineConfig, loadEnv } from 'vite'
import { createGeminiRecommendationHandler } from './server/gemini-recommendation.mjs'
import { createGoogleFontsHandler } from './server/google-fonts.mjs'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const createRecommendationHandler = () => createGeminiRecommendationHandler({
    apiKey: env.GEMINI_API_KEY,
    model: env.GEMINI_MODEL
  })
  const createFontsHandler = () => createGoogleFontsHandler({
    apiKey: env.GOOGLE_FONTS_API_KEY
  })

  return {
    plugins: [{
      name: 'fontally-api-endpoints',
      configureServer(server) {
        server.middlewares.use('/api/recommend', createRecommendationHandler())
        server.middlewares.use('/api/fonts', createFontsHandler())
      },
      configurePreviewServer(server) {
        server.middlewares.use('/api/recommend', createRecommendationHandler())
        server.middlewares.use('/api/fonts', createFontsHandler())
      }
    }]
  }
})
