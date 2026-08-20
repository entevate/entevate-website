import { defineField, defineType } from 'sanity'

export const statsBand = defineType({
  name: 'statsBand',
  title: 'Stats Band',
  description: 'Grid of stats. Used on offering pages, e.g. "Proof of Speed" or "Traction" sections.',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      type: 'string',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [{ type: 'statBlock' }],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: { title: 'headline', count: 'stats.length' },
    prepare({ title, count }) {
      return {
        title: title || 'Stats Band',
        subtitle: `${count || 0} stats`,
      }
    },
  },
})
