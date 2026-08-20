import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton: only one document should exist. Enforced in Studio structure builder.
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organization name',
      type: 'string',
      initialValue: 'ENTEVATE',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Human-centered innovation partner',
    }),
    defineField({
      name: 'founder',
      title: 'Founder',
      type: 'string',
      initialValue: 'Jake Hamann',
    }),
    defineField({
      name: 'foundingDate',
      title: 'Founding year',
      type: 'string',
      initialValue: '2016',
    }),
    defineField({
      name: 'addressStreet',
      title: 'Street address',
      type: 'string',
      initialValue: '5 Cowboys Way, Ste 300',
    }),
    defineField({
      name: 'addressCity',
      title: 'City',
      type: 'string',
      initialValue: 'Frisco',
    }),
    defineField({
      name: 'addressRegion',
      title: 'State / region',
      type: 'string',
      initialValue: 'Texas',
    }),
    defineField({
      name: 'addressPostal',
      title: 'Postal code',
      type: 'string',
      initialValue: '75034',
    }),
    defineField({
      name: 'addressCountry',
      title: 'Country',
      type: 'string',
      initialValue: 'US',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default OG image URL',
      description: 'Site-wide fallback for pages that don\'t supply their own.',
      type: 'string',
      initialValue: '/images/og/main-og.png',
    }),
    defineField({
      name: 'social',
      title: 'Social handles',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'X / Twitter URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'knowsAbout',
      title: 'Organization schema knowsAbout',
      description: 'List of topics/areas of expertise used in JSON-LD Organization.knowsAbout.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'brandBoilerplate',
      title: 'Brand boilerplate',
      description: 'Reusable "About ENTEVATE" paragraph for press, footers, etc.',
      type: 'text',
      rows: 5,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
})
