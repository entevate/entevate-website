import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import { SINGLETON_TYPES } from './schemas'

/**
 * Custom Studio sidebar structure.
 *
 * - Site-wide singletons (Site Settings, Navigation, Footer) get pinned
 *   to the top and only allow a single document.
 * - Regular document types appear below in the default list.
 */
export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pinned singletons — one document each, no "Create new" button.
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Navigation')
        .id('navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),
      S.listItem()
        .title('Footer')
        .id('footer')
        .child(S.document().schemaType('footer').documentId('footer')),

      S.divider(),

      // Everything else, excluding the singletons above.
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETON_TYPES.includes(listItem.getId() as string),
      ),
    ])
