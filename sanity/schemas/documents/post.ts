import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Insight Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'Short summary shown on the /insights index and in meta description.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'pillar',
      title: 'Pillar',
      type: 'reference',
      to: [{ type: 'pillar' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'richImage',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'richImage' },
        { type: 'quoteBlock' },
        { type: 'ctaBand' },
      ],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (override)',
      description: 'Optional. Defaults to Title.',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (override)',
      description: 'Optional. Defaults to Excerpt.',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: 'Publish date, newest',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'heroImage', date: 'publishDate' },
    prepare({ title, media, date }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'Draft',
        media,
      }
    },
  },
})
