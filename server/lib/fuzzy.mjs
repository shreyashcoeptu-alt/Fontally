import Fuse from 'fuse.js'

/**
 * Configure Fuse.js for typo-tolerant, multi-field font searching.
 */
export function createFontSearchIndex(fonts, options = {}) {
  const fuseOptions = {
    includeScore: true,
    shouldSort: true,
    threshold: 0.38, // 0.0 is perfect match, 1.0 matches anything
    distance: 100,
    minMatchCharLength: 2,
    keys: [
      { name: 'family', weight: 0.6 },
      { name: 'mood_tags', weight: 0.3 },
      { name: 'description', weight: 0.2 },
      { name: 'use_cases', weight: 0.2 },
      { name: 'category', weight: 0.15 },
      { name: 'designer', weight: 0.1 }
    ],
    ...options
  }

  const fuse = new Fuse(fonts, fuseOptions)

  return {
    search(query, searchOptions = {}) {
      if (!query || typeof query !== 'string' || !query.trim()) {
        return fonts.map((item) => ({ item, score: 0 }))
      }
      return fuse.search(query.trim(), searchOptions)
    }
  }
}
