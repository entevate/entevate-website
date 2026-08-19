import { defineField, defineType } from 'sanity'

export const ctaBand = defineType({
  name: 'ctaBand',
  title: 'CTA Band',
  description: 'Full-width dark call-to-action section.',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subhead',
      title: 'Subhead',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        { name: 'label', type: 'string', title: 'Label' },
        { name: 'href', type: 'string', title: 'Link' },
      ],
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background variant',
      description: 'Which background texture to use (bt1 = teal, bt2 = orange, bt3 = purple).',
      type: 'string',
      options: { list: ['bt1', 'bt2', 'bt3'] },
      initialValue: 'bt3',
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'subhead' },
    prepare({ title, subtitle }) {
      return { title: title || 'CTA Band', subtitle }
    },
  },
})
