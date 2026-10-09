/**
 * Fontally: Font Catalogue Seeding & Embedding Script
 *
 * Populates the Supabase `fonts` table with enriched metadata and Gemini vector embeddings.
 * Run with: node scripts/seed-fonts.mjs
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { ENRICHED_FONT_CATALOG } from '../server/lib/font-catalog.mjs'
import { getGeminiEmbedding } from '../server/lib/embeddings.mjs'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
const geminiApiKey = process.env.GEMINI_API_KEY

async function main() {
  console.log('🚀 Starting Fontally Catalogue Seeding...\n')

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Supabase credentials not found in environment.')
    console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file.\n')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  console.log(`📡 Connected to Supabase at: ${supabaseUrl}`)
  console.log(`📦 Found ${ENRICHED_FONT_CATALOG.length} fonts in enriched catalog to seed.`)
  if (geminiApiKey) {
    console.log('🧠 Gemini API key detected. Vector embeddings will be generated via text-embedding-004.\n')
  } else {
    console.log('⚠️  No GEMINI_API_KEY found. Seeding metadata without vector embeddings.\n')
  }

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < ENRICHED_FONT_CATALOG.length; i++) {
    const font = ENRICHED_FONT_CATALOG[i]
    process.stdout.write(`[${i + 1}/${ENRICHED_FONT_CATALOG.length}] Processing ${font.family.padEnd(24)} `)

    try {
      let embedding = null

      if (geminiApiKey) {
        const textToEmbed = [
          `${font.family} is a ${font.category} typeface.`,
          `Mood and vibes: ${(font.mood_tags || []).join(', ')}.`,
          font.description || '',
          font.use_cases ? `Use cases: ${font.use_cases.join(', ')}.` : ''
        ].filter(Boolean).join(' ')

        embedding = await getGeminiEmbedding(textToEmbed, { apiKey: geminiApiKey })
      }

      const fontPayload = {
        family: font.family,
        category: font.category,
        variants: font.variants || ['400'],
        designer: font.designer || null,
        is_variable: font.is_variable ?? false,
        min_weight: font.min_weight ?? 400,
        max_weight: font.max_weight ?? 700,
        mood_tags: font.mood_tags || [],
        use_cases: font.use_cases || [],
        description: font.description || null,
        embedding: embedding || null,
        popularity: font.popularity || 50,
        google_fonts_url: `https://fonts.google.com/specimen/${encodeURIComponent(font.family).replace(/%20/g, '+')}`
      }

      const { error } = await supabase
        .from('fonts')
        .upsert(fontPayload, { onConflict: 'family' })

      if (error) {
        console.log(`❌ Error: ${error.message}`)
        errorCount++
      } else {
        console.log(`✅ Seeded ${embedding ? '(with embedding)' : ''}`)
        successCount++
      }

      // Minor rate limit spacing for Gemini
      if (geminiApiKey) {
        await new Promise((r) => setTimeout(r, 200))
      }
    } catch (err) {
      console.log(`❌ Failed: ${err.message}`)
      errorCount++
    }
  }

  console.log('\n----------------------------------------')
  console.log(`🎉 Seeding complete!`)
  console.log(`   Success: ${successCount}`)
  console.log(`   Errors:  ${errorCount}`)
  console.log('----------------------------------------\n')
}

main().catch((err) => {
  console.error('Fatal seeding script error:', err)
  process.exit(1)
})
