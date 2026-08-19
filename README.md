<div align="center">

# **FONTALLY**

### *Make your type talk.*

**An intelligent brief-to-type pairing engine & typography playground for designers, founders, and engineers.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fontally.vercel.app-00df8f?style=for-the-badge&logo=vercel&logoColor=black)](https://fontally.vercel.app/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Google Fonts](https://img.shields.io/badge/Fonts-Google%20Fonts-EA4335?style=for-the-badge&logo=googlefonts&logoColor=white)](https://fonts.google.com/)
[![Tests](https://img.shields.io/badge/Tests-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

[**Visit Live App**](https://fontally.vercel.app/) · [**GitHub Repository**](https://github.com/shreyashcoeptu-alt/Fontally) · [**Run Locally**](#run-locally) · [**API Endpoints**](#api-architecture)

</div>

---

## ✦ What is Fontally?

**Fontally** translates natural-language design briefs into curated typography systems. Instead of searching by font names or categories, describe your project's aesthetic, mood, audience, or culture in everyday words. Fontally reasons over the visual hierarchy, contrast, and emotion to deliver the perfect headline and body font pairing in milliseconds.

> **Describe the feeling first, then test and export the type.**

---

## ⚡ Key Features

- 🧠 **Gemini-Powered Typography Engine**: Sends creative design briefs to a serverless Gemini endpoint with fast token sampling, compressed prompt payloads, and dual-tier in-memory response caching (<1ms repeated responses).
- 🔤 **90+ Curated Typographic Archetypes**: Complete aesthetic taxonomy spanning *Swiss Bauhaus, Cyberpunk Neon, Quiet Luxury, 90s Grunge Zine, Dark Academia, Japanese Minimalist, Y2K Pop, 8-Bit Pixel RPG, Geneva Horology, Nordic Sauna*, and more.
- 🔍 **Live Google Fonts Explorer**: Instant real-time search and category filtering across **250+ Google Font families** (*Sans-Serif, Serif, Display, Monospace, and Handwriting/Script*).
- 🧪 **Interactive Type Lab Sandbox**:
  - Live editable specimen playground
  - Real-time optical size slider (24px – 140px)
  - Style modifiers (<kbd>Aa</kbd> Uppercase, <kbd>I</kbd> Italic, <kbd>B</kbd> Bold)
  - Color palette swatches and interactive hex color picker
  - One-click dummy copy presets (*Pangram, Headline, Alphabet, Numbers, Paragraph*)
- 💻 **Developer Code Export**: One-click `@import` and CSS custom property export, plus direct links to font specimen pages on [fonts.google.com](https://fonts.google.com/).
- ☁️ **Vercel Serverless Ready**: Native `/api/recommend` and `/api/fonts` edge serverless functions for zero-config global deployment.

---

## 🛠️ Project Structure

```text
Fontally/
├── api/
│   ├── recommend.js              # Vercel serverless Gemini recommendation endpoint
│   └── fonts.js                  # Vercel serverless Google Fonts search endpoint
├── index.html                    # Single-page HTML entry point & UI structure
├── public/
│   ├── favicon.png               # Custom brand favicon
│   └── fontally-icon.png         # High-resolution brand icon
├── server/
│   ├── gemini-recommendation.mjs # Gemini prompt builder, response parser & cache
│   └── google-fonts.mjs          # Google Fonts catalog & developer API handler
├── src/
│   ├── main.js                   # Client state, Type Lab controller, local semantic engine
│   └── style.css                 # Vanilla CSS design system, dark mode & layout
├── tests/
│   └── scorer.test.js            # Vitest suite for Gemini & Google Fonts endpoints
├── vercel.json                   # Vercel deployment configuration
├── vite.config.js                # Vite development server middlewares
└── package.json                  # Dependencies, scripts, and metadata
```

---

## 🏃 Run Locally

### 1. Prerequisites
- **Node.js**: `20.18+` or `22.x`
- **npm**: `10.x+`

### 2. Clone and Install
```bash
git clone https://github.com/shreyashcoeptu-alt/Fontally.git
cd Fontally
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Add your keys:
```dotenv
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
GOOGLE_FONTS_API_KEY=optional_google_fonts_api_key_here
```

### 4. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 🧪 Testing & Building

Run the Vitest test suite:
```bash
npm test -- --run
```

Build for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🌐 API Architecture

### 1. `POST /api/recommend`
Generates typography recommendations based on natural-language briefs.

**Request Payload:**
```json
{
  "prompt": "A warm artisanal bakery brand with nostalgic 70s typography.",
  "profiles": [ /* catalog of archetype profiles */ ]
}
```

**Response:**
```json
{
  "profileId": "pastry-shop",
  "confidence": 0.94,
  "rationale": "Fluid retro curves evoke handcrafted dough and warm ovens.",
  "tags": ["NOSTALGIC", "WARM", "ARTISAN", "RETRO"]
}
```

### 2. `GET /api/fonts`
Queries the Google Fonts catalog with optional search term and classification filter.

**Query Parameters:**
- `query` *(optional)*: Search string (e.g. `roboto`, `serif`, `space`)
- `category` *(optional)*: `all` | `sans-serif` | `serif` | `display` | `monospace` | `handwriting`
- `limit` *(optional)*: Maximum fonts returned (default: `250`)

---

## 🚀 Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import `Fontally`.
3. Add the following Environment Variables in the Vercel Dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `GEMINI_MODEL`: `gemini-2.5-flash`
4. Click **Deploy**.

---

## 👨‍💻 Author

Designed and developed with passion by **Shreyash Kadam**.

- **Live Project**: [https://fontally.vercel.app/](https://fontally.vercel.app/)
- **LinkedIn**: [shreyashkadam400](https://www.linkedin.com/in/shreyashkadam400)
- **GitHub**: [@shreyashcoeptu-alt](https://github.com/shreyashcoeptu-alt)
