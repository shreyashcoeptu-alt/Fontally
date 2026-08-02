<div align="center">

  <h1>Fontally</h1>
  <p><strong>Make your type talk.</strong></p>
  <p><em>An aesthetic, vibe-driven typography curation and font pairing engine powered by design intelligence.</em></p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-vibe-archetypes">Vibe Archetypes</a> •
    <a href="#-developer-export">Developer Export</a> •
    <a href="#-author">Author</a>
  </p>

  <br />

  [![Vite](https://img.shields.io/badge/Vite-7.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)

  ---
</div>

## ✦ About Fontally

**Fontally** is a font-obsessed web application designed to bridge the gap between creative brand brief vibes and high-craft typography systems. 

Give Fontally a prompt—whether it's *"a brutalist portfolio for an experimental architect"*, *"a quiet cult-like coffee shop with amazing ceramics"*, or *"fintech, but hot"*—and Fontally analyzes your design brief, maps your project's **Design DNA**, and pairs complimentary heading and body typefaces complete with live interactive specimens and instant developer export code.

---

## ✦ Key Features

-  **Design DNA Analysis**: Evaluates briefs across four core aesthetic vectors: `EDITORIAL`, `DISRUPTIVE`, `WARMTH`, and `UTILITY`.
-  **50+ Curated Vibe Archetypes**: Handcrafted pairings of Google Fonts and legendary display typefaces (Neue Montreal, Spezia, Geist Mono, Reckless Neue, Syne, Bodoni Moda, etc.).
-  **Interactive Type Specimen Control**:
  - Live custom headline text editor
  - Dynamic font size slider (`32px` – `140px`)
  - Instant uppercase (`Aa`) and italic (`<i>I</i>`) state toggles
-  **One-Click Developer Exports**:
  - **CSS**: `@import` rules + `:root` CSS variables ready for your stylesheet
  - **Tailwind CSS**: `fontFamily` configuration snippets ready for `tailwind.config.js`
  - **Google Fonts**: Direct CDN links to drop straight into your `<head>`
- **Instant Prompt Chips**: Pre-loaded vibe presets like *Quiet Luxury*, *Fintech*, *Cultural Menace*, *AI & SaaS*, and *Cyberpunk*.
-  **Sleek Minimalist UI**: Built with dark mode aesthetics, grain texture overlays, smooth micro-interactions, and high-contrast typography.

---

##  ✦ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES Modules), Vanilla CSS
- **Build Tool / Dev Server**: [Vite](https://vitejs.dev/)
- **Fonts**: [Google Fonts API](https://fonts.google.com/)
- **Design Pattern**: Zero heavy framework dependencies, pure DOM manipulation, optimized lightweight assets.

---

##  Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### ✧ Installation & Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<YOUR-USERNAME>/Fontally.git
   cd Fontally
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port indicated in your CLI).

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## ✧ Vibe Archetypes & Pairings

Fontally translates complex mood boards into distinct typography archetypes. Here are a few examples:

| Archetype | Brief Vibe | Heading Font | Body / Pair Font |
| :--- | :--- | :--- | :--- |
| **THE OPTIMISTIC OPERATOR** | Fintech, Wealth & Capital | *PP Neue Montreal / Plus Jakarta Sans* | *ABC Arizona Flare / Playfair Display* |
| **THE BEAUTIFUL MENACE** | Brutalist Architecture | *Helvetica Now Display / Inter* | *Times New Roman / Newsreader* |
| **THE TENDER MAXIMALIST** | Quiet Luxury & Craft | *Reckless Neue / Newsreader* | *Söhne / DM Sans* |
| **THE SENSORY EDITOR** | Luxury Fashion & Editorial | *Spezia Variable / Bodoni Moda* | *Neue Montreal / Plus Jakarta Sans* |
| **THE SYSTEM ARCHITECT** | AI, SaaS & Developer CLI | *Geist Mono / DM Mono* | *Inter Display / Inter* |
| **THE SYNTH CONSTRUCTOR** | Cyberpunk & Neo-Tokyo RPG | *PP Neue Bit / Silkscreen* | *Syne* |

---

## ✧ Developer Export Examples

### 1. CSS Custom Properties (`:root`)
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

:root {
  --font-heading: 'PP Neue Montreal', 'Plus Jakarta Sans', sans-serif;
  --font-body: 'ABC Arizona Flare', 'Playfair Display', serif;
}
```

### 2. Tailwind Config Snippet
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['"PP Neue Montreal"', '"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"ABC Arizona Flare"', '"Playfair Display"', 'serif']
      }
    }
  }
}
```

---

## Author

Designed & Developed with ♥ by **[Shreyash Kadam](https://www.linkedin.com/in/shreyashkadam400)**.

- LinkedIn: [in/shreyashkadam400](https://www.linkedin.com/in/shreyashkadam400)
- Project: [Fontally™](https://github.com/<YOUR-USERNAME>/Fontally)

---

<div align="center">
  <p><sub>FONTALLY © 2026 — MAKE YOUR TYPE TALK.</sub></p>
</div>
