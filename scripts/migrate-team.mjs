import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { writeClient } from './lib/sanityWriteClient.mjs'

/**
 * Migrate the 7 team member cards from /src/pages/about.astro into Sanity
 * `teamMember` documents. Uploads each headshot (currently in /public/images/)
 * to Sanity Content Lake so the photo lives with the person, not on disk.
 *
 * Idempotent: keyed by _id derived from slug so re-runs update in place.
 *
 * Run: node scripts/migrate-team.mjs
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const IMAGES_DIR = path.resolve(__dirname, '..', 'public', 'images')

// Extracted from src/pages/about.astro (see about.astro:159-345).
// LinkedIn URLs are placeholders on the current site (href="#"); leave empty
// so editors can fill them in through Studio.
const TEAM = [
  {
    slug: 'jake-hamann',
    name: 'Jake Hamann',
    role: 'Founder & CEO',
    image: 'jake.png',
    order: 10,
    isLeadership: true,
    pillar: null,
  },
  {
    slug: 'harsh-shah',
    name: 'Harsh Shah',
    role: 'Co-Founder & COO',
    image: 'harsh.jpg',
    order: 20,
    isLeadership: true,
    pillar: null,
  },
  {
    slug: 'michael-binko',
    name: 'Michael Binko',
    role: 'Managing Director, Innovation | Ventures | Ecosystem',
    image: 'binko.jpg',
    order: 30,
    isLeadership: true,
    pillar: 'pillar-innovation',
  },
  {
    slug: 'grant-lonie',
    name: 'Grant Lonie',
    role: 'Director of Engineering',
    image: 'grant.jpg',
    order: 40,
    isLeadership: false,
    pillar: null,
  },
  {
    slug: 'hanah-zachariah',
    name: 'Hanah Zachariah',
    role: 'XR Developer',
    image: 'hanah.jpg',
    order: 50,
    isLeadership: false,
    pillar: 'pillar-experiential',
  },
  {
    slug: 'sam-thibault',
    name: 'Sam Thibault',
    role: 'Designer',
    image: 'sam.jpeg',
    order: 60,
    isLeadership: false,
    pillar: null,
  },
  {
    slug: 'steven-shaffer',
    name: 'Steven Shaffer',
    role: 'Manufacturing SME',
    image: 'steven.jpeg',
    order: 70,
    isLeadership: false,
    pillar: 'pillar-operational-intelligence',
  },
]

async function uploadHeadshot(filename) {
  const filepath = path.join(IMAGES_DIR, filename)
  if (!fs.existsSync(filepath)) {
    console.warn(`    ! headshot not found: ${filepath}`)
    return null
  }
  const stream = fs.createReadStream(filepath)
  const asset = await writeClient.assets.upload('image', stream, {
    filename,
  })
  return asset._id
}

async function run() {
  console.log(`Migrating ${TEAM.length} team members…\n`)

  const results = []
  for (const person of TEAM) {
    console.log(`• ${person.name} (${person.slug})`)
    console.log(`  uploading ${person.image}…`)
    const assetId = await uploadHeadshot(person.image)
    if (assetId) console.log(`  ✓ asset ${assetId}`)

    const doc = {
      _id: `teamMember-${person.slug}`,
      _type: 'teamMember',
      name: person.name,
      slug: { _type: 'slug', current: person.slug },
      role: person.role,
      order: person.order,
      isLeadership: person.isLeadership,
      ...(assetId && {
        headshot: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
      }),
      ...(person.pillar && {
        pillar: { _type: 'reference', _ref: person.pillar },
      }),
    }

    results.push(doc)
  }

  console.log('\nCommitting to Sanity…')
  const tx = writeClient.transaction()
  results.forEach((d) => tx.createOrReplace(d))
  const result = await tx.commit()
  console.log(`✓ Migrated ${result.results.length} team members.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
