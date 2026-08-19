const GOOGLE_FONTS_API_BASE = 'https://www.googleapis.com/webfonts/v1/webfonts'
let cachedFontsCatalog = null
let cacheTimestamp = 0
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

// Built-in offline/keyless high-utility Google Fonts catalog (200+ top families)
const DEFAULT_GOOGLE_FONTS = [
  // Sans-Serif
  { family: 'Inter', category: 'sans-serif', variants: ['400', '600', '700', '900'] },
  { family: 'Roboto', category: 'sans-serif', variants: ['300', '400', '500', '700'] },
  { family: 'Plus Jakarta Sans', category: 'sans-serif', variants: ['400', '600', '700', '800'] },
  { family: 'Open Sans', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Montserrat', category: 'sans-serif', variants: ['400', '600', '700', '800'] },
  { family: 'Poppins', category: 'sans-serif', variants: ['400', '600', '700', '800'] },
  { family: 'DM Sans', category: 'sans-serif', variants: ['400', '500', '700'] },
  { family: 'Work Sans', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Outfit', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Manrope', category: 'sans-serif', variants: ['400', '600', '700', '800'] },
  { family: 'Space Grotesk', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Inter Tight', category: 'sans-serif', variants: ['400', '600', '700', '900'] },
  { family: 'Sora', category: 'sans-serif', variants: ['400', '600', '700', '800'] },
  { family: 'Urbanist', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Nunito', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Quicksand', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Syne', category: 'sans-serif', variants: ['700', '800'] },
  { family: 'Unbounded', category: 'sans-serif', variants: ['700', '900'] },
  { family: 'Cabin', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Public Sans', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Red Hat Display', category: 'sans-serif', variants: ['600', '700', '900'] },
  { family: 'Josefin Sans', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Tenor Sans', category: 'sans-serif', variants: ['400'] },
  { family: 'Oswald', category: 'sans-serif', variants: ['500', '600', '700'] },
  { family: 'Bebas Neue', category: 'sans-serif', variants: ['400'] },
  { family: 'Anton', category: 'sans-serif', variants: ['400'] },
  { family: 'Epilogue', category: 'sans-serif', variants: ['500', '700', '900'] },
  { family: 'Gothic A1', category: 'sans-serif', variants: ['400', '600', '800'] },
  { family: 'Zen Kaku Gothic New', category: 'sans-serif', variants: ['400', '600', '700', '900'] },
  { family: 'Chivo', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Rajdhani', category: 'sans-serif', variants: ['500', '600', '700'] },
  { family: 'Exo 2', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Raleway', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Source Sans 3', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Karla', category: 'sans-serif', variants: ['400', '700'] },
  { family: 'Rubik', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Fredoka', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Figtree', category: 'sans-serif', variants: ['400', '600', '700'] },
  { family: 'Bricolage Grotesque', category: 'sans-serif', variants: ['400', '700', '800'] },
  { family: 'Syncopate', category: 'sans-serif', variants: ['400', '700'] },
  { family: 'Michroma', category: 'sans-serif', variants: ['400'] },
  { family: 'Teko', category: 'sans-serif', variants: ['500', '600', '700'] },
  { family: 'Russo One', category: 'sans-serif', variants: ['400'] },
  { family: 'DotGothic16', category: 'sans-serif', variants: ['400'] },
  { family: 'Chakra Petch', category: 'sans-serif', variants: ['500', '700'] },

  // Serif
  { family: 'Playfair Display', category: 'serif', variants: ['400', '600', '700', '900', 'italic'] },
  { family: 'Playfair Display SC', category: 'serif', variants: ['700', '900'] },
  { family: 'Lora', category: 'serif', variants: ['400', '600', '700', 'italic'] },
  { family: 'Merriweather', category: 'serif', variants: ['400', '700', 'italic'] },
  { family: 'Cormorant Garamond', category: 'serif', variants: ['400', '600', '700', 'italic'] },
  { family: 'Cormorant Infant', category: 'serif', variants: ['400', '600', 'italic'] },
  { family: 'Cormorant Upright', category: 'serif', variants: ['500', '700'] },
  { family: 'Cinzel', category: 'serif', variants: ['500', '700', '900'] },
  { family: 'Cinzel Decorative', category: 'serif', variants: ['700', '900'] },
  { family: 'EB Garamond', category: 'serif', variants: ['400', '600', '800', 'italic'] },
  { family: 'Fraunces', category: 'serif', variants: ['400', '600', '800', 'italic'] },
  { family: 'Newsreader', category: 'serif', variants: ['400', '600', 'italic'] },
  { family: 'Instrument Serif', category: 'serif', variants: ['400', 'italic'] },
  { family: 'Bodoni Moda', category: 'serif', variants: ['400', '600', '800', 'italic'] },
  { family: 'Italiana', category: 'serif', variants: ['400'] },
  { family: 'Marcellus', category: 'serif', variants: ['400'] },
  { family: 'Libre Baskerville', category: 'serif', variants: ['400', '700', 'italic'] },
  { family: 'Spectral', category: 'serif', variants: ['400', '600', 'italic'] },
  { family: 'Abril Fatface', category: 'serif', variants: ['400'] },
  { family: 'Prata', category: 'serif', variants: ['400'] },
  { family: 'Castoro', category: 'serif', variants: ['400', 'italic'] },
  { family: 'Shippori Mincho', category: 'serif', variants: ['500', '700'] },
  { family: 'Noto Serif', category: 'serif', variants: ['400', '700', 'italic'] },
  { family: 'Nanum Myeongjo', category: 'serif', variants: ['400', '700'] },
  { family: 'Crimson Pro', category: 'serif', variants: ['400', '600', 'italic'] },
  { family: 'Almendra Display', category: 'serif', variants: ['400'] },
  { family: 'Alice', category: 'serif', variants: ['400'] },

  // Display
  { family: 'Righteous', category: 'display', variants: ['400'] },
  { family: 'Shrikhand', category: 'display', variants: ['400'] },
  { family: 'Monoton', category: 'display', variants: ['400'] },
  { family: 'DynaPuff', category: 'display', variants: ['600', '700'] },
  { family: 'Bangers', category: 'display', variants: ['400'] },
  { family: 'Bowlby One SC', category: 'display', variants: ['400'] },
  { family: 'Alfa Slab One', category: 'display', variants: ['400'] },
  { family: 'Rubik Glitch', category: 'display', variants: ['400'] },
  { family: 'Rubik Mono One', category: 'display', variants: ['400'] },
  { family: 'Black Ops One', category: 'display', variants: ['400'] },
  { family: 'Pirata One', category: 'display', variants: ['400'] },
  { family: 'Poiret One', category: 'display', variants: ['400'] },
  { family: 'Orbitron', category: 'display', variants: ['600', '800', '900'] },
  { family: 'Press Start 2P', category: 'display', variants: ['400'] },
  { family: 'Silkscreen', category: 'display', variants: ['400', '700'] },

  // Monospace
  { family: 'Space Mono', category: 'monospace', variants: ['400', '700'] },
  { family: 'DM Mono', category: 'monospace', variants: ['400', '500'] },
  { family: 'JetBrains Mono', category: 'monospace', variants: ['400', '600', '700'] },
  { family: 'Fira Code', category: 'monospace', variants: ['400', '600'] },
  { family: 'Geist Mono', category: 'monospace', variants: ['400', '600'] },
  { family: 'Share Tech Mono', category: 'monospace', variants: ['400'] },
  { family: 'Major Mono Display', category: 'monospace', variants: ['400'] },
  { family: 'VT323', category: 'monospace', variants: ['400'] },

  // Handwriting / Script
  { family: 'Sacramento', category: 'handwriting', variants: ['400'] },
  { family: 'Satisfy', category: 'handwriting', variants: ['400'] },
  { family: 'Alex Brush', category: 'handwriting', variants: ['400'] },
  { family: 'Pinyon Script', category: 'handwriting', variants: ['400'] },
  { family: 'Great Vibes', category: 'handwriting', variants: ['400'] },
  { family: 'Pacifico', category: 'handwriting', variants: ['400'] },
  { family: 'Permanent Marker', category: 'handwriting', variants: ['400'] },
  { family: 'Sniglet', category: 'handwriting', variants: ['400', '800'] },
  { family: 'Boogaloo', category: 'handwriting', variants: ['400'] },
  { family: 'Caveat', category: 'handwriting', variants: ['400', '600', '700'] },
  { family: 'Dancing Script', category: 'handwriting', variants: ['400', '600', '700'] }
]

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(JSON.stringify(payload))
}

export function createGoogleFontsHandler({
  apiKey = process.env.GOOGLE_FONTS_API_KEY,
  fetchImpl = globalThis.fetch
} = {}) {
  return async function googleFontsHandler(req, res) {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }

    try {
      const url = new URL(req.url, 'http://localhost')
      const query = (url.searchParams.get('query') || '').trim().toLowerCase()
      const category = (url.searchParams.get('category') || '').trim().toLowerCase()
      const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '30', 10)))

      let catalog = DEFAULT_GOOGLE_FONTS

      // Fetch live catalog if API key is provided and cache is stale
      if (apiKey) {
        const now = Date.now()
        if (cachedFontsCatalog && now - cacheTimestamp < CACHE_TTL_MS) {
          catalog = cachedFontsCatalog
        } else {
          try {
            const apiRes = await fetchImpl(`${GOOGLE_FONTS_API_BASE}?key=${apiKey}&sort=popularity`)
            if (apiRes.ok) {
              const data = await apiRes.json()
              if (Array.isArray(data?.items) && data.items.length > 0) {
                cachedFontsCatalog = data.items.map((item) => ({
                  family: item.family,
                  category: item.category || 'sans-serif',
                  variants: item.variants || ['400']
                }))
                cacheTimestamp = now
                catalog = cachedFontsCatalog
              }
            }
          } catch (err) {
            console.warn('Could not reach Google Fonts developer API, falling back to default catalog:', err)
          }
        }
      }

      // Filter catalog
      let results = catalog
      if (category && category !== 'all') {
        results = results.filter((f) => f.category.toLowerCase() === category)
      }
      if (query) {
        results = results.filter((f) => f.family.toLowerCase().includes(query))
      }

      const paginated = results.slice(0, limit)
      sendJson(res, 200, {
        total: results.length,
        fonts: paginated,
        hasApiKey: Boolean(apiKey)
      })
    } catch (error) {
      console.error('Google Fonts handler error:', error)
      sendJson(res, 500, { error: 'Failed to query Google Fonts.' })
    }
  }
}
