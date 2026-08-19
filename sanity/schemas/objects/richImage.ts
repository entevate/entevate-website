import { defineField, defineType } from 'sanity'

export const richImage = defineType({
  name: 'richImage',
  title: 'Rich Image',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      description: 'Required for accessibility.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect ratio',
      description: 'Optional override, e.g. "16/9", "4/3", "1/1"',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'alt', media: 'asset' },
    prepare({ title, media }) {
      return { title: title || 'Image', media }
    },
  },
})
