import { writeClient } from './lib/sanityWriteClient.mjs'

/**
 * Migrate case studies into Sanity.
 *
 * Two of the three current case study pages (Fortune 500 Trade Show,
 * Energy Innovation Lab) are "In Progress" placeholders. Trinity College
 * AIQUI Sandbox is fully written. All three are seeded so the CMS has the
 * data structure ready.
 *
 * Trinity's rich body (custom process steps, quotes, multiple sections)
 * is not programmatically extracted here; editors can populate it via
 * Studio. Metadata + summary + outcomes ARE migrated.
 *
 * Idempotent: keyed by _id derived from slug.
 *
 * Run: node scripts/migrate-case-studies.mjs
 */

const CASE_STUDIES = [
  {
    slug: 'trinity-aiqui-sandbox',
    title: 'Trinity College AIQUI Sandbox',
    eyebrow: 'Case Study',
    industry: 'Higher Education',
    pillar: 'pillar-innovation',
    summary:
      'ENTEVATE partnered with Trinity College\'s Entrepreneurship Center to launch an AI innovation sandbox that connects students, faculty, and real-world clients through the AIQUI framework and 7 Core Elements Basecamps.',
    challengeText:
      'The gap between academic AI training and industry-ready AI capability is wide and widening. Most computer science graduates understand the theory of machine learning but have rarely applied those skills to a messy, real-world problem with a real client. At the same time, companies from healthcare to municipal government are sitting on high-value AI opportunities they lack the bandwidth to explore. Trinity\'s Entrepreneurship Center saw both sides clearly: how to solve them simultaneously, academically rigorous and genuinely impactful.',
    approachText:
      'ENTEVATE served as ecosystem architect, bringing the AIQUI framework to Trinity as the structural backbone. The 7 Core Elements Basecamps identify gaps, align stakeholders, and create pathways from exploration through applied deployment. Rather than a traditional capstone, the program is a multi-stakeholder innovation sandbox: students, faculty, industry advisors, rapid-development teams, and end clients operate within defined roles and shared accountability. Program stages: Ecosystem Mapping, Fall 2025 PMI foundation training, Spring 2026 live client work in scrum teams.',
    outcomes: [
      'Inaugural fellow cohort with PMI foundation training',
      'Live-client AI engagements with municipal and healthcare partners',
      'Multi-stakeholder governance model established',
      '7 Core Elements Basecamps as the operating framework',
    ],
    pullQuote: {
      quote:
        'The sandbox model gives students the skills employers actually want but are not typically taught in college.',
      attribution: 'Danny Briere',
      attributionRole:
        'Ruane Family Executive Director, Trinity Entrepreneurship Center',
    },
    publishDate: '2026-06-01T00:00:00Z',
    isFeatured: true,
  },
  {
    slug: 'fortune-500-trade-show',
    title: 'Fortune 500 Trade Show Activation',
    eyebrow: 'Case Study',
    industry: 'Technology',
    pillar: 'pillar-experiential',
    summary:
      'How ENTEVATE helped a Fortune 500 brand transform a multi-zone trade show exhibit using immersive AR to dramatically increase attendee engagement.',
    challengeText: '',
    approachText: '',
    outcomes: ['Multi-zone exhibit design', 'AR-powered engagement zones'],
    pullQuote: null,
    publishDate: '2025-04-30T00:00:00Z',
    isFeatured: false,
  },
  {
    slug: 'energy-innovation-lab',
    title: 'Energy Innovation Lab',
    eyebrow: 'Case Study',
    industry: 'Energy',
    pillar: 'pillar-innovation',
    summary:
      'ENTEVATE partnered with an energy sector client to build an internal innovation lab, from roadmap design through live experimentation and venture development.',
    challengeText: '',
    approachText: '',
    outcomes: [
      'Innovation Lab designed',
      '8-Stage Roadmap built',
      'Capital Pipeline activated',
      'Cross-Functional Engagement',
    ],
    pullQuote: null,
    publishDate: '2025-04-30T00:00:00Z',
    isFeatured: false,
  },
]

function textBlock(text) {
  const crypto_key = () => Math.random().toString(36).slice(2, 14)
  return [
    {
      _type: 'block',
      _key: crypto_key(),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: crypto_key(), text, marks: [] }],
    },
  ]
}

async function run() {
  console.log(`Seeding ${CASE_STUDIES.length} case studies…\n`)

  const tx = writeClient.transaction()
  for (const cs of CASE_STUDIES) {
    const doc = {
      _id: `caseStudy-${cs.slug}`,
      _type: 'caseStudy',
      title: cs.title,
      slug: { _type: 'slug', current: cs.slug },
      eyebrow: cs.eyebrow,
      industry: cs.industry,
      pillar: { _type: 'reference', _ref: cs.pillar },
      summary: cs.summary,
      challenge: cs.challengeText ? textBlock(cs.challengeText) : [],
      approach: cs.approachText ? textBlock(cs.approachText) : [],
      outcomes: cs.outcomes,
      pullQuote: cs.pullQuote
        ? {
            _type: 'quoteBlock',
            quote: cs.pullQuote.quote,
            attribution: cs.pullQuote.attribution,
            attributionRole: cs.pullQuote.attributionRole,
          }
        : undefined,
      publishDate: cs.publishDate,
      isFeatured: cs.isFeatured,
    }
    tx.createOrReplace(doc)
    console.log(
      `  · ${cs.slug.padEnd(28)} | ${cs.industry.padEnd(18)} | featured: ${cs.isFeatured}`,
    )
  }

  console.log('\nCommitting to Sanity…')
  const result = await tx.commit()
  console.log(`✓ Migrated ${result.results.length} case studies.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
