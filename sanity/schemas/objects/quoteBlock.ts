import { defineField, defineType } from 'sanity'

export const quoteBlock = defineType({
  name: 'quoteBlock',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      description: 'Who said it, e.g. "Jane Smith, VP of Marketing at Acme"',
      type: 'string',
    }),
    defineField({
      name: 'attributionRole',
      title: 'Attribution role (secondary line)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'quote', subtitle: 'attribution' },
    prepare({ title, subtitle }) {
      return {
        title: title ? `"${title.slice(0, 80)}..."` : 'Quote',
        subtitle,
      }
    },
  },
})
