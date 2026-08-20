import { defineField, defineType } from 'sanity'

export const personaCard = defineType({
  name: 'personaCard',
  title: 'Persona Card',
  description: 'A "Who It\'s For" style card. Used on Angel Academy and similar.',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(320),
    }),
    defineField({
      name: 'iconVariant',
      title: 'Icon color variant',
      description: 'CSS class controlling icon tint (fci-red, fci-green, fci-blue, fci-purple, fci-gold).',
      type: 'string',
      options: {
        list: ['fci-red', 'fci-green', 'fci-blue', 'fci-purple', 'fci-gold'],
      },
    }),
    defineField({
      name: 'iconSvg',
      title: 'Icon SVG path(s)',
      description: 'Raw SVG path data for the 24x24 icon.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'iconVariant' },
  },
})
