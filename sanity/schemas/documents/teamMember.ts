import { defineField, defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
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
      name: 'role',
      title: 'Role / title',
      description: 'e.g. "Founder", "Managing Director, Innovation | Ventures | Ecosystem"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pillar',
      title: 'Primary pillar',
      description: 'Optional. Leaders (Founder, MDs) may not have a single pillar.',
      type: 'reference',
      to: [{ type: 'pillar' }],
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortBio',
      title: 'Short bio (2-3 sentences)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'longBio',
      title: 'Long bio (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'isLeadership',
      title: 'Show in leadership section?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Sort order on About page',
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
    select: { title: 'name', subtitle: 'role', media: 'headshot' },
  },
})
