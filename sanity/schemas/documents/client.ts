import { defineField, defineType } from 'sanity'

export const client = defineType({
  name: 'client',
  title: 'Client',
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
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description: 'Client logo image. Prefer PNG or SVG with transparent background.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoAltText',
      title: 'Logo alt text',
      description: 'Accessible alt text for the logo.',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          'Heavy Equipment', 'Manufacturing', 'Aviation & Defense', 'Automotive',
          'Energy', 'Healthcare', 'Government', 'Higher Education',
          'Innovation District', 'Technology', 'Other',
        ],
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Show in homepage carousel?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Sort order in carousel',
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
    select: { title: 'name', media: 'logo', subtitle: 'industry' },
  },
})
