import { writeClient } from './lib/sanityWriteClient.mjs'

/**
 * Seed the 12 offering documents across all 3 pillars. Mirrors the current
 * hardcoded content on each pillar's landing page offering grid.
 *
 * After seeding, the pillar landing pages can loop over Sanity data
 * instead of hardcoding cards. Editors add/remove/reorder offerings from
 * Studio.
 *
 * Idempotent: keyed by _id per slug.
 *
 * Run: node scripts/seed-offerings.mjs
 */

const OFFERINGS = [
  // ─── Experiential (4) — all link to /contact?service=experiential ───
  {
    slug: 'live-events',
    title: 'Live Events & Brand Activations Strategy',
    pillar: 'pillar-experiential',
    cardSubtitle: 'Where your brand becomes an experience.',
    cardDescription:
      'From trade show booths to full-scale corporate events, we design and produce immersive, on-brand experiences that create lasting impressions and meaningful connections. Every activation is rooted in strategy, executed with precision, and measured for real impact.',
    cardCtaLabel: 'Activate Your Brand →',
    cardCtaHref: '/contact?service=experiential',
    iconSvg:
      'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    colorVariant: 'oc-teal',
    order: 10,
  },
  {
    slug: 'ar-vr-spatial',
    title: 'AR, VR & Spatial Computing Experiences',
    pillar: 'pillar-experiential',
    cardSubtitle: 'Redefining what brand engagement can be.',
    cardDescription:
      'We design and build augmented reality, virtual reality, and spatial computing experiences that place your audience inside your story, powered by cutting-edge technology and grounded in measurable outcomes.',
    cardCtaLabel: 'Explore Immersive Tech →',
    cardCtaHref: '/contact?service=experiential',
    iconSvg: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z',
    colorVariant: 'oc-teal-mid',
    order: 20,
  },
  {
    slug: 'content-production',
    title: 'Content Production & Brand Storytelling',
    pillar: 'pillar-experiential',
    cardSubtitle: 'Stories that earn attention and drive action.',
    cardDescription:
      'From concept to final cut, we produce video, photography, and multimedia content that brings your brand narrative to life. Our storytelling framework ensures every piece of content serves a strategic purpose across every channel.',
    cardCtaLabel: 'Tell Your Story →',
    cardCtaHref: '/contact?service=experiential',
    iconSvg: 'M3 9h18M9 21V9',
    colorVariant: 'oc-blue',
    order: 30,
  },
  {
    slug: 'trade-show-design',
    title: 'Trade Show & Exhibition Experience Design',
    pillar: 'pillar-experiential',
    cardSubtitle: 'Stand out on the floor that matters most.',
    cardDescription:
      'We design trade show exhibits and exhibition environments that attract, engage, and convert. From concept and floorplan to fabrication management and on-site execution, we deliver complete booth experiences that drive results.',
    cardCtaLabel: 'Design Your Exhibit →',
    cardCtaHref: '/contact?service=experiential',
    iconSvg: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5M2 12l10 5 10-5',
    colorVariant: 'oc-green',
    order: 40,
  },

  // ─── Operational Intelligence (4) — pages exist ───
  {
    slug: 'assessment',
    title: 'Operational Intelligence Assessment',
    pillar: 'pillar-operational-intelligence',
    cardSubtitle: 'The diagnostic that starts every engagement.',
    cardDescription:
      'Our proprietary assessment evaluates your organization across People, Platform, and Process to surface operational gaps, score your readiness, and deliver a prioritized action plan covering AI, automation, content systems, and cross-functional alignment.',
    cardCtaLabel: 'Take the Assessment →',
    iconSvg:
      'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    colorVariant: 'oc-indigo',
    order: 10,
  },
  {
    slug: 'ai-foundry',
    title: 'AI Foundry',
    trademarkSuffix: '™',
    pillar: 'pillar-operational-intelligence',
    cardSubtitle: 'Concept to production.',
    cardDescription:
      'Custom AI systems, from content pipelines and brand automation to full-stack applications. We design, build, and manage production-grade intelligent systems that integrate with your people and processes from day one.',
    cardCtaLabel: 'Explore the Foundry →',
    iconSvg: 'M12 2L2 7v10l10 5 10-5V7L12 2z M12 22V12M12 12L2 7M12 12l10-5',
    colorVariant: 'oc-purple',
    order: 20,
  },
  {
    slug: 'digital-strategy',
    title: 'Digital Transformation Strategy & Execution',
    pillar: 'pillar-operational-intelligence',
    cardSubtitle: 'Align people, platforms, and processes.',
    cardDescription:
      'We design and co-execute digital transformation strategies that are human-centered, change-managed, and tied to real business outcomes across learning, process, tools, and governance.',
    cardCtaLabel: 'Build Your Strategy →',
    iconSvg: 'M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5M2 12l10 5 10-5',
    colorVariant: 'oc-violet',
    order: 30,
  },
  {
    slug: 'cad-to-cgi',
    title: 'CAD-to-CGI Conversion & Visualization',
    pillar: 'pillar-operational-intelligence',
    cardSubtitle: 'Engineering visualization, elevated.',
    cardDescription:
      'We transform technical CAD data into photorealistic CGI assets for marketing, sales, training, and product storytelling. Our pipeline gives engineering teams the visual language to sell and inspire without waiting for physical prototypes.',
    cardCtaLabel: 'See the Difference →',
    iconSvg:
      'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z M14 2v6h6M16 13H8M16 17H8M10 9H8',
    colorVariant: 'oc-slate',
    order: 40,
  },

  // ─── Innovation | Ventures | Ecosystem (4) — pages exist ───
  {
    slug: 'ecosystem-model',
    title: 'Ecosystem Model: 7 Core Elements™',
    pillar: 'pillar-innovation',
    cardSubtitle: 'Map your full innovation ecosystem.',
    cardDescription:
      'We assess your ecosystem across seven interconnected basecamps, from research and economic impact to workforce development and community brand affinity. Every layer is evaluated, gap-analyzed, and roadmapped into a unified action plan.',
    cardCtaLabel: 'Explore the Ecosystem Model →',
    iconSvg:
      'M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z M12 2v10M3.34 7l8.66 5M20.66 7l-8.66 5',
    colorVariant: 'oc-green',
    order: 10,
  },
  {
    slug: 'innovation-sandbox',
    title: 'Innovation Sandbox™ Prototyping',
    pillar: 'pillar-innovation',
    cardSubtitle: 'Start small. Learn fast. Scale with confidence.',
    cardDescription:
      'A contained, low-risk environment to prototype and test your most promising ideas before full deployment. We design the sandbox, run facilitated sessions, and deliver a validated signal to prioritize market opportunities. Aligned with NSF I-Corps, DoC-EDA, and NIST frameworks.',
    cardCtaLabel: 'Run a Sandbox →',
    iconSvg:
      'M9 3h6M10 3v6L6 18h12L14 9V3 M6.5 15h11',
    colorVariant: 'oc-orange-light',
    order: 20,
  },
  {
    slug: 'roadmapping',
    title: 'Innovation Roadmapping™ + Venture Development',
    pillar: 'pillar-innovation',
    cardSubtitle: 'Opportunity meets execution.',
    cardDescription:
      "We build structured, milestone-driven innovation roadmaps aligned to your organization's goals and resources. ENTEVATE stays with you through venture development to bring those milestones to life and deliver scalable outcomes at every Waypoint.",
    cardCtaLabel: 'Build Your Roadmap →',
    iconSvg:
      'M3 5v14l5-3 8 3 5-3V2l-5 3-8-3-5 3z M8 2v14M16 5v14',
    colorVariant: 'oc-blue',
    order: 30,
  },
  {
    slug: 'angel-academy',
    title: 'Sideline Capital Activation & Funding',
    pillar: 'pillar-innovation',
    cardSubtitle: 'Angel Academy™ | Innovation Funding Lab®',
    cardDescription:
      'Connecting innovators with capital through curated investor syndicates, funding readiness roadmapping, and the Innovation Funding Lab®, a hands-on track for ventures preparing to raise their next round of investment.',
    cardCtaLabel: 'Activate Capital →',
    iconSvg:
      'M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6',
    colorVariant: 'oc-orange-dark',
    order: 40,
  },
]

async function run() {
  console.log(`Seeding ${OFFERINGS.length} offerings…\n`)

  const tx = writeClient.transaction()
  for (const o of OFFERINGS) {
    const doc = {
      _id: `offering-${o.slug}`,
      _type: 'offering',
      title: o.title,
      slug: { _type: 'slug', current: o.slug },
      pillar: { _type: 'reference', _ref: o.pillar },
      cardSubtitle: o.cardSubtitle,
      cardDescription: o.cardDescription,
      cardCtaLabel: o.cardCtaLabel,
      ...(o.cardCtaHref && { cardCtaHref: o.cardCtaHref }),
      ...(o.trademarkSuffix && { trademarkSuffix: o.trademarkSuffix }),
      iconSvg: o.iconSvg,
      colorVariant: o.colorVariant,
      order: o.order,
    }
    tx.createOrReplace(doc)
    console.log(
      `  · ${o.slug.padEnd(24)} | ${o.pillar.replace('pillar-', '').padEnd(28)} | ${o.colorVariant}`,
    )
  }

  console.log('\nCommitting to Sanity…')
  const result = await tx.commit()
  console.log(`✓ Seeded ${result.results.length} offerings.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
