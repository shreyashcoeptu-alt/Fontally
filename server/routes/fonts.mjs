import { Hono } from 'hono'
import { ENRICHED_FONT_CATALOG, FONT_MAP } from '../lib/font-catalog.mjs'
import { createFontSearchIndex } from '../lib/fuzzy.mjs'
import { getGeminiEmbedding, cosineSimilarity } from '../lib/embeddings.mjs'
import { searchFontsWithVector, getSupabaseClient } from '../db/supabase.mjs'

// Import base fonts list for full 250+ font coverage
let allFontsCatalog = []

// Initialize consolidated catalog
function getUnifiedCatalog() {
  if (allFontsCatalog.length > 0) return allFontsCatalog

  const map = new Map()

  // First add enriched fonts with rich tags and descriptions
  for (const font of ENRICHED_FONT_CATALOG) {
    map.set(font.family.toLowerCase(), {
      ...font,
      variants: font.variants || ['400'],
      is_variable: font.is_variable ?? false,
      min_weight: font.min_weight ?? 400,
      max_weight: font.max_weight ?? 700,
      mood_tags: font.mood_tags || [],
      description: font.description || `${font.family} is a ${font.category} typeface.`,
      googleFontsUrl: `https://fonts.google.com/specimen/${encodeURIComponent(font.family).replace(/%20/g, '+')}`
    })
  }

  allFontsCatalog = Array.from(map.values())
  return allFontsCatalog
}

// Build fuzzy search index
let fuzzyIndex = null
function getFuzzyIndex() {
  if (!fuzzyIndex) {
    fuzzyIndex = createFontSearchIndex(getUnifiedCatalog())
  }
  return fuzzyIndex
}

export const fontsRoute = new Hono()

/**
 * GET /api/fonts
 * Query params:
 *   q / query: search term or mood phrase
 *   category: sans-serif | serif | display | monospace | handwriting | all
 *   variable: boolean
 *   min_weight: number
 *   max_weight: number
 *   mode: auto | fuzzy | semantic
 *   limit: number
 */
fontsRoute.get('/', async (c) => {
  const query = (c.req.query('q') || c.req.query('query') || '').trim()
  const category = (c.req.query('category') || '').trim().toLowerCase()
  const isVariableParam = c.req.query('variable')
  const minWeightParam = c.req.query('min_weight')
  const maxWeightParam = c.req.query('max_weight')
  const mode = (c.req.query('mode') || 'auto').toLowerCase()
  const limit = Math.min(500, Math.max(1, parseInt(c.req.query('limit') || '250', 10)))

  const catalog = getUnifiedCatalog()

  // Base filter predicate
  const matchesFilters = (font) => {
    if (category && category !== 'all' && font.category.toLowerCase() !== category) {
      return false
    }
    if (isVariableParam !== undefined && isVariableParam !== '') {
      const wantVariable = isVariableParam === 'true' || isVariableParam === '1'
      if (Boolean(font.is_variable) !== wantVariable) return false
    }
    if (minWeightParam) {
      const minW = parseInt(minWeightParam, 10)
      if (!isNaN(minW) && font.max_weight < minW) return false
    }
    if (maxWeightParam) {
      const maxW = parseInt(maxWeightParam, 10)
      if (!isNaN(maxW) && font.min_weight > maxW) return false
    }
    return true
  }

  // Case 1: Empty search query -> Return filtered catalog sorted by popularity
  if (!query) {
    const filtered = catalog.filter(matchesFilters)
    filtered.sort((a, b) => (b.popularity || 50) - (a.popularity || 50))
    return c.json({
      total: filtered.length,
      searchMode: 'filter',
      fonts: filtered.slice(0, limit)
    })
  }

  // Case 2: Semantic / Vector search requested or detected (e.g. multi-word mood prompt)
  const isSemanticIntent = mode === 'semantic' || (mode === 'auto' && query.split(/\s+/).length >= 2 && !catalog.some((f) => f.family.toLowerCase() === query.toLowerCase()))
  
  if (isSemanticIntent) {
    try {
      const embedding = await getGeminiEmbedding(query)
      if (embedding) {
        // Try Supabase pgvector search first if configured
        const dbResults = await searchFontsWithVector(embedding, {
          category,
          isVariable: isVariableParam !== undefined && isVariableParam !== '' ? (isVariableParam === 'true' || isVariableParam === '1') : null,
          limit
        })

        if (dbResults && dbResults.length > 0) {
          return c.json({
            total: dbResults.length,
            searchMode: 'vector_pgvector',
            fonts: dbResults.slice(0, limit)
          })
        }
      }
    } catch (err) {
      console.warn('Semantic search error, falling back to fuzzy:', err.message)
    }
  }

  // Case 3: Fuzzy search via Fuse.js
  const index = getFuzzyIndex()
  const searchResults = index.search(query)

  const matched = []
  for (const { item, score } of searchResults) {
    if (matchesFilters(item)) {
      matched.push({
        ...item,
        searchScore: Number((1 - (score || 0)).toFixed(3))
      })
    }
  }

  return c.json({
    total: matched.length,
    searchMode: 'fuzzy',
    fonts: matched.slice(0, limit)
  })
})

/**
 * GET /api/fonts/similar/:family
 * Finds fonts with similar typographic feel, category, and mood tags.
 */
fontsRoute.get('/similar/:family', async (c) => {
  const targetFamily = decodeURIComponent(c.req.param('family') || '').trim()
  const limit = Math.min(20, Math.max(1, parseInt(c.req.query('limit') || '6', 10)))

  const catalog = getUnifiedCatalog()
  const target = catalog.find((f) => f.family.toLowerCase() === targetFamily.toLowerCase())

  if (!target) {
    return c.json({ error: `Font '${targetFamily}' not found in catalog.` }, 404)
  }

  // Vector / mood similarity calculation
  const targetTags = new Set((target.mood_tags || []).map((t) => t.toLowerCase()))
  const scored = catalog
    .filter((f) => f.family.toLowerCase() !== target.family.toLowerCase())
    .map((candidate) => {
      let score = 0

      // Same category bonus
      if (candidate.category.toLowerCase() === target.category.toLowerCase()) {
        score += 0.4
      }

      // Shared tags Jaccard similarity
      const candidateTags = (candidate.mood_tags || []).map((t) => t.toLowerCase())
      let sharedCount = 0
      for (const tag of candidateTags) {
        if (targetTags.has(tag)) sharedCount++
      }
      const unionCount = targetTags.size + candidateTags.length - sharedCount
      if (unionCount > 0) {
        score += (sharedCount / unionCount) * 0.5
      }

      // Both variable font compatibility
      if (Boolean(candidate.is_variable) === Boolean(target.is_variable)) {
        score += 0.1
      }

      return {
        ...candidate,
        similarity: Number(score.toFixed(3))
      }
    })

  scored.sort((a, b) => b.similarity - a.similarity)

  return c.json({
    targetFont: target.family,
    category: target.category,
    similar: scored.slice(0, limit)
  })
})
