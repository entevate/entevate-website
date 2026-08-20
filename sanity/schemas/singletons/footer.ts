import { defineField, defineType } from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  // Singleton
  fields: [
    defineField({
      name: 'columns',
      title: 'Footer columns',
      description: 'Grouped link columns in the footer.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Column heading', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'Link', type: 'string' },
                    { name: 'external', title: 'External?', type: 'boolean', initialValue: false },
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    }),
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter heading',
      type: 'string',
      initialValue: 'Stay in the loop',
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'newsletterButtonLabel',
      title: 'Newsletter submit button label',
      type: 'string',
      initialValue: 'Subscribe',
    }),
    defineField({
      name: 'bottomBarCopy',
      title: 'Bottom bar copy',
      description: 'Copyright line, "© {year} ENTEVATE. All rights reserved."',
      type: 'string',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links (bottom bar)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Footer' }),
  },
})
