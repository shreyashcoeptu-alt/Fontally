// Normalized key for a brief, shared by the server cache, the browser cache and
// the feedback log. Unicode-aware: the old /[^\w\s]/ version stripped every
// non-Latin character, so all Japanese/Hindi/Korean briefs collapsed to the same
// empty key and were served each other's cached recommendation.
export function normalizeBriefKey(prompt) {
  return String(prompt || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300)
}
