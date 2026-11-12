/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { initSculpture, SCULPTURE_FONTS } from '../src/sculpture.js'

const html = readFileSync(resolve(__dirname, '../index.html'), 'utf8')
const playground = html.slice(html.indexOf('<div class="type-playground"'), html.indexOf('</section>'))

let root
let api
const letters = () => [...root.querySelectorAll('.sculpture-row span')]
const caption = () => root.querySelector('.sculpture-caption').textContent
const key = (el, k) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }))

beforeEach(() => {
  document.body.innerHTML = `<section class="hero">${playground}</section>`
  root = document.getElementById('typePlayground')
  api = initSculpture(root, { random: () => 0 })
})

describe('hero sculpture', () => {
  it('only uses fonts that index.html loads', () => {
    const link = html.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)"/)[1]
    for (const { family } of SCULPTURE_FONTS) {
      expect(link).toContain(`family=${family.replace(/ /g, '+')}:`)
    }
  })

  it('gives neighbouring letters different fonts', () => {
    const fonts = letters().map((l) => l.dataset.font)
    expect(fonts).toHaveLength(26)
    for (let i = 1; i < fonts.length; i++) expect(fonts[i]).not.toBe(fonts[i - 1])
  })

  it('clicking a letter moves it to a different font and names it', () => {
    const a = letters()[0]
    const before = a.dataset.font
    a.click()
    expect(a.dataset.font).not.toBe(before)
    expect(caption()).toBe(a.dataset.font)
  })

  it('is a single tab stop with arrow-key navigation', () => {
    expect(letters().filter((l) => l.tabIndex === 0)).toHaveLength(1)
    letters()[0].focus()
    key(letters()[0], 'ArrowRight')
    expect(document.activeElement).toBe(letters()[1])
    key(letters()[1], 'End')
    expect(document.activeElement.textContent).toBe('Z')
    key(document.activeElement, 'ArrowRight')
    expect(document.activeElement.textContent).toBe('A')
    expect(letters().filter((l) => l.tabIndex === 0)).toHaveLength(1)
  })

  it('Enter changes the focused letter font', () => {
    const b = letters()[1]
    const before = b.dataset.font
    key(b, 'Enter')
    expect(b.dataset.font).not.toBe(before)
  })

  it('sets every letter in the recommended font, and shuffle undoes it', () => {
    api.setFeatured('Newsreader', "'Newsreader', serif")
    expect(new Set(letters().map((l) => l.dataset.font))).toEqual(new Set(['Newsreader']))
    expect(caption()).toMatch(/Newsreader/)
    root.querySelector('.sculpture-shuffle').click()
    expect(letters().some((l) => l.dataset.font === 'Newsreader')).toBe(false)
  })
})
