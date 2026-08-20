import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as cheerio from 'cheerio'
import { writeClient } from './lib/sanityWriteClient.mjs'
import { htmlToPortableText } from './lib/htmlToPortableText.mjs'

/**
 * Migrate the 9 static /src/pages/insights/*.astro pages into Sanity `post`
 * documents. Idempotent: uses createOrReplace keyed by _id derived from the
 * slug so re-runs update in place.
 *
 * Run: node scripts/migrate-insights.mjs
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const INSIGHTS_DIR = path.resolve(__dirname, '..', 'src', 'pages', 'insights')

/** Pick pillar reference by scanning the eyebrow/tags. Fallback to OI. */
function inferPillar(categoryText, headline, bodyHtml) {
  const haystack = `${categoryText} ${headline} ${bodyHtml.slice(0, 4000)}`.toLowerCase()
  if (
    /\bar\/vr\b|spatial computing|trade show|experiential|immersive|brand experience/.test(haystack)
  ) {
    return 'pillar-experiential'
  }
  if (/innovation road|ideation|ventures|ecosystem|angel|aiqui|sandbox/.test(haystack)) {
    return 'pillar-innovation'
  }
  return 'pillar-operational-intelligence'
}

/** Extract the frontmatter block (JS between the two --- fences). */
function extractFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  return match ? match[1] : ''
}

/** Very lightweight JS-literal extractor for `const NAME = "value" | `value` | 'value'`. */
function pickConstString(js, name) {
  const re = new RegExp(`const\\s+${name}\\s*=\\s*([\`'"])([\\s\\S]*?)\\1`, 'm')
  const m = js.match(re)
  return m ? m[2].trim() : null
}

/** Parse the JSON-LD literal in frontmatter and return the parsed array. */
function extractJsonLd(js) {
  const m = js.match(/const\s+jsonLd\s*=\s*JSON\.stringify\(\s*(\[[\s\S]*?\])\s*\)\s*;?/m)
  if (!m) return null
  // The literal is JS (single quotes possible, trailing commas). Try eval as a
  // last resort behind a Function wrapper to avoid pulling in a full parser.
  try {
    // eslint-disable-next-line no-new-func
    return Function(`return ${m[1]}`)()
  } catch {
    return null
  }
}

function slugFromFilename(filename) {
  return path.basename(filename, '.astro')
}

/** Parse a US-format date string like "April 30, 2025" to ISO. */
function parseDate(str) {
  if (!str) return null
  const d = new Date(str)
  if (isNaN(d.getTime())) return null
  return d.toISOString()
}

async function migrateOne(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const slug = slugFromFilename(filePath)

  const fm = extractFrontmatter(source)
  const rawTitle = pickConstString(fm, 'title') || ''
  const description = pickConstString(fm, 'description') || ''

  // Prefer the JSON-LD headline (canonical, no " — ENTEVATE" tail).
  const jsonLd = extractJsonLd(fm)
  const article = Array.isArray(jsonLd) ? jsonLd.find((n) => n['@type'] === 'Article') : null
  const cleanTitle = article?.headline || rawTitle.replace(/\s*[—-]\s*ENTEVATE\s*$/, '')

  // Grab the HTML body — everything after the closing frontmatter.
  const bodyMatch = source.match(/^---[\s\S]*?\n---\s*\n([\s\S]*)$/)
  const bodyMarkup = bodyMatch ? bodyMatch[1] : ''

  const $ = cheerio.load(bodyMarkup)

  // Category/eyebrow: first text inside .hero-eyebrow.fade-up (skip the dot span).
  let category = ''
  const eyebrow = $('.hero-eyebrow.fade-up').first()
  if (eyebrow.length) {
    // Text after the .hero-eyebrow-dot span:
    category = eyebrow.text().replace(/\s+/g, ' ').trim()
  }

  // Publish date: first .hero-meta .hero-meta-item that reads like a date.
  let publishDate = null
  const heroMetaText = $('.hero-meta').text().replace(/\s+/g, ' ').trim()
  const dateMatch =
    heroMetaText.match(
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s*\d{4}\b/i,
    ) || heroMetaText.match(/\b\d{4}\b/)
  if (dateMatch) {
    publishDate = parseDate(dateMatch[0]) || `${dateMatch[0]}-01-01T00:00:00Z`
  }

  // Article body content — parse only <article class="article-body"> children.
  const article$ = $('article.article-body').first()
  const articleHtml = article$.length ? article$.html() : ''
  const body = htmlToPortableText(articleHtml || '')

  const pillarId = inferPillar(category, cleanTitle, articleHtml)

  const doc = {
    _id: `post-${slug}`,
    _type: 'post',
    title: cleanTitle,
    slug: { _type: 'slug', current: slug },
    excerpt: description,
    publishDate: publishDate || new Date('2024-01-01').toISOString(),
    tags: category ? [category] : [],
    pillar: { _type: 'reference', _ref: pillarId },
    body,
    seoTitle: rawTitle,
    seoDescription: description,
  }

  return { doc, meta: { slug, cleanTitle, category, publishDate, blockCount: body.length } }
}

async function run() {
  const files = fs
    .readdirSync(INSIGHTS_DIR)
    .filter((f) => f.endsWith('.astro'))
    .map((f) => path.join(INSIGHTS_DIR, f))
    .sort()

  console.log(`Found ${files.length} insight files.`)

  const tx = writeClient.transaction()
  const summaries = []
  for (const f of files) {
    const { doc, meta } = await migrateOne(f)
    tx.createOrReplace(doc)
    summaries.push(meta)
    console.log(
      `  · ${meta.slug.padEnd(38)} | ${meta.category.padEnd(20)} | ${meta.publishDate?.slice(0, 10) || '???'} | ${String(meta.blockCount).padStart(3)} blocks`,
    )
  }

  console.log('\nCommitting to Sanity…')
  const result = await tx.commit()
  console.log(`✓ Migrated ${result.results.length} posts.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
