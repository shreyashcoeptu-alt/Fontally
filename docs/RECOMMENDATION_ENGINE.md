# How Fontally recommends fonts, and why this setup

*Measured 7–8 November 2026 on the project's Gemini key (free tier). Re-run `npm run eval` whenever the prompt, catalog or model changes.*

## TL;DR

| Decision | Choice | Why |
|---|---|---|
| Primary model | **`gemini-3.1-flash-lite`** | The only model that scored 100% top-1 on both the keyword briefs and the held-out natural-language briefs; 0 errors; about 2.5s per answer |
| Fallback chain | → `gemini-3.5-flash-lite` → `gemini-2.5-flash` | Next best quality, fastest; then a different model family for resilience. Each model has its own quota. |
| Thinking | Minimal (`thinkingLevel: "minimal"` on 3.x, `thinkingBudget: 0` on 2.5) | Choosing from a list doesn't need reasoning tokens. They cost latency and used to truncate the JSON. |
| Output | 3 distinct picks + brand name, schema-constrained JSON, validated against the catalog | Taste is subjective; a choice of three beats one answer. Validation means Gemini can't invent fonts. |
| Catalog sent | **20-profile shortlist** when the brief has strong keyword matches, otherwise all 106 | Same or better quality, half the tokens. See [Shortlist experiment](#shortlist-experiment). |
| When Gemini is unavailable | Offline keyword matcher, labelled as such | Always answers, but measurably weaker on natural language (56% vs 100%) |

## How we got here

### 1. Built a yardstick first

Without a test set, "best model" is a matter of opinion. `tests/eval/briefs.json` holds 70 briefs, each with the profile ids a type director would accept:

| Kind | Count | Purpose |
|---|---|---|
| industry | 32 | "Neobank app for Gen Z…", "Michelin-starred tasting menu…" |
| mood | 8 | "quiet luxury, understated and expensive" |
| named-font | 5 | "something like Fraunces, warm and a bit wonky" |
| multilingual | 5 | Japanese, French, Italian, Korean, mixed Tokyo signage |
| **paraphrase** | **16** | Natural language that avoids the catalog's keywords on purpose ("A place where tired parents grab a flat white…"). **Never used for tuning:** this is the honest test of understanding. |
| reject | 4 | Keyboard mashing that must be refused |

Metrics: **top-1** (the main card is acceptable), **top-3** (at least one of the three cards is acceptable), latency (average and p90), errors after retries, and **distinctness** (the three picks use three different heading fonts).

### 2. Fixed the request before comparing models

A comparison is only fair if every model gets a valid request:
- Gemini 3.x rejects `thinkingBudget: 0` with **400** on some models (`gemini-3.5-flash-lite`). It now gets `thinkingLevel: "minimal"`; 2.5 keeps `thinkingBudget: 0`. Measured thinking tokens: **0** on every model tested.
- `gemini-2.5-flash-lite` returned **404**: it is retired for new users.

### 3. Compared seven models on the same 54 keyword + reject briefs (full catalog, 5 requests/min)

| Model | Top-1 | Top-3 | Avg / p90 | Errors | Outcome |
|---|---|---|---|---|---|
| **gemini-3.1-flash-lite** | **100%** | **100%** | 2.43s / 2.89s | **0** | ✅ complete |
| gemini-3.5-flash-lite | 98% | 100% | **1.98s / 2.20s** | 0 (1 retry) | ✅ complete |
| gemini-2.5-flash | — | — | ~3.5s | 429 after 24 answers | ❌ quota |
| gemini-3.5-flash | — | — | — | 429 after 3 answers | ❌ quota |
| gemini-3.6-flash | — | — | ~3.9s | 429 after 3 answers | ❌ quota |
| gemini-3.7-flash | — | — | — | 503 "high demand" + 429 | ❌ unavailable |
| gemini-3.8-flash | — | — | — | timeouts (30s) + 429 | ❌ unavailable |

Both Lite models gave three distinct heading fonts in over 90% of answers (45/49 and 45/48). The 4 gibberish briefs never reach Gemini; Fontally's own guard rejects them (4/4).

The larger Flash models may well be as good. Their first answers were sensible. But on this key they **can't sustain even 5 requests a minute** with a 7k-token prompt. A model that answers 3 times and then fails would push most visitors to the offline matcher, so reliability decided this round.

### 4. Separated the two finalists on the hard set (16 paraphrase briefs)

| Model | Top-1 | Top-3 | Avg / p90 | Errors |
|---|---|---|---|---|
| **gemini-3.1-flash-lite** | **100% (16/16)** | **100%** | 2.48s / 3.38s | 0 |
| gemini-3.5-flash-lite | 87.5% (14/16) | 100% | 2.02s / 2.30s | 0 |
| Offline keyword matcher | — | 56% (9/16) | instant | — |

`3.1-flash-lite` put an acceptable pairing in the main card for every natural-language brief. `3.5-flash-lite` is about 0.5s faster but missed the main card twice. Getting the main card right matters more than half a second, so **3.1-flash-lite is primary and 3.5-flash-lite is the first fallback.**

### Shortlist experiment

Sending all 106 profiles costs about 7,000 input tokens per request. The shortlist (`RECOMMEND_CANDIDATES=20`) sends only the top 20 profiles by keyword score, **but only when at least 3 profiles have a strong whole-word match**. Abstract briefs ("make it feel expensive") still get the full catalog, and profiles that can render a non-Latin brief are always included. Both finalists were re-run on all 70 briefs:

| Setup | Keyword top-1 / top-3 | Paraphrase top-1 / top-3 | Avg / p90 | Avg input tokens |
|---|---|---|---|---|
| 3.5-flash-lite, full catalog | 98% / 100% | 87.5% / 100% | 1.98s / 2.20s | 7,061 |
| 3.5-flash-lite, shortlist | 98% / 100% | **100% / 100%** | **1.82s / 2.35s** | **3,767** |
| 3.1-flash-lite, full catalog | 100% / 100% | 100% / 100% | 2.43s / 2.89s | 7,061 |
| 3.1-flash-lite, shortlist | 100% of 45 answered | 100% / 100% | 2.87s / 2.97s | 3,862 |

The shortlist applied to 35–39 of about 65 requests; the rest were abstract enough to get the full catalog.

**No quality was lost, and token use halved**, so the shortlist is on by default (`DEFAULT_CANDIDATE_LIMIT = 20` in `server/lib/candidates.mjs`). The 3.1-flash-lite shortlist run had 5 quota errors (429). They happened because the test harness ran two evals against the same model at once (about 10 requests a minute), not because of the shortlist. That is more evidence of how tight the free tier is.

### 5. What the offline matcher taught us

The keyword matcher started at 88% top-1 / 94% top-3 on the keyword briefs. Two real bugs, not tuning, moved it to 98% / 100%:
- Font-name matching used substrings, so "it" in "make **it** feel expensive" earned the +25 font-name bonus from **It**aliana, and "star" matched Press **Start** 2P.
- Filler words ("make", "feel", "want", "something") counted as signals.

On the held-out paraphrases it still only reaches **56% top-3**. That's the evidence for keeping Gemini as the primary engine and the matcher strictly as a fallback.

## Why this is the best option *available to this project*

1. **Quality:** tied for best on the easy set and **alone at 100%** on the hard set.
2. **Reliability:** the only top-quality model that completed every request on the free tier with zero errors.
3. **Latency:** about 2.5s, comfortably inside the 12s server budget and the 14s browser timeout.
4. **Cost:** Flash-Lite is Gemini's cheapest tier, which matters once billing is on.
5. **Resilience:** the chain spans two model generations, each with its own quota, and a model that just hit quota is skipped for its retry window.

Honest caveats:
- The eval set is 70 briefs written by one person. It catches regressions and big differences, not fine shades of taste. Grow it from real briefs, and from the feedback log once Supabase is back.
- The bigger Flash models couldn't be measured on this key's free tier. With billing enabled, re-run `GEMINI_MODEL=gemini-3.8-flash npm run eval`; if it beats 3.1-flash-lite on the paraphrase set at acceptable latency, change the chain in `server/lib/gemini-client.mjs`.

## Other improvements to recommendation quality

| Improvement | Effect |
|---|---|
| **Top 3 with reasons** | A miss on pick #1 is often rescued by #2 or #3: top-3 is 100% for both finalists |
| **Real font names in the prompt** | Gemini's reasons name the font you actually get ("Urbanist fits…"), not editorial labels like "PP Neue Montreal" |
| **Brand-name extraction** | The preview shows *your* name. Gemini extracts it; a regex fallback works offline |
| **Language awareness** | Brief scripts are detected and each profile is marked with glyph coverage from Google Fonts metadata. Gemini is told to prefer fonts that can render the brief, and the UI warns when they can't. |
| **On-demand body pairing** | Rule-based alternatives (contrast, readability, mood, coverage) rather than one fixed pair per profile |
| **Learning from use** | Alternates chosen by 3+ different visitors for the same brief get promoted |
| **Reliability** | Model chain, cooldowns, time budget; an honest "offline picks" label instead of silent fallback |

## Reproducing

```bash
npm run eval                                              # default chain's first model, all briefs
GEMINI_MODEL=gemini-3.5-flash-lite EVAL_KIND=paraphrase npm run eval
GEMINI_MODEL=gemini-3.1-flash-lite RECOMMEND_CANDIDATES=20 npm run eval
EVAL_RPM=60 npm run eval                                  # once billing is enabled
```

Reports land in `eval-results/` (gitignored) with per-brief picks, latency, token counts and errors.
