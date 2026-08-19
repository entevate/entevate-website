import { defineField, defineType } from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  // Singleton
  fields: [
    defineField({
      name: 'primaryLinks',
      title: 'Primary nav links',
      description: 'Top-level nav bar items. Order matters.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link (internal path or external URL)', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'external', title: 'External link?', type: 'boolean', initialValue: false },
            { name: 'hasDropdown', title: 'Has dropdown menu?', type: 'boolean', initialValue: false },
            {
              name: 'dropdownItems',
              title: 'Dropdown items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'href', type: 'string', title: 'Link' },
                    { name: 'pillar', type: 'reference', to: [{ type: 'pillar' }], title: 'Pillar (for color accent)' },
                  ],
                  preview: { select: { title: 'label', subtitle: 'href' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA button label',
      description: 'Rightmost button (e.g. "Get In Touch")',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA button link',
      type: 'string',
      initialValue: '/contact',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navigation' }),
  },
})
