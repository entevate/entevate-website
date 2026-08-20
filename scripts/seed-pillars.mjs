import { writeClient } from './lib/sanityWriteClient.mjs'

/**
 * Seed the three ENTEVATE pillar documents.
 *
 * Uses fixed _id values so re-running is idempotent (createOrReplace).
 *
 * Run: node scripts/seed-pillars.mjs
 */

const PILLARS = [
  {
    _id: 'pillar-experiential',
    _type: 'pillar',
    name: 'Experiential Branding & Marketing',
    slug: { _type: 'slug', current: 'experiential' },
    tagline:
      'Crafting immersive brand experiences that resonate, engage audiences, and drive measurable action.',
    homepageCardDescription:
      'We spark connection through intentional, emotionally engaging brand moments that are measurable, memorable, and built to scale.',
    primaryColor: '#2bbfa8',
    accentColor: '#6dd4a0',
    iconSvg:
      'M12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
    backgroundTexture: 'bt1',
    ogImage: '/images/og/ebm-og.png',
    order: 10,
  },
  {
    _id: 'pillar-operational-intelligence',
    _type: 'pillar',
    name: 'Operational Intelligence',
    slug: { _type: 'slug', current: 'operational-intelligence' },
    tagline:
      'Content Readiness™ for a more connected, adaptable, and future-ready business.',
    homepageCardDescription:
      'We align people, platforms, and processes so your content is always clear, strategic, and ready to perform.',
    primaryColor: '#e8782a',
    accentColor: '#f5b731',
    iconSvg: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
    backgroundTexture: 'bt2',
    ogImage: '/images/og/oi-og.png',
    order: 20,
  },
  {
    _id: 'pillar-innovation',
    _type: 'pillar',
    name: 'Innovation | Ventures | Ecosystem',
    slug: { _type: 'slug', current: 'innovation' },
    tagline:
      'Clarity for bold ideas and the structured systems to bring them to life at scale.',
    homepageCardDescription:
      'We turn big ideas into tangible strategies, from concept to execution, aligning vision with action and clarity.',
    primaryColor: '#6a6b9e',
    accentColor: '#8e90c0',
    iconSvg:
      'M9 18h6M10 22h4M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17H8v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z',
    backgroundTexture: 'bt3',
    ogImage: '/images/og/irm-og.png',
    order: 30,
  },
]

async function run() {
  console.log(`Seeding ${PILLARS.length} pillars…`)
  const tx = writeClient.transaction()
  for (const doc of PILLARS) {
    tx.createOrReplace(doc)
    console.log(`  · ${doc._id}  ${doc.name}`)
  }
  const result = await tx.commit()
  console.log(`✓ Committed ${result.results.length} pillar mutations.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
