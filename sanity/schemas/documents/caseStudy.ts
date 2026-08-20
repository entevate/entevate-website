import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      description: 'Small label above the hero, e.g. "Case Study"',
      type: 'string',
      initialValue: 'Case Study',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'client' }],
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'reference',
      to: [{ type: 'pillar' }],
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          'Heavy Equipment', 'Manufacturing', 'Aviation & Defense', 'Automotive',
          'Energy', 'Healthcare', 'Government', 'Higher Education',
          'Innovation District', 'Technology', 'Other',
        ],
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'richImage',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'One-paragraph summary shown on /our-work grid card.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'approach',
      title: 'Approach',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      description: 'Bulleted outcome pills shown on the case card and detail page.',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'quoteBlock',
    }),
    defineField({
      name: 'relatedOffering',
      title: 'Related Offering',
      type: 'reference',
      to: [{ type: 'offering' }],
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature on Our Work homepage?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title', client: 'client.name', media: 'heroImage' },
    prepare({ title, client, media }) {
      return {
        title,
        subtitle: client ? `Client: ${client}` : 'No client set',
        media,
      }
    },
  },
})
