const GEMINI_EMBED_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const DEFAULT_EMBED_MODEL = 'gemini-embedding-001'

const embeddingCache = new Map()
const MAX_EMBEDDING_CACHE = 500

/**
 * Calculates cosine similarity between two float vectors.
 */
export function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0
  let dotProduct = 0
  let normA = 0
  let normB = 0
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }
  if (normA === 0 || normB === 0) return 0
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

/**
 * Normalizes cache key for embedding strings.
 */
function normalizeTextKey(text) {
  return String(text || '').trim().toLowerCase().slice(0, 1000)
}

/**
 * Generates an embedding vector (768 dimensions) using Gemini embedding models.
 */
export async function getGeminiEmbedding(text, {
  apiKey = process.env.GEMINI_API_KEY,
  model = DEFAULT_EMBED_MODEL,
  fetchImpl = globalThis.fetch
} = {}) {
  if (!text || typeof text !== 'string' || !text.trim()) return null
  if (!apiKey) return null

  const key = `${model}::${normalizeTextKey(text)}`
  if (embeddingCache.has(key)) {
    return embeddingCache.get(key)
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    let res
    try {
      const url = `${GEMINI_EMBED_BASE}/${encodeURIComponent(model)}:embedContent?key=${encodeURIComponent(apiKey)}`
      res = await fetchImpl(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: {
            parts: [{ text: text.trim().slice(0, 2000) }]
          },
          outputDimensionality: 768
        }),
        signal: controller.signal
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!res.ok) {
      console.warn(`Gemini embedding failed with status ${res.status}`)
      return null
    }

    const data = await res.json()
    const values = data?.embedding?.values
    if (Array.isArray(values) && values.length > 0) {
      if (embeddingCache.size >= MAX_EMBEDDING_CACHE) {
        const oldestKey = embeddingCache.keys().next().value
        embeddingCache.delete(oldestKey)
      }
      embeddingCache.set(key, values)
      return values
    }
  } catch (err) {
    console.warn('Embedding request error:', err?.message || err)
  }

  return null
}
