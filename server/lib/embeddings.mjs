import { retryAfterMs } from './gemini-client.mjs'

const GEMINI_EMBED_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const DEFAULT_EMBED_MODEL = 'gemini-embedding-001'

const embeddingCache = new Map()
const MAX_EMBEDDING_CACHE = 500

// After a 429/503, skip the API until this time instead of re-hitting it on
// every request (failures used to be uncached, so each search retried Gemini).
let embedCooldownUntil = 0

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
  // RETRIEVAL_QUERY for user searches, RETRIEVAL_DOCUMENT when embedding catalog fonts.
  // Asymmetric task types noticeably improve query -> document matching.
  taskType = 'RETRIEVAL_QUERY',
  fetchImpl = globalThis.fetch,
  // Called only when the API will actually be hit (not on cache hits or during a
  // cooldown). Resolve false to skip the call, e.g. when the daily budget is spent.
  beforeRequest = null,
  now = Date.now
} = {}) {
  if (!text || typeof text !== 'string' || !text.trim()) return null
  if (!apiKey) return null

  const key = `${model}::${taskType}::${normalizeTextKey(text)}`
  if (embeddingCache.has(key)) {
    return embeddingCache.get(key)
  }
  if (embedCooldownUntil > now()) return null
  if (beforeRequest && !(await beforeRequest())) return null

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    let res
    try {
      // Key goes in a header, not the query string, so it never lands in proxy/access logs
      const url = `${GEMINI_EMBED_BASE}/${encodeURIComponent(model)}:embedContent`
      res = await fetchImpl(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          content: {
            parts: [{ text: text.trim().slice(0, 2000) }]
          },
          taskType,
          outputDimensionality: 768
        }),
        signal: controller.signal
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!res.ok) {
      if (res.status === 429 || res.status === 503) {
        const payload = await res.json().catch(() => ({}))
        embedCooldownUntil = now() + (res.status === 429 ? retryAfterMs(payload, 60_000) : 20_000)
      }
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
      // Only full 3072-dim gemini-embedding-001 output is pre-normalized; normalize truncated vectors
      const norm = Math.sqrt(values.reduce((sum, v) => sum + v * v, 0)) || 1
      const normalized = values.map((v) => v / norm)
      embeddingCache.set(key, normalized)
      return normalized
    }
  } catch (err) {
    console.warn('Embedding request error:', err?.message || err)
  }

  return null
}

// Test helper
export function resetEmbeddingState() {
  embeddingCache.clear()
  embedCooldownUntil = 0
}
