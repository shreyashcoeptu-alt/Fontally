/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let chooseProfile;
let profiles;

describe('chooseProfile (TF-IDF Scorer)', () => {
  beforeAll(async () => {
    // Load the HTML into JSDOM before importing main.js
    const htmlPath = path.resolve(__dirname, '../index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    document.body.innerHTML = htmlContent;
    
    // Now dynamically import main.js so it executes against the loaded DOM
    const main = await import('../src/main.js');
    chooseProfile = main.chooseProfile;
    profiles = main.profiles;
  });

  it('should match exact keywords properly', () => {
    const p1 = chooseProfile('fintech wealth bank');
    expect(p1.id).toBe('fintech');
    
    const p2 = chooseProfile('dystopian cyberpunk neo-tokyo');
    expect(p2.id).toBe('cyberpunk');
  });

  it('should fall back to a random profile if no matches', () => {
    const randomWords = 'asdf qwer zxcv';
    const profile = chooseProfile(randomWords);
    expect(profiles).toContain(profile);
  });

  it('should prefer rarer words when matched', () => {
    const p = chooseProfile('I am a brutal architect doing some design');
    expect(p.id).toBe('architect');
  });
});
