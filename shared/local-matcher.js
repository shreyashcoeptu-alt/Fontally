// Offline keyword matcher and brand-name extractor.
// Used by the browser when Gemini is unavailable, and by the eval suite in Node.
import { isGibberishPrompt } from './gibberish.js'

const GIBBERISH_ERROR = 'The input appears to be random characters or gibberish. Please describe your project, brand, or desired aesthetic vibe (e.g., "cyberpunk gaming studio", "warm artisan bakery").'

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'for', 'with', 'in', 'on', 'at', 'to', 'of', 'by',
  'from', 'my', 'your', 'our', 'is', 'are', 'was', 'be', 'brand', 'app', 'website',
  'design', 'project', 'platform', 'company', 'startup', 'theme', 'look', 'style', 'like',
  'font', 'fonts', 'typography', 'type',
  // Filler that carries no style signal ("make it feel...", "I want something...")
  'it', 'its', 'make', 'feel', 'feels', 'want', 'need', 'something', 'very', 'really', 'use',
  'using', 'love', 'we', 'me', 'this', 'that', 'should', 'would', 'bit', 'kind', 'sort',
  'new', 'some', 'more', 'less', 'but', 'not', 'just', 'also', 'into', 'as'
])

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Token appears at the start of a word: "bake" matches "bakery", but "it" does not
// match "Italiana" or "digital". Short tokens (<4 chars) must be whole words.
function hasWordStart(text, token, { wholeWord = token.length < 4 } = {}) {
  const tail = wholeWord ? '(?![\\p{L}\\p{N}])' : ''
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(token)}${tail}`, 'u').test(text)
}

function scoreProfile(profile, tokens) {
  let score = 0
  const pWords = profile.words || []
  const pId = profile.id.toLowerCase().replace(/_/g, ' ')
  const pMeta = (profile.meta || '').toLowerCase()
  const pArchetype = (profile.archetype || '').toLowerCase()
  const pRationale = (profile.rationale || '').toLowerCase()
  // Editorial name + real Google Fonts families, so "Fraunces" or "Cinzel" match directly
  const pNames = [profile.name, profile.pair, profile.headingFallback, profile.bodyFallback]
    .filter(Boolean).join(' ').toLowerCase()

  for (const token of tokens) {
    // Direct font name match bonus (+25)
    if (token.length >= 3 && hasWordStart(pNames, token, { wholeWord: true })) score += 25
    if (pWords.includes(token)) score += 8
    else if (token.length >= 4 && pWords.some((w) => w.length >= 4 && (w.startsWith(token) || token.startsWith(w)))) score += 4
    if (hasWordStart(pId, token)) score += 6
    if (hasWordStart(pArchetype, token)) score += 5
    if (hasWordStart(pMeta, token)) score += 4
    if (hasWordStart(pRationale, token)) score += 2
  }
  return score
}

export function tokenizeBrief(promptText) {
  return String(promptText || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token))
}

function rankTokens(tokens, profiles) {
  return profiles
    .map((profile, index) => ({ profile, index, score: scoreProfile(profile, tokens) }))
    // Stable: ties keep catalog order
    .sort((a, b) => b.score - a.score || a.index - b.index)
}

/** Every profile with its keyword score, best first (used to shortlist for Gemini). */
export function rankProfiles(promptText, profiles) {
  return rankTokens(tokenizeBrief(promptText), profiles)
}

/**
 * Returns { picks: [{ profile, confidence, rationale, tags }], tokens } with up to
 * `limit` distinct profiles, best first — or { error } when nothing matches.
 */
export function matchProfilesLocally(promptText, profiles, { limit = 3 } = {}) {
  if (isGibberishPrompt(promptText)) {
    return { error: GIBBERISH_ERROR }
  }

  const tokens = tokenizeBrief(promptText)

  if (!tokens.length) {
    return { error: 'Please enter a more descriptive design brief.' }
  }

  const ranked = rankTokens(tokens, profiles).filter((entry) => entry.score > 0).slice(0, limit)

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
