import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

const builder = createImageUrlBuilder({
  projectId: projectId || 'placeholder',
  dataset,
})

/**
 * Build a Sanity image CDN URL from a document image reference.
 *
 * @example
 *   urlFor(post.heroImage).width(1200).height(630).fit('crop').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
