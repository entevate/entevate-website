import { defineField, defineType } from 'sanity'

export const ecosystemComponent = defineType({
  name: 'ecosystemComponent',
  title: 'Ecosystem Component',
  description: 'A "Beyond the Workshop" style card. Used on Angel Academy ecosystem grid and similar.',
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
      name: 'iconSvg',
      title: 'Icon SVG path(s)',
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
    select: { title: 'title' },
  },
})
