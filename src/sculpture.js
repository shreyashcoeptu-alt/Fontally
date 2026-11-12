// Hero A–Z sculpture: a live font sampler.
//  - every letter is set in a font that is actually loaded (see index.html)
//  - hover/focus names the font; click/Enter moves that letter to the next font
//  - "Shuffle" re-sets every letter; after a recommendation the whole sculpture
//    is set in the recommended heading font
//  - one delegated listener per event, one tab stop (arrow keys move between letters)

// Families must match the Google Fonts <link> in index.html, or they silently fall back
export const SCULPTURE_FONTS = [
  { family: 'Anybody', stack: "'Anybody', sans-serif" },
  { family: 'Bricolage Grotesque', stack: "'Bricolage Grotesque', sans-serif" },
  { family: 'Fraunces', stack: "'Fraunces', serif" },
  { family: 'Instrument Serif', stack: "'Instrument Serif', serif" },
  { family: 'Space Grotesk', stack: "'Space Grotesk', sans-serif" },
  { family: 'Syne', stack: "'Syne', sans-serif" },
  { family: 'Unbounded', stack: "'Unbounded', sans-serif" }
]

const HINT = 'Click a letter to change its font'

export function initSculpture(root, { random = Math.random, win = window } = {}) {
  const letters = root ? [...root.querySelectorAll('.sculpture-row span')] : []
  if (!letters.length) return { setFeatured() {}, shuffle() {} }

  const caption = root.querySelector('.sculpture-caption')
  const shuffleBtn = root.querySelector('.sculpture-shuffle')
  const sculpture = root.querySelector('.type-sculpture')
  let fonts = SCULPTURE_FONTS
  let featured = null
  const fontIndex = new Array(letters.length).fill(0)

  const setCaption = (text) => { if (caption) caption.textContent = text }

  function setLetterFont(i, index) {
    fontIndex[i] = ((index % fonts.length) + fonts.length) % fonts.length
    const font = fonts[fontIndex[i]]
    letters[i].style.fontFamily = font.stack
    letters[i].dataset.font = font.family
    letters[i].setAttribute('aria-label', `${letters[i].textContent}, set in ${font.family}`)
  }

  function shuffle() {
    featured = null
    fonts = SCULPTURE_FONTS
    // A random offset, then neighbours step through the list, so adjacent letters always differ
    const seed = Math.floor(random() * fonts.length)
    letters.forEach((_, i) => setLetterFont(i, seed + i * 3))
    setCaption(HINT)
  }

  /** Sets the whole sculpture in the recommended heading font (null resets). */
  function setFeatured(family, stack) {
    if (!family) return shuffle()
    featured = { family, stack: stack || `'${family}', sans-serif` }
    fonts = [featured, ...SCULPTURE_FONTS.filter((f) => f.family !== family)]
    letters.forEach((_, i) => setLetterFont(i, 0))
    setCaption(`Set in ${family}, your recommended heading`)
  }

  function pop(span) {
    span.classList.remove('is-popping')
    void span.offsetWidth // restart the animation
    span.classList.add('is-popping')
  }

  function cycle(span) {
    const i = letters.indexOf(span)
    if (i < 0) return
    setLetterFont(i, fontIndex[i] + 1)
    pop(span)
    setCaption(span.dataset.font)
  }

  // Roving tabindex: the sculpture is one tab stop, arrows move inside it
  function focusLetter(i) {
    const next = letters[(i + letters.length) % letters.length]
    letters.forEach((l) => { l.tabIndex = l === next ? 0 : -1 })
    next.focus()
  }

  letters.forEach((span, i) => {
    span.setAttribute('role', 'button')
    span.tabIndex = i === 0 ? 0 : -1
    // Deterministic tilt in [-4, 4] degrees; replaces 26 hand-written nth-child rules
    span.style.setProperty('--tilt', `${((i * 37) % 9) - 4}deg`)
  })
  root.addEventListener('animationend', (e) => e.target.classList?.remove('is-popping'))

  root.addEventListener('click', (e) => {
    if (e.target === shuffleBtn) return shuffle()
    const span = e.target.closest?.('.sculpture-row span')
    if (span) cycle(span)
  })
  root.addEventListener('keydown', (e) => {
    const i = letters.indexOf(e.target)
    if (i < 0) return
    const moves = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    if (e.key in moves) { e.preventDefault(); focusLetter(i + moves[e.key]) }
    else if (e.key === 'Home') { e.preventDefault(); focusLetter(0) }
    else if (e.key === 'End') { e.preventDefault(); focusLetter(letters.length - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cycle(e.target) }
  })
  const showName = (e) => {
    const span = e.target.closest?.('.sculpture-row span')
    if (span) setCaption(span.dataset.font)
  }
  const restoreCaption = () => setCaption(featured ? `Set in ${featured.family}, your recommended heading` : HINT)
  root.addEventListener('pointerover', showName)
  root.addEventListener('focusin', showName)
  root.addEventListener('pointerleave', restoreCaption)
  root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) restoreCaption() })

  // Subtle lean toward the cursor: transform-only, at most one update per frame
  const fine = win.matchMedia?.('(pointer: fine) and (prefers-reduced-motion: no-preference)')?.matches
  const hero = root.closest('.hero')
  if (fine && sculpture && hero) {
    let frame = 0
    let x = 0
    let y = 0
    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect()
      x = (e.clientX - rect.left) / rect.width - 0.5
      y = (e.clientY - rect.top) / rect.height - 0.5
      if (!frame) {
        frame = win.requestAnimationFrame(() => {
          frame = 0
          sculpture.style.setProperty('--lean-x', `${(x * 10).toFixed(2)}deg`)
          sculpture.style.setProperty('--lean-y', `${(-y * 8).toFixed(2)}deg`)
        })
      }
    })
    hero.addEventListener('pointerleave', () => {
      sculpture.style.setProperty('--lean-x', '0deg')
      sculpture.style.setProperty('--lean-y', '0deg')
    })
  }

  shuffle()
  return { setFeatured, shuffle }
}
