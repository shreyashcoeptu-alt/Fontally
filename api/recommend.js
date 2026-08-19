import { createGeminiRecommendationHandler } from '../server/gemini-recommendation.mjs'

const handler = createGeminiRecommendationHandler({
  apiKey: process.env.GEMINI_API_KEY,
  model: process.env.GEMINI_MODEL
})

export default async function recommendApi(req, res) {
  return handler(req, res)
}
