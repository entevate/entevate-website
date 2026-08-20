import { defineField, defineType } from 'sanity'

export const portableTextSection = defineType({
  name: 'portableTextSection',
  title: 'Rich Text Section',
  description: 'General-purpose long-form content section (Portable Text). Use for overviews, prose, and freeform copy blocks.',
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
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'richImage' },
        { type: 'quoteBlock' },
      ],
    }),
    defineField({
      name: 'backgroundVariant',
      title: 'Background variant',
      description: 'white | light-blue | dark. Controls section background.',
      type: 'string',
      options: { list: ['white', 'light-blue', 'dark'] },
      initialValue: 'white',
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return { title: title || 'Rich Text Section', subtitle }
    },
  },
})
