// Compact storage for embedding vectors: int8 per component + one float scale,
// base64-encoded. A 768-dim vector is ~1 KB of JSON instead of ~7 KB, and cosine
// similarity is unaffected for ranking purposes (quantization error < 1%).

export function normalize(vec) {
  let norm = 0
  for (const v of vec) norm += v * v
  norm = Math.sqrt(norm) || 1
  return Float32Array.from(vec, (v) => v / norm)
}

/** Float vector -> { s: scale, q: base64 int8 } */
export function encodeVector(vec) {
  const unit = normalize(vec)
  let maxAbs = 0
  for (const v of unit) maxAbs = Math.max(maxAbs, Math.abs(v))
  const scale = maxAbs / 127 || 1
  const bytes = new Int8Array(unit.length)
  for (let i = 0; i < unit.length; i++) bytes[i] = Math.round(unit[i] / scale)
  return { s: Number(scale.toPrecision(7)), q: Buffer.from(bytes.buffer).toString('base64') }
}

/** { s, q } -> unit-length Float32Array */
export function decodeVector({ s, q }) {
  const buf = Buffer.from(q, 'base64')
  const bytes = new Int8Array(buf.buffer, buf.byteOffset, buf.byteLength)
  return normalize(Array.from(bytes, (b) => b * s))
}

/** Dot product of two unit vectors = cosine similarity. */
export function dot(a, b) {
  let sum = 0
  const n = Math.min(a.length, b.length)
  for (let i = 0; i < n; i++) sum += a[i] * b[i]
  return sum
}
