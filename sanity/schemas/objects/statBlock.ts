import { defineField, defineType } from 'sanity'

export const statBlock = defineType({
  name: 'statBlock',
  title: 'Stat',
  description: 'A single traction stat, e.g. "$24M+ / Total capital invested."',
  type: 'object',
  fields: [
    defineField({
      name: 'number',
      title: 'Number / headline value',
      description: 'The big display value, e.g. "$24M+", "400+", "7"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      description: 'Description shown under the number.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'accent',
      title: 'Accent word (optional)',
      description: 'Small label above stat, e.g. "The Reality", "Our Approach", "The Outcome"',
      type: 'string',
    }),
    defineField({
      name: 'iconVariant',
      title: 'Icon color variant',
      description: 'osi-red, osi-green, osi-blue, osi-purple, osi-gold',
      type: 'string',
      options: {
        list: ['osi-red', 'osi-green', 'osi-blue', 'osi-purple', 'osi-gold'],
      },
    }),
    defineField({
      name: 'iconSvg',
      title: 'Icon SVG path(s)',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: { title: 'number', subtitle: 'label' },
  },
})
