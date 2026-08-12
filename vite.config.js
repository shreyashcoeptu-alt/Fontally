import { defineConfig } from 'vite'
import { createGeminiRecommendationHandler } from './server/gemini-recommendation.mjs'

export default defineConfig({
  plugins: [{
    name: 'fontally-gemini-api',
    configureServer(server) {
      server.middlewares.use('/api/recommend', createGeminiRecommendationHandler())
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/recommend', createGeminiRecommendationHandler())
    }
  }]
})
