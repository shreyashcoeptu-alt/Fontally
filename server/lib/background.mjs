import { waitUntil } from '@vercel/functions'

/**
 * Run work after the response is sent without awaiting it.
 * A plain un-awaited promise can be frozen with the serverless instance once the
 * response is sent, silently dropping the write. waitUntil keeps the function
 * alive until it settles on Vercel, and is a no-op elsewhere (local dev, tests).
 */
export function runInBackground(promise) {
  const settled = Promise.resolve(promise).catch((err) => {
    console.warn('Background task failed:', err?.message || err)
  })
  try {
    waitUntil(settled)
  } catch {
    // No request context: the promise still runs, just without a keep-alive
  }
  return settled
}
