import { createGoogleFontsHandler } from '../server/google-fonts.mjs'

const handler = createGoogleFontsHandler({
  apiKey: process.env.GOOGLE_FONTS_API_KEY
})

export default async function fontsApi(req, res) {
  return handler(req, res)
}
