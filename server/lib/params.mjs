/**
 * Parses a `limit` query param. Missing or non-numeric values fall back to the
 * default instead of becoming NaN (which made `slice(0, NaN)` return nothing).
 */
export function parseLimit(value, { fallback, max, min = 1 }) {
  const n = Number.parseInt(value ?? '', 10)
  return Math.min(max, Math.max(min, Number.isFinite(n) ? n : fallback))
}
