import { writeClient } from './lib/sanityWriteClient.mjs'

/**
 * Seed the three global singleton documents:
 *   - siteSettings: org info, JSON-LD schema fields, address, social handles
 *   - navigation:   top nav items with pillar dropdowns + CTA button
 *   - footer:       columns, links, newsletter copy, legal
 *
 * Values mirror what BaseLayout.astro / Header.jsx / Footer.tsx currently
 * hardcode. After seeding, we can rewire those files to read from Sanity.
 *
 * Idempotent: uses fixed _id per singleton so re-runs update in place.
 *
 * Run: node scripts/seed-site-settings.mjs
 */

const SITE_SETTINGS = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  orgName: 'ENTEVATE',
  tagline: 'Human-centered innovation partner',
  founder: 'Jake Hamann',
  foundingDate: '2016',
  addressStreet: '5 Cowboys Way, Ste 300',
  addressCity: 'Frisco',
  addressRegion: 'Texas',
  addressPostal: '75034',
  addressCountry: 'US',
  contactEmail: 'hello@entevate.com',
  contactPhone: '(972) 200-3445',
  defaultOgImage: '/images/og/main-og.png',
  social: {
    linkedin: 'https://www.linkedin.com/company/entevate',
    twitter: 'https://twitter.com/entevate',
    facebook: 'https://www.facebook.com/entevate',
  },
  knowsAbout: [
    'Experiential Branding',
    'Digital Transformation',
    'Operational Intelligence',
    'Innovation Roadmapping',
    'AR/VR/Spatial Computing',
    'Innovation Ecosystems',
    'Trade Show Activations',
    'CAD to CGI Conversion',
    'Angel Investing Education',
    'Startup Ecosystem Development',
    'AIQUI Framework',
    'AI and Quantum Innovation',
  ],
  brandBoilerplate:
    'ENTEVATE is a human-centered innovation partner for organizations ready to evolve. We design immersive brand experiences, align digital content, and build actionable roadmaps for lasting impact.',
}

const NAVIGATION = {
  _id: 'navigation',
  _type: 'navigation',
  primaryLinks: [
    {
      _key: 'nav-services',
      label: 'Services',
      href: '#',
      external: false,
      hasDropdown: true,
      dropdownItems: [
        {
          _key: 'drop-ebm',
          label: 'Experiential Branding & Marketing',
          href: '/experiential',
          pillar: { _type: 'reference', _ref: 'pillar-experiential' },
        },
        {
          _key: 'drop-oi',
          label: 'Operational Intelligence',
          href: '/operational-intelligence',
          pillar: {
            _type: 'reference',
            _ref: 'pillar-operational-intelligence',
          },
        },
        {
          _key: 'drop-ive',
          label: 'Innovation | Ventures | Ecosystem',
          href: '/innovation',
          pillar: { _type: 'reference', _ref: 'pillar-innovation' },
        },
      ],
    },
    {
      _key: 'nav-about',
      label: 'About Us',
      href: '/about',
      external: false,
      hasDropdown: false,
    },
    {
      _key: 'nav-work',
      label: 'Our Work',
      href: '/our-work',
      external: false,
      hasDropdown: false,
    },
    {
      _key: 'nav-momentify',
      label: 'Momentify ↗',
      href: 'https://www.momentifyapp.com/',
      external: true,
      hasDropdown: false,
    },
  ],
  ctaLabel: 'Get In Touch',
  ctaHref: '/contact',
}

const FOOTER = {
  _id: 'footer',
  _type: 'footer',
  columns: [
    {
      _key: 'col-services',
      heading: 'Services',
      links: [
        { _key: 'l1', label: 'Experiential Branding & Marketing', href: '/experiential', external: false },
        { _key: 'l2', label: 'Operational Intelligence', href: '/operational-intelligence', external: false },
        { _key: 'l3', label: 'Innovation | Ventures | Ecosystem', href: '/innovation', external: false },
        { _key: 'l4', label: 'Momentify ↗', href: 'https://www.momentifyapp.com/', external: true },
      ],
    },
    {
      _key: 'col-company',
      heading: 'Company',
      links: [
        { _key: 'l5', label: 'About Us', href: '/about', external: false },
        { _key: 'l6', label: 'Our Work', href: '/our-work', external: false },
        { _key: 'l7', label: 'Get In Touch', href: '/contact', external: false },
        {
          _key: 'l8',
          label: 'Privacy Policy',
          href:
            'https://app.termly.io/policy-viewer/policy.html?policyUUID=b5c58f21-00f2-4ee2-9391-79a13199d76c',
          external: true,
        },
      ],
    },
  ],
  newsletterHeading: 'Get Updates',
  newsletterDescription:
    'Innovation insights and perspectives, straight to your inbox.',
  newsletterButtonLabel: 'Subscribe',
  bottomBarCopy: '© ENTEVATE. All rights reserved.',
  legalLinks: [
    {
      _key: 'legal-privacy',
      label: 'Privacy Policy',
      href:
        'https://app.termly.io/policy-viewer/policy.html?policyUUID=b5c58f21-00f2-4ee2-9391-79a13199d76c',
    },
  ],
}

async function run() {
  console.log('Seeding site-wide singletons…\n')
  const tx = writeClient.transaction()
  tx.createOrReplace(SITE_SETTINGS)
  tx.createOrReplace(NAVIGATION)
  tx.createOrReplace(FOOTER)
  const result = await tx.commit()
  console.log(`✓ ${result.results.length} singleton mutations committed.`)
  console.log('  · siteSettings')
  console.log('  · navigation')
  console.log('  · footer')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
