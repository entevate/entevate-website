import { defineField, defineType } from 'sanity'

export const cardGrid = defineType({
  name: 'cardGrid',
  title: 'Card Grid',
  description: 'Reusable grid of cards. Choose the card type when adding cards.',
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
      name: 'columns',
      title: 'Columns (desktop)',
      description: 'How many columns to render on desktop.',
      type: 'number',
      options: {
        list: [
          { title: '2 columns', value: 2 },
          { title: '3 columns', value: 3 },
          { title: '4 columns', value: 4 },
          { title: '5 columns', value: 5 },
        ],
      },
      initialValue: 4,
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        { type: 'personaCard' },
        { type: 'ecosystemComponent' },
      ],
    }),
  ],
  preview: {
    select: { title: 'headline', count: 'cards.length' },
    prepare({ title, count }) {
      return {
        title: title || 'Card Grid',
        subtitle: `${count || 0} cards`,
      }
    },
  },
})
