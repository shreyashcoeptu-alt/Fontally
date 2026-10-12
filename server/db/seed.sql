--
-- Fontally: Expanded Seed Data for Supabase `fonts` Table
-- Total Fonts: 130
-- Run this in the Supabase SQL Editor after executing schema.sql
--

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Inter', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Rasmus Andersson', TRUE, 100, 900, 99, ARRAY['clean', 'neutral', 'tech', 'ui', 'modern', 'minimalist', 'swiss', 'readable'], ARRAY['dashboard', 'saas', 'operating-system', 'mobile-app'], 'A versatile neo-grotesque variable typeface crafted specifically for computer screens with tall x-height and micro-clarity.', 'https://fonts.google.com/specimen/Inter'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Plus Jakarta Sans', 'sans-serif', '["200","300","400","500","600","700","800"]'::jsonb, 'Gumpita Rahayu', TRUE, 200, 800, 95, ARRAY['modern', 'friendly', 'geometric', 'fintech', 'contemporary', 'startup'], ARRAY['fintech', 'landing-page', 'brand-identity'], 'A fresh modern geometric sans-serif with friendly curved terminals, highly popular for high-growth tech startups.', 'https://fonts.google.com/specimen/Plus+Jakarta+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Roboto', 'sans-serif', '["100","300","400","500","700","900"]'::jsonb, 'Christian Robertson', TRUE, 100, 900, 98, ARRAY['mechanical', 'geometric', 'friendly', 'workhorse', 'modern'], ARRAY['mobile', 'system', 'corporate'], 'Dual nature grotesque blending geometric forms with open, friendly curves for screen clarity.', 'https://fonts.google.com/specimen/Roboto'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Montserrat', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Julieta Ulanovsky', TRUE, 100, 900, 97, ARRAY['geometric', 'urban', 'posters', 'architecture', 'bold', 'punchy'], ARRAY['posters', 'headings', 'branding'], 'Inspired by traditional neighborhood signs in Buenos Aires, wide and commanding geometry.', 'https://fonts.google.com/specimen/Montserrat'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Poppins', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Indian Type Foundry', FALSE, 100, 900, 96, ARRAY['geometric', 'friendly', 'circular', 'warm', 'approachable'], ARRAY['e-commerce', 'agency', 'consumer-app'], 'Pure geometric circles and monoline strokes, highly approachable and warm.', 'https://fonts.google.com/specimen/Poppins'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Space Grotesk', 'sans-serif', '["300","400","500","600","700"]'::jsonb, 'Florian Karsten', TRUE, 300, 700, 92, ARRAY['brutalist', 'quirky', 'crypto', 'web3', 'tech', 'developer', 'hacker'], ARRAY['crypto', 'dev-tools', 'zine', 'design-portfolio'], 'Proportional sans-serif based on Space Mono, sharp idiosyncratic details, brutalist aesthetic.', 'https://fonts.google.com/specimen/Space+Grotesk'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'DM Sans', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Colophon Foundry', TRUE, 100, 900, 94, ARRAY['low-contrast', 'geometric', 'clean', 'editorial', 'modern'], ARRAY['editorial', 'fintech', 'minimalist-web'], 'Precise low-contrast geometric sans intended for small screen readability and sharp headlines.', 'https://fonts.google.com/specimen/DM+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Outfit', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Rodrigo Fuenzalida', TRUE, 100, 900, 91, ARRAY['geometric', 'clean', 'contemporary', 'brand', 'crisp'], ARRAY['fashion', 'branding', 'technology'], 'Fashion-forward clean geometric display and text system.', 'https://fonts.google.com/specimen/Outfit'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Manrope', 'sans-serif', '["200","300","400","500","600","700","800"]'::jsonb, 'Mikhail Sharanda', TRUE, 200, 800, 90, ARRAY['modern', 'semi-condensed', 'fintech', 'ui', 'geometric'], ARRAY['banking', 'analytics', 'software'], 'Balanced modern grotesque with semi-rounded strokes and robust numerals.', 'https://fonts.google.com/specimen/Manrope'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Syne', 'sans-serif', '["400","500","600","700","800"]'::jsonb, 'Lucas Descroix', TRUE, 400, 800, 88, ARRAY['avant-garde', 'experimental', 'fashion', 'ultra-wide', 'display', 'art'], ARRAY['art-direction', 'fashion-editorial', 'cultural-festivals'], 'Daring avant-garde typeface that stretches from sensible text to extreme ultra-wide display weights.', 'https://fonts.google.com/specimen/Syne'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Unbounded', 'sans-serif', '["300","400","500","600","700","800","900"]'::jsonb, 'Studio Koto', TRUE, 300, 900, 87, ARRAY['futuristic', 'heavy', 'display', 'gaming', 'bold', 'extended'], ARRAY['gaming', 'music', 'brand-campaign'], 'Wide, punchy, uninhibited geometric sans tailored for high-impact brand statements.', 'https://fonts.google.com/specimen/Unbounded'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Bricolage Grotesque', 'sans-serif', '["200","300","400","500","600","700","800"]'::jsonb, 'Mathieu Triay', TRUE, 200, 800, 89, ARRAY['retro', 'warm', 'expressive', 'french-grotesque', 'eclectic', 'humanist'], ARRAY['editorial', 'craft-brand', 'creative-portfolio'], 'Collage of historical British and French grotesque traits, rich in personality and visual rhythm.', 'https://fonts.google.com/specimen/Bricolage+Grotesque'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Work Sans', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Wei Huang', TRUE, 100, 900, 93, ARRAY['early-grotesque', 'humanist', 'screen-first', 'print', 'structured'], ARRAY['publishing', 'workspace-apps', 'architecture'], 'Based on early 19th-century grots, highly functional for both screen reading and dense prints.', 'https://fonts.google.com/specimen/Work+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Playfair Display', 'serif', '["400","500","600","700","800","900","italic"]'::jsonb, 'Claus Eggers Sørensen', TRUE, 400, 900, 98, ARRAY['luxury', 'editorial', 'classic', 'high-contrast', 'transitional', 'dramatic'], ARRAY['luxury-brand', 'fashion-magazine', 'fine-dining', 'hospitality'], 'High-contrast transitional serif drawing inspiration from Enlightenment-era Baskerville letterforms.', 'https://fonts.google.com/specimen/Playfair+Display'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Lora', 'serif', '["400","500","600","700","italic"]'::jsonb, 'Cyreal', TRUE, 400, 700, 96, ARRAY['literary', 'calligraphic', 'contemporary', 'reading', 'warm', 'gentle'], ARRAY['blog', 'news', 'literary-journal'], 'Contemporary serif with brushed calligraphic roots, perfect for long-form essays and storytelling.', 'https://fonts.google.com/specimen/Lora'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Cormorant Garamond', 'serif', '["300","400","500","600","700","italic"]'::jsonb, 'Christian Thalmann', TRUE, 300, 700, 94, ARRAY['delicate', 'aristocratic', 'quiet-luxury', 'renaissance', 'sharp', 'classical'], ARRAY['luxury-perfume', 'art-catalog', 'poetry-book'], 'Exquisite revival of Claude Garamond’s sixteenth-century typography, razor-sharp counters.', 'https://fonts.google.com/specimen/Cormorant+Garamond'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Fraunces', 'serif', '["100","200","300","400","500","600","700","800","900","italic"]'::jsonb, 'Phaedra Charles, Flavia Zimbardi', TRUE, 100, 900, 92, ARRAY['wonky', 'soft', 'vintage', 'warm', 'editorial', 'curvy', '70s'], ARRAY['bakery', 'organic-goods', 'craft-brewery', 'boutique'], 'Warm, tactile "wonky" serif with variable optical size, softness, and dramatic oldstyle gestures.', 'https://fonts.google.com/specimen/Fraunces'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Instrument Serif', 'serif', '["400","italic"]'::jsonb, 'Instrument, Jordan Bell', FALSE, 400, 400, 91, ARRAY['quiet-luxury', 'contemporary', 'poetic', 'refined', 'curated', 'minimalist'], ARRAY['design-studio', 'lookbook', 'high-end-interior'], 'Contemporary high-fashion editorial serif with expressive italic gestures and understated confidence.', 'https://fonts.google.com/specimen/Instrument+Serif'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Cinzel', 'serif', '["400","500","600","700","800","900"]'::jsonb, 'Natanael Gama', TRUE, 400, 900, 93, ARRAY['monumental', 'roman', 'cinematic', 'imperial', 'history', 'majestic'], ARRAY['film-poster', 'fantasy-game', 'estate-wine'], 'All-caps inspired by classical Roman inscriptions, widely used in film titles and heritage brands.', 'https://fonts.google.com/specimen/Cinzel'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'EB Garamond', 'serif', '["400","500","600","700","800","italic"]'::jsonb, 'Georg Duffner', TRUE, 400, 800, 90, ARRAY['scholarly', 'renaissance', 'humanist', 'academic', 'literature'], ARRAY['academic-paper', 'novel', 'historical-archive'], 'Community-driven historical digital engraving of Claude Garamond’s legendary roman.', 'https://fonts.google.com/specimen/EB+Garamond'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Bodoni Moda', 'serif', '["400","500","600","700","800","900","italic"]'::jsonb, 'Owen Earl', TRUE, 400, 900, 88, ARRAY['haute-couture', 'italian', 'didone', 'dramatic', 'fashion', 'vogue'], ARRAY['vogue-style', 'perfume-brand', 'jewelry'], 'High-contrast modern Didone serif tailored for runway fashion, high jewelry, and glamor.', 'https://fonts.google.com/specimen/Bodoni+Moda'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Newsreader', 'serif', '["200","300","400","500","600","700","800","italic"]'::jsonb, 'Production Type', TRUE, 200, 800, 87, ARRAY['editorial', 'journalism', 'continuous-reading', 'authoritative', 'literary'], ARRAY['investigative-journal', 'ebook', 'thought-leadership'], 'Commissioned for long-form on-screen reading, authoritative journalistic precision.', 'https://fonts.google.com/specimen/Newsreader'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Righteous', 'display', '["400"]'::jsonb, 'Astigmatic', FALSE, 400, 400, 89, ARRAY['retro-futurism', 'art-deco', 'sci-fi', 'neon', '80s', 'arcade'], ARRAY['synthwave-album', 'gaming-channel', 'retro-poster'], 'Deco-inspired retro-futuristic grid display with geometric rounded turns.', 'https://fonts.google.com/specimen/Righteous'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Shrikhand', 'display', '["400"]'::jsonb, 'Jonny Pinhorn', FALSE, 400, 400, 88, ARRAY['bold', 'colorful', 'curvy', 'indian-street-handpainted', 'loud', 'festive'], ARRAY['street-food', 'festival-branding', 'quirky-packaging'], 'Expansive voluptuous display inspired by hand-painted Gujarati street graphics.', 'https://fonts.google.com/specimen/Shrikhand'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Monoton', 'display', '["400"]'::jsonb, 'Vernon Adams', FALSE, 400, 400, 86, ARRAY['disco', 'multiline', '70s', 'neon', 'striated', 'dramatic'], ARRAY['club-poster', 'vinyl-sleeve', 'cocktail-bar'], 'Striated multi-line display evoking seventies discotheque marquees and neon signs.', 'https://fonts.google.com/specimen/Monoton'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Bebas Neue', 'display', '["400"]'::jsonb, 'Ryoichi Tsunekawa', FALSE, 400, 400, 97, ARRAY['bold', 'all-caps', 'condensed', 'athletic', 'punchy', 'action'], ARRAY['sports-brand', 'youtube-thumbnail', 'action-film'], 'The heavyweight king of condensed capitals, commanding immediate visual hierarchy.', 'https://fonts.google.com/specimen/Bebas+Neue'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Oswald', 'sans-serif', '["200","300","400","500","600","700"]'::jsonb, 'Vernon Adams', TRUE, 200, 700, 95, ARRAY['condensed', 'industrial', 'signage', 'strong', 'headline'], ARRAY['news-ticker', 'banner', 'fitness'], 'Reworking of classic Alternate Gothic for digital screens, compact and punchy.', 'https://fonts.google.com/specimen/Oswald'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Press Start 2P', 'display', '["400"]'::jsonb, 'CodeMan38', FALSE, 400, 400, 87, ARRAY['8-bit', 'pixel', 'retro-gaming', 'arcade', 'nes', 'nostalgia'], ARRAY['indie-game', 'retro-tech', 'pixel-art'], 'Authentic 1980s arcade pixel typography rendered with uncompromising 8-bit geometry.', 'https://fonts.google.com/specimen/Press+Start+2P'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Orbitron', 'display', '["400","500","600","700","800","900"]'::jsonb, 'Matt McInerney', TRUE, 400, 900, 88, ARRAY['sci-fi', 'cyberpunk', 'aerospace', 'hud', 'futuristic'], ARRAY['space-mission', 'hud-display', 'cyberpunk-game'], 'Geometric sans specifically crafted for sci-fi user interfaces and planetary spacecraft.', 'https://fonts.google.com/specimen/Orbitron'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Space Mono', 'monospace', '["400","700","italic"]'::jsonb, 'Colophon Foundry', FALSE, 400, 700, 92, ARRAY['developer', 'brutalist', 'code', 'space-age', 'retro-tech', 'editorial'], ARRAY['developer-tool', 'zine', 'terminal', 'tech-manifesto'], 'Fixed-width geometric display grotesque combining 1960s headline punch with terminal grid.', 'https://fonts.google.com/specimen/Space+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'JetBrains Mono', 'monospace', '["100","200","300","400","500","600","700","800","italic"]'::jsonb, 'Philipp Nurullin, Konstantin Bulenkov', TRUE, 100, 800, 94, ARRAY['coding', 'ligatures', 'ergonomic', 'developer', 'clean', 'terminal'], ARRAY['code-editor', 'technical-docs', 'syntax-theme'], 'Engineered specifically for programming with increased letter height, crisp ligatures, and eye-relief.', 'https://fonts.google.com/specimen/JetBrains+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Fira Code', 'monospace', '["300","400","500","600","700"]'::jsonb, 'Nikita Prokopov', TRUE, 300, 700, 93, ARRAY['ligatures', 'coding', 'modern', 'hacker', 'ascii'], ARRAY['ide', 'engineering-blog', 'terminal'], 'Monospaced font containing programming ligatures that transform common symbol combinations into single glyphs.', 'https://fonts.google.com/specimen/Fira+Code'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'DM Mono', 'monospace', '["300","400","500","italic"]'::jsonb, 'Colophon Foundry', FALSE, 300, 500, 88, ARRAY['clean', 'neutral', 'refined', 'tech-editorial', 'balanced'], ARRAY['financial-data', 'receipts', 'design-spec'], 'Understated, elegantly proportioned monospaced typeface for subtle data tables and code accents.', 'https://fonts.google.com/specimen/DM+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'VT323', 'monospace', '["400"]'::jsonb, 'Peter Hull', FALSE, 400, 400, 85, ARRAY['crt', 'retro', 'terminal', 'dec-vt220', 'green-screen', 'vintage'], ARRAY['cli-interface', 'retro-adventure', 'hacker-screen'], 'Simulates the iconic DEC VT220 phosphor green CRT terminal screen glyphs from 1983.', 'https://fonts.google.com/specimen/VT323'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Sacramento', 'handwriting', '["400"]'::jsonb, 'Astigmatic', FALSE, 400, 400, 86, ARRAY['monoline', 'casual', '50s', 'script', 'invitation', 'delicate'], ARRAY['wedding-stationery', 'bakery-logo', 'handcrafted-soaps'], 'Semiconnected monoline script drawing from mid-century hand-lettered promotional art.', 'https://fonts.google.com/specimen/Sacramento'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Caveat', 'handwriting', '["400","500","600","700"]'::jsonb, 'Pablo Impallari', TRUE, 400, 700, 91, ARRAY['handwritten', 'casual', 'note', 'friendly', 'journal', 'organic'], ARRAY['sticky-notes', 'personal-blog', 'informal-quotes'], 'Fluid natural pen handwriting designed to look like personal notes and annotations.', 'https://fonts.google.com/specimen/Caveat'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Pacifico', 'handwriting', '["400"]'::jsonb, 'Vernon Adams', FALSE, 400, 400, 92, ARRAY['surf', 'california', 'beach', 'retro-script', 'brush', 'fun'], ARRAY['surfwear', 'smoothie-bar', 'ice-cream-shop'], 'Original brush script inspired by 1950s American surf culture and beach signs.', 'https://fonts.google.com/specimen/Pacifico'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Dancing Script', 'handwriting', '["400","500","600","700"]'::jsonb, 'Pablo Impallari', TRUE, 400, 700, 90, ARRAY['bouncy', 'lively', 'casual', 'friendly', 'script'], ARRAY['greetings', 'boutique', 'casual-packaging'], 'Lively informal script with bouncing baseline and letters changing size dynamically.', 'https://fonts.google.com/specimen/Dancing+Script'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Pinyon Script', 'handwriting', '["400"]'::jsonb, 'Nicole Fally', FALSE, 400, 400, 87, ARRAY['calligraphy', 'copperplate', 'swashes', 'formal', 'aristocratic', 'romantic'], ARRAY['invitation', 'luxury-champagne', 'château'], 'Romantic French round-hand script with dramatic curved swashes and luxury flair.', 'https://fonts.google.com/specimen/Pinyon+Script'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Open Sans', 'sans-serif', '["300","400","500","600","700","800"]'::jsonb, 'Steve Matteson', TRUE, 300, 800, 98, ARRAY['neutral', 'workhorse', 'humanist', 'open', 'friendly', 'legible'], ARRAY['corporate-website', 'documentation', 'dashboards', 'healthcare'], 'Humanist sans serif optimized for print, web, and mobile interfaces with upright stress and open forms.', 'https://fonts.google.com/specimen/Open+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Lato', 'sans-serif', '["100","300","400","700","900"]'::jsonb, 'Łukasz Dziedzic', FALSE, 100, 900, 97, ARRAY['warm', 'corporate', 'semi-rounded', 'elegant', 'balanced', 'classical'], ARRAY['finance', 'consulting', 'annual-reports', 'corporate-intranet'], 'Warm humanist proportions combined with sleek modernist stability, featuring subtle rounded inner corners.', 'https://fonts.google.com/specimen/Lato'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Raleway', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Matt McInerney', TRUE, 100, 900, 95, ARRAY['elegant', 'art-deco', 'geometric', 'distinctive', 'stylish', 'headings'], ARRAY['boutique-hotel', 'fashion-branding', 'event-invitations', 'architecture'], 'Elegant neo-grotesque with an art-deco heritage, recognized by its distinctive crossing W and delicate weight range.', 'https://fonts.google.com/specimen/Raleway'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Nunito', 'sans-serif', '["200","300","400","600","700","800","900"]'::jsonb, 'Vernon Adams', TRUE, 200, 900, 94, ARRAY['friendly', 'rounded', 'playful', 'welcoming', 'accessible', 'soft'], ARRAY['edtech', 'kids-products', 'consumer-fintech', 'wellness-app'], 'Well-balanced rounded terminal sans serif that brings warmth and approachability without looking childish.', 'https://fonts.google.com/specimen/Nunito'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Nunito Sans', 'sans-serif', '["200","300","400","600","700","800","900"]'::jsonb, 'Vernon Adams', TRUE, 200, 900, 93, ARRAY['clean', 'crisp', 'modern', 'flexible', 'legible', 'interface'], ARRAY['saas', 'enterprise', 'e-commerce', 'mobile-ui'], 'Straight-cornered sibling to Nunito, retaining open letterforms with a sharper, professional digital finish.', 'https://fonts.google.com/specimen/Nunito+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Sora', 'sans-serif', '["100","200","300","400","500","600","700","800"]'::jsonb, 'Jonathan Barnbrook', TRUE, 100, 800, 91, ARRAY['futuristic', 'digital', 'tech', 'crisp', 'geometric', 'cryptocurrency'], ARRAY['web3', 'cryptocurrency', 'hardware', 'cybersecurity'], 'Designed for low-resolution screen legibility with distinctive futuristic cues and high visual tension.', 'https://fonts.google.com/specimen/Sora'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Urbanist', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Corey Hu', TRUE, 100, 900, 92, ARRAY['geometric', 'sleek', 'urban', 'contemporary', 'architectural', 'clean'], ARRAY['lifestyle-brands', 'real-estate', 'urban-app', 'editorial-headings'], 'Low-contrast, geometric grotesque inspired by modern transit typography and mid-century architecture.', 'https://fonts.google.com/specimen/Urbanist'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Figtree', 'sans-serif', '["300","400","500","600","700","800","900"]'::jsonb, 'Erik Kennedy', TRUE, 300, 900, 90, ARRAY['friendly', 'tech', 'curved', 'modern', 'humanist', 'clean'], ARRAY['saas-landing', 'design-systems', 'mobile-apps', 'analytics'], 'A clean, geometric yet humanist variable font crafted specifically for digital products and UI design.', 'https://fonts.google.com/specimen/Figtree'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Geist Sans', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Vercel', TRUE, 100, 900, 96, ARRAY['developer', 'swiss', 'minimalist', 'high-tech', 'ultra-modern', 'precision'], ARRAY['developer-tools', 'ai-platforms', 'terminal-dashboards', 'tech-documentation'], 'Precision-engineered sans designed by Vercel for modern developer workflows, micro-clarity, and code interfaces.', 'https://fonts.google.com/specimen/Geist+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Lexend', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Thomas Jockin', TRUE, 100, 900, 91, ARRAY['high-legibility', 'accessible', 'educational', 'crisp', 'ergonomic'], ARRAY['education', 'accessibility-first', 'long-form-reading', 'medical-portals'], 'Empirically designed to improve reading proficiency and reduce cognitive fatigue through expanded tracking.', 'https://fonts.google.com/specimen/Lexend'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Albert Sans', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Andreas Rasmussen', TRUE, 100, 900, 88, ARRAY['scandinavian', 'minimalist', 'editorial', 'modern', 'geometric'], ARRAY['nordic-design', 'architecture-portfolio', 'minimal-lifestyle', 'furniture'], 'Geometric sans inspired by Danish modernist signage with an exceptionally even texture and airy proportions.', 'https://fonts.google.com/specimen/Albert+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Instrument Sans', 'sans-serif', '["400","500","600","700"]'::jsonb, 'Instrument', TRUE, 400, 700, 91, ARRAY['contemporary', 'editorial', 'quiet-tech', 'brand', 'refined'], ARRAY['creative-agencies', 'art-direction', 'venture-capital', 'lookbooks'], 'Contemporary grotesque crafted for forward-thinking creative brand systems and understated tech interfaces.', 'https://fonts.google.com/specimen/Instrument+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Archivo', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Omnibus-Type', TRUE, 100, 900, 89, ARRAY['bold', 'editorial', 'punchy', 'posters', 'grotesque', 'compact'], ARRAY['journalism', 'posters', 'magazine-covers', 'sports-branding'], 'Robust grotesque designed for simultaneously demanding headline prominence and body text clarity.', 'https://fonts.google.com/specimen/Archivo'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Cabin', 'sans-serif', '["400","500","600","700"]'::jsonb, 'Pablo Impallari', TRUE, 400, 700, 87, ARRAY['humanist', 'friendly', 'approachable', 'travel', 'rustic', 'warm'], ARRAY['travel-guides', 'outdoor-gear', 'cafes', 'nature-conservancy'], 'Humanist sans inspired by Edward Johnston with subtle natural optical touches and curved terminal terminals.', 'https://fonts.google.com/specimen/Cabin'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Public Sans', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'USWDS', TRUE, 100, 900, 89, ARRAY['civic', 'neutral', 'accessible', 'sturdy', 'authoritative', 'workhorse'], ARRAY['government', 'legal-tech', 'enterprise-portals', 'healthcare'], 'Neutral, robust open-source font engineered for government web systems with flawless micro-scale legibility.', 'https://fonts.google.com/specimen/Public+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Chivo', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Omnibus-Type', TRUE, 100, 900, 88, ARRAY['grotesque', 'tech', 'confident', 'angular', 'strong', 'industrial'], ARRAY['engineering', 'automotive', 'tech-blogs', 'b2b-platforms'], 'Grotesque with distinctive confident inner angles and sturdy terminals, great for headline dominance.', 'https://fonts.google.com/specimen/Chivo'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Rubik', 'sans-serif', '["300","400","500","600","700","800","900"]'::jsonb, 'Philipp Nurullin', TRUE, 300, 900, 94, ARRAY['rounded', 'friendly', 'soft', 'modern', 'game-ui', 'approachable'], ARRAY['social-platforms', 'casual-gaming', 'onboarding-screens', 'community-apps'], 'Slightly rounded corners and geometric proportions give Rubik an inviting, humane touch across all weights.', 'https://fonts.google.com/specimen/Rubik'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Quicksand', 'sans-serif', '["300","400","500","600","700"]'::jsonb, 'Andrew Paglinawan', TRUE, 300, 700, 92, ARRAY['rounded', 'whimsical', 'warm', 'friendly', 'gentle', 'clean'], ARRAY['bakery', 'lifestyle', 'crafts', 'skincare-packaging'], 'Display sans with geometric wireframe foundations and prominent pill-rounded stroke endings.', 'https://fonts.google.com/specimen/Quicksand'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Jost', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Owen Earl', TRUE, 100, 900, 90, ARRAY['futura-inspired', 'geometric', 'bauhaus', 'clean', 'functional', 'timeless'], ARRAY['bauhaus-art', 'minimal-fashion', 'posters', 'architecture'], 'A loving variable tribute to German Futura from the 1920s, optimized for digital typography.', 'https://fonts.google.com/specimen/Jost'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Overpass', 'sans-serif', '["100","200","300","400","600","700","800","900"]'::jsonb, 'Delve Withrington', TRUE, 100, 900, 87, ARRAY['highway-gothic', 'infrastructure', 'tech', 'open-source', 'clear'], ARRAY['transportation', 'devops', 'enterprise-software', 'wayfinding'], 'Based on the iconic US Highway Gothic lettering, designed by Red Hat for pristine enterprise systems.', 'https://fonts.google.com/specimen/Overpass'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Barlow', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Jeremy Tribby', FALSE, 100, 900, 91, ARRAY['californian', 'transit', 'low-contrast', 'grotesque', 'utilitarian'], ARRAY['public-transit', 'outdoor-apparel', 'urban-mobility', 'dashboard-metrics'], 'Slightly rounded, low-contrast grotesque drawn from California car license plates and highway signs.', 'https://fonts.google.com/specimen/Barlow'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Epilogue', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Tyler Finck', TRUE, 100, 900, 86, ARRAY['brutalist', 'variable', 'chunky', 'bold', 'contemporary', 'expressive'], ARRAY['record-labels', 'indie-games', 'editorial-covers', 'creative-manifestos'], 'A variable sans-serif with honest, heavy letterforms and surprising delicacy in its ultra-thin weights.', 'https://fonts.google.com/specimen/Epilogue'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Hanken Grotesk', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Hanken Design Co', TRUE, 100, 900, 88, ARRAY['neo-grotesque', 'crisp', 'editorial', 'modern', 'balanced'], ARRAY['news-publications', 'fintech-interfaces', 'corporate-identity'], 'Precision neo-grotesque drawing on classical 19th-century European sans-serifs with modern screen tuning.', 'https://fonts.google.com/specimen/Hanken+Grotesk'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Schibsted Grotesk', 'sans-serif', '["400","500","600","700","800","900"]'::jsonb, 'Apt, Bakken & Bæck', TRUE, 400, 900, 87, ARRAY['news', 'nordic', 'authoritative', 'editorial', 'fast-reading'], ARRAY['digital-journalism', 'newsletters', 'data-visualizations', 'reports'], 'Engineered for Scandinavian news journalism, providing rapid scanning speed and calm authority.', 'https://fonts.google.com/specimen/Schibsted+Grotesk'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Inter Tight', 'sans-serif', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Rasmus Andersson', TRUE, 100, 900, 90, ARRAY['tight-tracking', 'compact', 'dense-ui', 'modern', 'tech'], ARRAY['trading-screens', 'analytics-dashboards', 'compact-sidebars'], 'Compact proportion variant of Inter designed for tight columns, mobile headers, and dense data tables.', 'https://fonts.google.com/specimen/Inter+Tight'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Red Hat Display', 'sans-serif', '["300","400","500","600","700","800","900"]'::jsonb, 'MCKL', TRUE, 300, 900, 89, ARRAY['open-source', 'engineered', 'modern', 'tech', 'confident', 'display'], ARRAY['cloud-platforms', 'enterprise-software', 'developer-conferences'], 'Engineered for commanding headlines in tech environments, with tight spacing and bold presence.', 'https://fonts.google.com/specimen/Red+Hat+Display'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Josefin Sans', 'sans-serif', '["100","200","300","400","500","600","700"]'::jsonb, 'Santiago Orozco', TRUE, 100, 700, 91, ARRAY['vintage-1920s', 'geometric', 'delicate', 'fashion', 'scandinavian'], ARRAY['fashion-boutique', 'vintage-coffee', 'art-studios', 'postcards'], 'Geometric vintage style with Scandinavian flavor and unusually high x-height, ideal for stylish headers.', 'https://fonts.google.com/specimen/Josefin+Sans'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Merriweather', 'serif', '["300","400","700","900","italic"]'::jsonb, 'Eben Sorkin', FALSE, 300, 900, 96, ARRAY['reading', 'sturdy', 'editorial', 'academic', 'warm', 'screen-serif'], ARRAY['long-form-blog', 'academic-papers', 'news-portals', 'ebooks'], 'Designed from the ground up to be pleasant to read on computer screens with mild diagonal stress and condensed letterforms.', 'https://fonts.google.com/specimen/Merriweather'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Libre Baskerville', 'serif', '["400","700","italic"]'::jsonb, 'Impallari Type', FALSE, 400, 700, 93, ARRAY['literary', 'academic', 'traditional', 'baskerville', 'authoritative', 'dignified'], ARRAY['university-press', 'legal-firm', 'literary-magazine', 'history-archive'], 'Web font optimized for on-screen reading, rooted in John Baskerville’s celebrated 1757 transitional designs.', 'https://fonts.google.com/specimen/Libre+Baskerville'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Spectral', 'serif', '["200","300","400","500","600","700","800","italic"]'::jsonb, 'Production Type', FALSE, 200, 800, 91, ARRAY['google-docs', 'french', 'crisp', 'editorial', 'efficient', 'contemporary'], ARRAY['publishing', 'editorial-workflows', 'digital-essays', 'research-papers'], 'Commissioned by Google Docs, Spectral is a contemporary French editorial serif built for dense digital composition.', 'https://fonts.google.com/specimen/Spectral'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'DM Serif Display', 'serif', '["400","italic"]'::jsonb, 'Colophon Foundry', FALSE, 400, 400, 92, ARRAY['high-contrast', 'sharp', 'poster', 'editorial', 'sophisticated', 'headlines'], ARRAY['magazine-covers', 'luxury-packaging', 'fine-art-galleries', 'curated-newsletters'], 'High-contrast transitional serif with dramatic teardrop terminals and super sharp serifs for large headings.', 'https://fonts.google.com/specimen/DM+Serif+Display'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'DM Serif Text', 'serif', '["400","italic"]'::jsonb, 'Colophon Foundry', FALSE, 400, 400, 89, ARRAY['text-serif', 'editorial', 'reading', 'bookish', 'warm'], ARRAY['journal-articles', 'food-critiques', 'essay-collections'], 'Designed as the text companion to DM Serif Display, delivering sturdy proportions and high legibility at 14-18px.', 'https://fonts.google.com/specimen/DM+Serif+Text'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Cinzel Decorative', 'serif', '["400","700","900"]'::jsonb, 'Natanael Gama', FALSE, 400, 900, 90, ARRAY['regal', 'swashes', 'classical', 'fantasy', 'mythological', 'cinematic'], ARRAY['fantasy-games', 'luxury-champagne', 'gala-invitations', 'movie-posters'], 'Swash-embellished sister of Cinzel, boasting flourish terminals inspired by Renaissance inscriptions.', 'https://fonts.google.com/specimen/Cinzel+Decorative'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Italiana', 'serif', '["400"]'::jsonb, 'Santiago Orozco', FALSE, 400, 400, 89, ARRAY['italian-fashion', 'vogue', 'slender', 'ultra-luxury', 'couture', 'glamour'], ARRAY['high-fashion', 'perfume-bottles', 'couture-lookbook', 'jewelry-branding'], 'Conceived for Italian fashion magazines and haute couture titling, featuring slender stems and delicate serifs.', 'https://fonts.google.com/specimen/Italiana'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Marcellus', 'serif', '["400"]'::jsonb, 'Astigmatic', FALSE, 400, 400, 88, ARRAY['flared-serif', 'roman', 'titling', 'regal', 'sculpted', 'timeless'], ARRAY['spa-resort', 'luxury-skincare', 'heritage-estates', 'monumental-exhibits'], 'Flared-serif Roman titling font based on classic stone carvings, balancing dignity with warm organic curvature.', 'https://fonts.google.com/specimen/Marcellus'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Abril Fatface', 'serif', '["400"]'::jsonb, 'TypeTogether', FALSE, 400, 400, 92, ARRAY['fatface', '19th-century', 'dramatic', 'high-impact', 'poster', 'editorial'], ARRAY['posters', 'culinary-branding', 'bold-headlines', 'event-banners'], 'Part of an expansive system inspired by 19th-century British and French advertising titling with extreme contrast.', 'https://fonts.google.com/specimen/Abril+Fatface'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Prata', 'serif', '["400"]'::jsonb, 'Cyreal', FALSE, 400, 400, 88, ARRAY['didone', 'sharp-teardrop', 'couture', 'luxury', 'refined', 'elegant'], ARRAY['cosmetics', 'fine-stationery', 'bridal-magazines', 'art-galleries'], 'Didone display typeface with teardrop terminals, delicate hairlines, and razor-sharp horizontal bracketed serifs.', 'https://fonts.google.com/specimen/Prata'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Crimson Pro', 'serif', '["200","300","400","500","600","700","800","900","italic"]'::jsonb, 'Jacques Le Bailly', TRUE, 200, 900, 91, ARRAY['oldstyle', 'garamond-inspired', 'book-typography', 'scholar', 'warm'], ARRAY['book-publishing', 'research-papers', 'history-essays', 'literary-apps'], 'A sophisticated Garamond-style variable revival purpose-crafted for book design and scholarly reading.', 'https://fonts.google.com/specimen/Crimson+Pro'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Besley', 'serif', '["400","500","600","700","800","900","italic"]'::jsonb, 'Indestructible Type', TRUE, 400, 900, 86, ARRAY['clarendon', 'antique-slab', 'bold', 'friendly', 'warm-editorial'], ARRAY['craft-spirits', 'heritage-clothing', 'rustic-cafes', 'woodworking-brands'], 'Revival of the first registered Clarendon font from 1845, with round bracketed slabs and immense character.', 'https://fonts.google.com/specimen/Besley'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Vollkorn', 'serif', '["400","600","700","900","italic"]'::jsonb, 'Friedrich Althausen', TRUE, 400, 900, 89, ARRAY['german-quiet', 'hearty', 'bookish', 'rustic', 'sturdy', 'authentic'], ARRAY['bakeries', 'indie-press', 'academic-reviews', 'nature-writing'], 'A hearty bread-and-butter serif with dark color, heavy serifs, and quiet German artisanal dignity.', 'https://fonts.google.com/specimen/Vollkorn'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Cardo', 'serif', '["400","700","italic"]'::jsonb, 'David Perry', FALSE, 400, 700, 88, ARRAY['aldine', 'classical-humanist', 'renaissance', 'scholar', 'latin'], ARRAY['classical-studies', 'theology', 'museum-catalogs', 'historical-fiction'], 'Classic humanist Roman font designed for medievalists, classicists, and linguists after Aldus Manutius.', 'https://fonts.google.com/specimen/Cardo'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Source Serif 4', 'serif', '["200","300","400","600","700","900","italic"]'::jsonb, 'Frank Grießhammer', TRUE, 200, 900, 91, ARRAY['adobe', 'workhorse', 'clean-serif', 'professional', 'clear', 'variable'], ARRAY['corporate-reports', 'newsletters', 'technical-publications', 'ui-pairing'], 'Adobe’s open source companion to Source Sans, inspired by Pierre-Simon Fournier’s 18th-century work.', 'https://fonts.google.com/specimen/Source+Serif+4'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Bitter', 'serif', '["100","200","300","400","500","600","700","800","900","italic"]'::jsonb, 'Sol Matas', TRUE, 100, 900, 90, ARRAY['slab-serif', 'screen-first', 'sturdy', 'journalism', 'legible', 'rhythmic'], ARRAY['e-readers', 'journalism-apps', 'editorial-body', 'long-form-mobile'], 'Contemporary slab serif designed for comfortable reading on small digital screens with thick strokes.', 'https://fonts.google.com/specimen/Bitter'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Arvo', 'serif', '["400","700","italic"]'::jsonb, 'Anton Koovit', FALSE, 400, 700, 89, ARRAY['geometric-slab', 'husky', 'clean', 'punchy', 'contemporary', 'strong'], ARRAY['tech-hardware', 'posters', 'subheadings', 'fintech-badges'], 'Geometric slab serif family suitable for both screen and print, balancing mechanical clarity with friendly angles.', 'https://fonts.google.com/specimen/Arvo'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Domine', 'serif', '["400","500","600","700"]'::jsonb, 'Impallari Type', TRUE, 400, 700, 87, ARRAY['digital-press', 'tall-x-height', 'warm', 'approachable', 'content-sites'], ARRAY['blogs', 'content-portals', 'product-reviews', 'podcasts'], 'Engineered specifically for web body copy with tall x-height and rounded serifs that do not degrade at small sizes.', 'https://fonts.google.com/specimen/Domine'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Castoro', 'serif', '["400","italic"]'::jsonb, 'Tiro Typeworks', FALSE, 400, 400, 86, ARRAY['scholarly', 'italian-renaissance', 'bembo-heritage', 'warm', 'composed'], ARRAY['literary-criticism', 'history-volumes', 'philosophy-books'], 'Scholarly roman inspired by Aldus Manutius and Pietro Bembo, exhibiting relaxed proportions and refined grace.', 'https://fonts.google.com/specimen/Castoro'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Alfa Slab One', 'display', '["400"]'::jsonb, 'JM Solé', FALSE, 400, 400, 91, ARRAY['heavy-slab', 'western', 'chunky', 'bold', 'retro-advertising', 'commanding'], ARRAY['craft-beer', 'burger-joints', 'bold-posters', 'sports-tournaments'], 'Contemporary take on 19th-century six-line pica Egyptian heavy slabs, packing intense weight into headlines.', 'https://fonts.google.com/specimen/Alfa+Slab+One'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Bangers', 'display', '["400"]'::jsonb, 'Vernon Adams', FALSE, 400, 400, 92, ARRAY['comic-book', 'pop-art', 'loud', 'explosive', 'fun', 'energetic'], ARRAY['gaming-thumbnails', 'comic-strips', 'kids-events', 'action-posters'], 'Mid-century comic book style titling font reminiscent of vintage superhero covers and pop-art posters.', 'https://fonts.google.com/specimen/Bangers'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Black Ops One', 'display', '["400"]'::jsonb, 'James Grieshaber', FALSE, 400, 400, 89, ARRAY['military', 'stencil', 'heavy', 'tactical', 'fps-gaming', 'industrial'], ARRAY['tactical-gaming', 'esports', 'heavy-machinery', 'extreme-sports'], 'Heavy military-stencil display font with industrial breaks and imposing angular presence.', 'https://fonts.google.com/specimen/Black+Ops+One'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Silkscreen', 'display', '["400","700"]'::jsonb, 'Jason Kottke', FALSE, 400, 700, 90, ARRAY['pixel-art', 'retro-gaming', '8-bit', 'arcade', 'nostalgic', 'cyber'], ARRAY['pixel-games', 'crypto-art', 'gameboy-nostalgia', 'tech-zines'], 'The definitive web pixel font by Jason Kottke, bringing authentic 8-bit arcade crispness to screen headers.', 'https://fonts.google.com/specimen/Silkscreen'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Bungee', 'display', '["400"]'::jsonb, 'David Jonathan Ross', FALSE, 400, 400, 88, ARRAY['vertical-signage', 'urban', 'liquor-store', 'chunky', 'streetwear', 'bold'], ARRAY['streetwear', 'food-trucks', 'urban-signage', 'event-merch'], 'Celebrates the urban sign maker’s art, specifically designed to adapt seamlessly to vertical or horizontal text.', 'https://fonts.google.com/specimen/Bungee'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Bungee Shade', 'display', '["400"]'::jsonb, 'David Jonathan Ross', FALSE, 400, 400, 86, ARRAY['chromatic', '3d-extrusion', 'vintage-sign', 'playful', 'shaded'], ARRAY['arcade-bars', 'festival-flyers', 'retro-packaging'], 'Extruded dimensional shadow variation of Bungee for eye-catching retro titles and neon vibes.', 'https://fonts.google.com/specimen/Bungee+Shade'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'DynaPuff', 'display', '["400","500","600","700"]'::jsonb, 'Toshi Omagari', TRUE, 400, 700, 89, ARRAY['bubble', 'marshmallow', 'playful', 'y2k', 'cute', 'cartoon'], ARRAY['kids-apps', 'bubble-tea', 'stickers', 'fun-merch'], 'Inflatable bubbly variable font inspired by marshmallow curves and bouncy sticker design.', 'https://fonts.google.com/specimen/DynaPuff'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Rubik Glitch', 'display', '["400"]'::jsonb, 'Stefan Peev', FALSE, 400, 400, 90, ARRAY['cyberpunk', 'glitch-art', 'corrupted', 'hacker', 'dystopian', 'digital-noise'], ARRAY['cyberpunk-games', 'electronic-music', 'hacker-conventions', 'sci-fi-posters'], 'Displaced pixel-shifted glitch alteration of Rubik, screaming digital corruption and dark cyberpunk.', 'https://fonts.google.com/specimen/Rubik+Glitch'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Rubik Mono One', 'display', '["400"]'::jsonb, 'Philipp Nurullin', FALSE, 400, 400, 88, ARRAY['wide-block', 'heavy', 'brutalist', 'monospaced-display', 'stamp'], ARRAY['rave-flyers', 'brutalist-web', 'zine-covers', 'bold-stickers'], 'Ultra-wide, monospaced heavy block letters with rounded edges, functioning as a brutalist poster hammer.', 'https://fonts.google.com/specimen/Rubik+Mono+One'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Anton', 'display', '["400"]'::jsonb, 'Vernon Adams', FALSE, 400, 400, 94, ARRAY['condensed', 'headline-impact', 'heavy-sans', 'ad-banner', 'urgent'], ARRAY['youtube-thumbnails', 'sale-banners', 'sports-graphics', 'billboards'], 'Reworking of traditional advertising grots, condensed and heavy for commanding attention in tight spaces.', 'https://fonts.google.com/specimen/Anton'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Syncopate', 'display', '["400","700"]'::jsonb, 'Astigmatic', FALSE, 400, 700, 87, ARRAY['ultra-wide', 'architectural', 'cinematic', 'minimal-luxury', 'extended'], ARRAY['architecture-firms', 'cinema-opening-credits', 'high-tech-hardware', 'fashion-logos'], 'Low-profile ultra-wide uppercase grotesque font that adds architectural grandeur and high-end tech styling.', 'https://fonts.google.com/specimen/Syncopate'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Audiowide', 'display', '["400"]'::jsonb, 'Astigmatic', FALSE, 400, 400, 90, ARRAY['synthwave', 'techno', 'sci-fi', 'futuristic-corners', 'aerospace'], ARRAY['space-simulators', 'synthwave-covers', 'robotics-teams', 'tech-exhibits'], 'Techno-futuristic display font with rounded outer corners and rigid internal geometry.', 'https://fonts.google.com/specimen/Audiowide'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Michroma', 'display', '["400"]'::jsonb, 'Vernon Adams', FALSE, 400, 400, 87, ARRAY['microgramma-tribute', 'space-age', 'automotive', 'wide-square', '60s-scifi'], ARRAY['automotive-dashboards', 'aerospace', 'sci-fi-branding', 'drone-tech'], 'A modernized homage to Aldo Novarese’s legendary Microgramma font from 1952, conveying aerospace technology.', 'https://fonts.google.com/specimen/Michroma'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Special Elite', 'display', '["400"]'::jsonb, 'Brian J. Bonislawsky', FALSE, 400, 400, 91, ARRAY['typewriter', 'grunge', 'classified', 'vintage-detective', 'distressed'], ARRAY['escape-rooms', 'mystery-novels', 'secret-agent-games', 'vintage-scrapbooks'], 'Authentic 1960s Smith-Corona Remington typewriter lettering with gritty ink bleed and uneven keystroke texture.', 'https://fonts.google.com/specimen/Special+Elite'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Caesar Dressing', 'display', '["400"]'::jsonb, 'Open Window', FALSE, 400, 400, 84, ARRAY['stone-carved', 'ancient-roman', 'mythology', 'chiseled', 'theatrical'], ARRAY['mythology-games', 'theatre-posters', 'museum-educational', 'themed-restaurants'], 'Whimsical Roman stone-carved display with irregular chiseled serifs and playful classical drama.', 'https://fonts.google.com/specimen/Caesar+Dressing'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'UnifrakturMaguntia', 'display', '["400"]'::jsonb, 'J. Mach Wust', FALSE, 400, 400, 88, ARRAY['blackletter', 'gothic', 'medieval', 'metal-band', 'tattoo-art', 'dramatic'], ARRAY['heavy-metal-covers', 'craft-beer-labels', 'streetwear-graphics', 'tattoo-studios'], 'Authentic German Fraktur blackletter calligraphy based on classical Mainz 19th-century typesetting.', 'https://fonts.google.com/specimen/UnifrakturMaguntia'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Rye', 'display', '["400"]'::jsonb, 'Nicole Fally', FALSE, 400, 400, 86, ARRAY['wild-west', 'saloon', 'wood-type', 'vintage-circus', 'bold-spurs'], ARRAY['whiskey-bottles', 'barbecue-joints', 'rodeo-events', 'vintage-westerns'], 'American Wild West wood-type display featuring prominent center spurs and saloon poster swagger.', 'https://fonts.google.com/specimen/Rye'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Vast Shadow', 'display', '["400"]'::jsonb, 'Sorkin Type', FALSE, 400, 400, 85, ARRAY['victorian', 'drop-shadow', 'circus', 'nostalgic', 'theatrical'], ARRAY['carnival-events', 'antique-fairs', 'circus-branding', 'parlor-games'], 'Victorian-era slab serif with an integrated deep drop shadow, evoking carnival banners and silent cinema.', 'https://fonts.google.com/specimen/Vast+Shadow'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Roboto Mono', 'monospace', '["100","200","300","400","500","600","700"]'::jsonb, 'Christian Robertson', TRUE, 100, 700, 96, ARRAY['google', 'clean-code', 'reading', 'balanced', 'workhorse', 'terminal'], ARRAY['code-editors', 'terminal-emulators', 'technical-specs', 'dev-docs'], 'Monospaced companion to Roboto, tweaked extensively for developer code readability and tabular UI displays.', 'https://fonts.google.com/specimen/Roboto+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Inconsolata', 'monospace', '["200","300","400","500","600","700","800","900"]'::jsonb, 'Raph Levien', TRUE, 200, 900, 93, ARRAY['humanist-mono', 'elegant-code', 'consola-alternative', 'clarity', 'coder'], ARRAY['source-code-blocks', 'cli-tools', 'markdown-previews', 'data-tables'], 'A humanist monospace font drawing inspiration from Consolas, crafted for sheer beauty in coding environments.', 'https://fonts.google.com/specimen/Inconsolata'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Source Code Pro', 'monospace', '["200","300","400","500","600","700","900"]'::jsonb, 'Paul D. Hunt', TRUE, 200, 900, 95, ARRAY['adobe', 'ide-staple', 'distinguishable-glyphs', 'ergonomic', 'clarity'], ARRAY['ide-themes', 'developer-portfolios', 'syntax-highlighters'], 'Adobe’s premier monospaced typeface with oversized punctuation and distinct zero/O differentiation.', 'https://fonts.google.com/specimen/Source+Code+Pro'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Red Hat Mono', 'monospace', '["300","400","500","600","700"]'::jsonb, 'MCKL', TRUE, 300, 700, 90, ARRAY['linux-terminal', 'open-source', 'technical', 'sharp', 'crisp'], ARRAY['linux-distros', 'cloud-consoles', 'devops-dashboards', 'sysadmin-tools'], 'Part of Red Hat’s brand system, specifically proportioned for system logs, command lines, and code clarity.', 'https://fonts.google.com/specimen/Red+Hat+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Azeret Mono', 'monospace', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Martin Vácha', TRUE, 100, 900, 91, ARRAY['brutalist', 'quirky', 'experimental', 'hacker', 'modern-art', 'contemporary'], ARRAY['web3-dapps', 'brutalist-websites', 'creative-tech', 'art-galleries'], 'Brutalist, idiosyncratic variable monospace font built for experimental typography and contemporary web art.', 'https://fonts.google.com/specimen/Azeret+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Courier Prime', 'monospace', '["400","700","italic"]'::jsonb, 'Quote-Unquote Apps', FALSE, 400, 700, 91, ARRAY['screenplay', 'hollywood', 'classic-typewriter', 'literary', 'scriptwriting'], ARRAY['screenplays', 'scriptwriting-apps', 'vintage-fiction', 'stage-plays'], 'Engineered specifically for Hollywood screenplays, fixing Courier’s pixelation with refined curves and balanced color.', 'https://fonts.google.com/specimen/Courier+Prime'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Major Mono Display', 'monospace', '["400"]'::jsonb, 'Iván Moreno', FALSE, 400, 400, 86, ARRAY['avant-garde', 'geometric-shift', 'experimental', 'minimalist', 'museum'], ARRAY['art-museum-branding', 'experimental-music', 'high-fashion-titling'], 'Avant-garde monospaced titling font mixing uppercase and lowercase forms into pure geometric abstractions.', 'https://fonts.google.com/specimen/Major+Mono+Display'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Syne Mono', 'monospace', '["400"]'::jsonb, 'Bonjour Monde', FALSE, 400, 400, 88, ARRAY['art-collective', 'eccentric', 'quirky', 'creative', 'french-modern'], ARRAY['design-collectives', 'exhibition-guides', 'creative-portfolios'], 'Monospaced variation of the Syne type family, retaining playful eccentric terminals and distinctive personality.', 'https://fonts.google.com/specimen/Syne+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Share Tech Mono', 'monospace', '["400"]'::jsonb, 'Carrois Apostrophe', FALSE, 400, 400, 89, ARRAY['hud-display', 'sci-fi-terminal', 'aerospace', 'tactical', 'military-tech'], ARRAY['sci-fi-games', 'flight-simulators', 'telemetry-dashboards', 'hacker-terminals'], 'Heads-up-display styling inspired by avionics dashboards and military command consoles.', 'https://fonts.google.com/specimen/Share+Tech+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Geist Mono', 'monospace', '["100","200","300","400","500","600","700","800","900"]'::jsonb, 'Vercel', TRUE, 100, 900, 95, ARRAY['vercel', 'precision', 'developer-first', 'modern-code', 'high-contrast'], ARRAY['code-snippets', 'cli-interfaces', 'analytics-tables', 'fintech-crypto'], 'Code-first monospaced typeface designed by Vercel for code blocks, terminal prompts, and dense numeric data.', 'https://fonts.google.com/specimen/Geist+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Anonymous Pro', 'monospace', '["400","700","italic"]'::jsonb, 'Mark Simonson', FALSE, 400, 700, 87, ARRAY['programmer', 'clean-differentiation', 'nostalgic-coding', 'clarity'], ARRAY['programming-tutorials', 'terminal-logs', 'hardware-config'], 'Designed specifically for coding with clear distinction between 0/O and 1/l/I, plus intentional punctuation marks.', 'https://fonts.google.com/specimen/Anonymous+Pro'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Ubuntu Mono', 'monospace', '["400","700","italic"]'::jsonb, 'Canonical', FALSE, 400, 700, 91, ARRAY['linux', 'friendly-monospace', 'rounded-terminal', 'open-source'], ARRAY['linux-terminals', 'sysadmin-consoles', 'dev-tutorials'], 'Monospaced edition of the Ubuntu font system, featuring warm humanist curves and cozy command line presence.', 'https://fonts.google.com/specimen/Ubuntu+Mono'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Satisfy', 'handwriting', '["400"]'::jsonb, 'Sideshow', FALSE, 400, 400, 91, ARRAY['brushed-script', 'retro-diner', 'fluid', 'friendly', 'casual-signage'], ARRAY['ice-cream-parlors', 'vintage-clothing', 'recipe-books', 'menus'], 'Timeless brush script with a gentle rhythm, reminiscent of mid-century American diner window lettering.', 'https://fonts.google.com/specimen/Satisfy'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Alex Brush', 'handwriting', '["400"]'::jsonb, 'TypeSETit', FALSE, 400, 400, 92, ARRAY['flowing-calligraphy', 'elegant-wedding', 'graceful', 'swashes', 'formal'], ARRAY['wedding-stationery', 'luxury-candle-packaging', 'event-monograms'], 'Flowing cursive script with dramatic short ascenders and descenders for exceptional text compactness.', 'https://fonts.google.com/specimen/Alex+Brush'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Great Vibes', 'handwriting', '["400"]'::jsonb, 'TypeSETit', FALSE, 400, 400, 93, ARRAY['flourishes', 'copperplate', 'formal-script', 'luxurious', 'romantic'], ARRAY['gala-programs', 'fine-wine-bottles', 'diplomas', 'anniversary-cards'], 'Dramatic flowing script with looping ascenders and descenders, embodying classical celebration.', 'https://fonts.google.com/specimen/Great+Vibes'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Kalam', 'handwriting', '["300","400","700"]'::jsonb, 'Indian Type Foundry', FALSE, 300, 700, 90, ARRAY['felt-tip', 'warm-human', 'informal', 'authentic', 'friendly-notes'], ARRAY['personal-notes', 'illustration-captions', 'organic-food-stands', 'post-it-cards'], 'Informal handwriting font derived from felt-tip pen strokes, originating from Latin and Devanagari scripts.', 'https://fonts.google.com/specimen/Kalam'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Indie Flower', 'handwriting', '["400"]'::jsonb, 'Kimberly Geswein', FALSE, 400, 400, 92, ARRAY['bubbly', 'carefree', 'handwritten-journal', 'whimsical', 'friendly'], ARRAY['creative-journals', 'craft-blogs', 'greeting-cards', 'diy-branding'], 'Carefree, rounded casual handwriting with bubbly loops and an uplifting, personal diary aesthetic.', 'https://fonts.google.com/specimen/Indie+Flower'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Shadows Into Light', 'handwriting', '["400"]'::jsonb, 'Kimberly Geswein', FALSE, 400, 400, 91, ARRAY['neat-cursive', 'feminine', 'clean-handwriting', 'personal', 'warm'], ARRAY['stationery-boutiques', 'bullet-journaling', 'personal-signatures'], 'Neat, sweet, and legible handwriting font with rounded edges and gentle feminine flair.', 'https://fonts.google.com/specimen/Shadows+Into+Light'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Amatic SC', 'handwriting', '["400","700"]'::jsonb, 'Vernon Adams', FALSE, 400, 700, 94, ARRAY['condensed-caps', 'quirky', 'hand-drawn-posters', 'artisanal', 'indie'], ARRAY['craft-packaging', 'indie-films', 'food-blogs', 'illustrated-quotes'], 'Simple, delicate, and condensed hand-drawn all-caps typeface that exudes indie charm on titles.', 'https://fonts.google.com/specimen/Amatic+SC'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Marck Script', 'handwriting', '["400"]'::jsonb, 'Marck Fogel', FALSE, 400, 400, 88, ARRAY['felt-pen', 'casual-lettering', 'readable-script', 'inviting'], ARRAY['greeting-cards', 'recipe-notes', 'cafe-blackboards'], 'Freehand felt-tip pen cursive script optimized for digital reading without excessive decorative curls.', 'https://fonts.google.com/specimen/Marck+Script'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Allura', 'handwriting', '["400"]'::jsonb, 'TypeSETit', FALSE, 400, 400, 89, ARRAY['formal-handwritten', 'smooth-calligraphy', 'invitation', 'gentle'], ARRAY['diplomas', 'perfumery', 'boutique-cards'], 'Stylized yet highly legible script font tailored for certificates, soft packaging, and invitations.', 'https://fonts.google.com/specimen/Allura'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Courgette', 'handwriting', '["400"]'::jsonb, 'Karolina Lach', FALSE, 400, 400, 88, ARRAY['medium-contrast-brush', 'compact-script', 'warm', 'friendly', 'magazine'], ARRAY['magazine-titles', 'organic-brands', 'cookbooks'], 'Medium-contrast brush script with a low slant and distinct letter connection designed for headlines.', 'https://fonts.google.com/specimen/Courgette'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Yellowtail', 'handwriting', '["400"]'::jsonb, 'Astigmatic', FALSE, 400, 400, 87, ARRAY['1930s-sign-painter', 'flat-brush', 'casual', 'warm-retro'], ARRAY['seafood-shacks', 'vintage-gas-stations', 'diner-merch'], 'Old-school 1930s sign-painter brush script mixing connected and non-connected letterforms.', 'https://fonts.google.com/specimen/Yellowtail'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Kaushan Script', 'handwriting', '["400"]'::jsonb, 'Impallari Type', FALSE, 400, 400, 89, ARRAY['energetic-brush', 'unrefined', 'natural-paper', 'dynamic', 'bold-script'], ARRAY['coffee-roasters', 'art-supplies', 'outdoor-festival-posters'], 'Energetic and unrefined script with brush texture and natural ink carryover that holds up at small sizes.', 'https://fonts.google.com/specimen/Kaushan+Script'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Rock Salt', 'handwriting', '["400"]'::jsonb, 'Sideshow', FALSE, 400, 400, 89, ARRAY['marker-pen', 'grunge', 'rebel', 'rock-n-roll', 'hand-scrawled'], ARRAY['rock-band-posters', 'skateboarding-brands', 'street-food-menus'], 'Hand-scrawled felt marker script with aggressive angles inspired by rock concert posters and skater tags.', 'https://fonts.google.com/specimen/Rock+Salt'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Parisienne', 'handwriting', '["400"]'::jsonb, 'Astigmatic', FALSE, 400, 400, 88, ARRAY['french-boutique', 'casual-chic', 'free-spirited', 'feminine', 'vintage'], ARRAY['parisian-bakeries', 'perfume-packaging', 'vintage-boutiques'], 'Casual chic script influenced by 1960s French advertising, featuring slight bounce and gentle slant.', 'https://fonts.google.com/specimen/Parisienne'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;

INSERT INTO fonts (
  family, category, variants, designer, is_variable, min_weight, max_weight, popularity, mood_tags, use_cases, description, google_fonts_url
) VALUES (
  'Permanent Marker', 'handwriting', '["400"]'::jsonb, 'Font Diner', FALSE, 400, 400, 93, ARRAY['sharpie', 'street-art', 'bold-marker', 'punchy', 'graffiti-note'], ARRAY['sale-signage', 'protest-posters', 'sports-coaching', 'snack-packaging'], 'Replicates the bold, unvarnished look of a wide chisel-tip permanent marker on cardboard or whiteboards.', 'https://fonts.google.com/specimen/Permanent+Marker'
)
ON CONFLICT (family) DO UPDATE SET
  category = EXCLUDED.category,
  variants = EXCLUDED.variants,
  designer = EXCLUDED.designer,
  is_variable = EXCLUDED.is_variable,
  min_weight = EXCLUDED.min_weight,
  max_weight = EXCLUDED.max_weight,
  popularity = EXCLUDED.popularity,
  mood_tags = EXCLUDED.mood_tags,
  use_cases = EXCLUDED.use_cases,
  description = EXCLUDED.description,
  google_fonts_url = EXCLUDED.google_fonts_url;
