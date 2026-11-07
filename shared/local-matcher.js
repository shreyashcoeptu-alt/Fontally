// Offline keyword matcher and brand-name extractor.
// Used by the browser when Gemini is unavailable, and by the eval suite in Node.
import { isGibberishPrompt } from './gibberish.js'

const GIBBERISH_ERROR = 'The input appears to be random characters or gibberish. Please describe your project, brand, or desired aesthetic vibe (e.g., "cyberpunk gaming studio", "warm artisan bakery").'

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'for', 'with', 'in', 'on', 'at', 'to', 'of', 'by',
  'from', 'my', 'your', 'our', 'is', 'are', 'was', 'be', 'brand', 'app', 'website',
  'design', 'project', 'platform', 'company', 'startup', 'theme', 'look', 'style', 'like',
  'font', 'fonts', 'typography', 'type'
])

function scoreProfile(profile, tokens) {
  let score = 0
  const pWords = profile.words || []
  const pId = profile.id.toLowerCase()
  const pName = profile.name.toLowerCase()
  const pMeta = (profile.meta || '').toLowerCase()
  const pArchetype = (profile.archetype || '').toLowerCase()
  const pRationale = (profile.rationale || '').toLowerCase()
  // Real Google Fonts family names, so "Fraunces" or "Cinzel" match directly
  const pFamilies = `${profile.headingFallback || ''} ${profile.bodyFallback || ''}`.toLowerCase()

  for (const token of tokens) {
    // Direct font name match bonus (+25)
    if (pName.includes(token) || pFamilies.includes(token)) score += 25
    if (pWords.includes(token)) score += 8
    else if (pWords.some((w) => w.includes(token) || token.includes(w))) score += 4
    if (pId.includes(token)) score += 6
    if (pArchetype.includes(token)) score += 5
    if (pMeta.includes(token)) score += 4
    if (pRationale.includes(token)) score += 2
  }
  return score
}

/**
 * Returns { picks: [{ profile, confidence, rationale, tags }], tokens } with up to
 * `limit` distinct profiles, best first — or { error } when nothing matches.
 */
export function matchProfilesLocally(promptText, profiles, { limit = 3 } = {}) {
  if (isGibberishPrompt(promptText)) {
    return { error: GIBBERISH_ERROR }
  }

  const tokens = promptText
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))

  if (!tokens.length) {
    return { error: 'Please enter a more descriptive design brief.' }
  }

  const ranked = profiles
    .map((profile, index) => ({ profile, index, score: scoreProfile(profile, tokens) }))
    .filter((entry) => entry.score > 0)
    // Stable: ties keep catalog order, matching the previous single-pick behaviour
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)

  if (!ranked.length) {
    return {
      error: `No matching typography vibe found for "${promptText.slice(0, 40)}". Try describing your project with more descriptive style or mood words (e.g. "quiet luxury", "brutalist architecture", "retro diner").`
    }
  }

  const tags = tokens.slice(0, 4).map((t) => t.toUpperCase())
  const picks = ranked.map(({ profile, score }) => ({
    profile,
    confidence: Math.min(0.98, Math.max(0.72, 0.65 + score * 0.03)),
    rationale: profile.rationale,
    tags: tags.length ? tags : (profile.words || []).slice(0, 3).map((w) => w.toUpperCase())
  }))

  return { picks, tokens }
}

// Words that start a brief in title case but are not names
const NOT_A_NAME = new Set([
  'a', 'an', 'the', 'my', 'our', 'we', 'i', 'brand', 'logo', 'website', 'app', 'for', 'new',
  'modern', 'luxury', 'minimal', 'warm', 'bold', 'retro', 'vintage', 'premium'
])

/**
 * Best-effort brand name from a brief. Returns '' when unsure — a wrong name in
 * the preview is worse than falling back to the profile's sample text.
 *   "Crumb & Co, a warm sourdough bakery"  -> "Crumb & Co"
 *   'a coffee shop called "Slow Pour"'     -> "Slow Pour"
 *   "website for Northwind Labs, fintech"  -> "Northwind Labs"
 */
export function extractBrandName(promptText) {
  const text = String(promptText || '').trim()
  if (!text) return ''
  const clip = (name) => name.trim().replace(/[\s,.;:!?-]+$/, '').slice(0, 60)

  // 1. Quoted text
  const quoted = text.match(/["“'‘]([^"”'’]{2,40})["”'’]/)
  if (quoted) return clip(quoted[1])

  // 2. "called X" / "named X" / "for X" followed by Capitalised words
  const CAP_RUN = "([A-Z][\\w'’]*(?:\\s+(?:&|and|of|the|[A-Z][\\w'’]*|Co\\.?))*)"
  const introduced = text.match(new RegExp(`\\b(?:called|named|for|brand)\\s+${CAP_RUN}`))
  if (introduced && !NOT_A_NAME.has(introduced[1].toLowerCase())) return clip(introduced[1])

  // 3. Leading capitalised run that ends at a comma/dash, e.g. "Crumb & Co, a bakery".
  // A single word ("Calm, quiet spa") is usually an adjective, so only accept it
  // when an appositive follows: "Acme, a rocket company".
  const leading = text.match(new RegExp(`^${CAP_RUN}\\s*[,—–:-]\\s*(\\S+)?`))
  if (leading && !NOT_A_NAME.has(leading[1].split(/\s+/)[0].toLowerCase())) {
    const multiWord = /\s/.test(leading[1].trim())
    const appositive = /^(a|an|the)$/i.test(leading[2] || '')
    if (multiWord || appositive) return clip(leading[1])
  }

  return ''
}
