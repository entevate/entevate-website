import { defineField, defineType } from 'sanity'

export const offering = defineType({
  name: 'offering',
  title: 'Offering',
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
      name: 'pillar',
      title: 'Pillar',
      type: 'reference',
      to: [{ type: 'pillar' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'trademarkSuffix',
      title: 'Trademark suffix',
      description: 'Optional ™ or ® suffix appended to display name. Leave blank for none.',
      type: 'string',
      options: { list: ['', '™', '®'] },
      initialValue: '',
    }),
    defineField({
      name: 'shortName',
      title: 'Short name',
      description: 'Used in nav, breadcrumbs, and card grids. Defaults to Title.',
      type: 'string',
    }),
    defineField({
      name: 'cardSubtitle',
      title: 'Card subtitle (em tag)',
      description: 'Italic subtitle shown on offering cards.',
      type: 'string',
    }),
    defineField({
      name: 'cardDescription',
      title: 'Card description',
      description: 'Body copy shown on pillar-landing offering cards.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: 'cardCtaLabel',
      title: 'Card CTA label',
      type: 'string',
      initialValue: 'Learn More →',
    }),
    defineField({
      name: 'iconSvg',
      title: 'Card icon SVG path(s)',
      description: 'Raw SVG path data for the 24x24 icon (e.g. "M12 2L2 7l10 5..."). See existing offering cards for style.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'colorVariant',
      title: 'Color variant',
      description: 'CSS variant on the pillar landing card (oc-purple, oc-indigo, oc-violet, oc-slate, oc-lavender).',
      type: 'string',
      options: {
        list: ['oc-purple', 'oc-indigo', 'oc-violet', 'oc-slate', 'oc-lavender'],
      },
    }),
    defineField({
      name: 'order',
      title: 'Sort order on pillar landing',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'onePagerPdf',
      title: 'One-pager PDF',
      description: 'Downloadable one-pager attached to this offering.',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      description: 'The H1. Use \\n for line break.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroAccentText',
      title: 'Hero accent text',
      description: 'Portion of headline rendered with gradient accent span.',
      type: 'string',
    }),
    defineField({
      name: 'heroSubhead',
      title: 'Hero subhead',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero primary CTA',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero secondary CTA',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Page sections',
      description: 'Reshufflable body content. Order determines page render order.',
      type: 'array',
      of: [
        { type: 'statsBand' },
        { type: 'cardGrid' },
        { type: 'ctaBand' },
        { type: 'quoteBlock' },
        { type: 'portableTextSection' },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (override)',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (override)',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Sort order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', pillar: 'pillar.name' },
    prepare({ title, pillar }) {
      return {
        title,
        subtitle: pillar ? `Pillar: ${pillar}` : 'No pillar set',
      }
    },
  },
})
