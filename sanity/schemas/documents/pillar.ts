import { defineField, defineType } from 'sanity'

export const pillar = defineType({
  name: 'pillar',
  title: 'Pillar',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL path)',
      description: 'e.g. "experiential", "operational-intelligence", "innovation"',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      description: 'Short em-tag shown on homepage service card.',
      type: 'string',
    }),
    defineField({
      name: 'homepageCardDescription',
      title: 'Homepage card description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary color (hex)',
      description: 'e.g. #2bbfa8 (teal), #e8782a (orange), #6a6b9e (purple)',
      type: 'string',
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent color (hex)',
      description: 'Secondary color used in gradients, e.g. #6dd4a0, #f5b731, #8e90c0',
      type: 'string',
    }),
    defineField({
      name: 'iconSvg',
      title: 'Icon SVG path(s)',
      description: 'Raw SVG path data for the pillar\'s icon (24x24 viewBox).',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'backgroundTexture',
      title: 'Background texture',
      description: 'e.g. "bt1", "bt2", "bt3" (references files in /public/images/)',
      type: 'string',
      options: { list: ['bt1', 'bt2', 'bt3'] },
    }),
    defineField({
      name: 'ogImage',
      title: 'OG image',
      description: 'Path to pre-generated OG image, e.g. /images/og/ebm-og.png',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      initialValue: 100,
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
    select: { title: 'name', subtitle: 'tagline' },
  },
})
