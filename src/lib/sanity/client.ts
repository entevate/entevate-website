import { createClient, type SanityClient } from '@sanity/client'

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'
const token = import.meta.env.SANITY_API_TOKEN

if (!projectId) {
  console.warn(
    '[sanity/client] PUBLIC_SANITY_PROJECT_ID is not set. Queries will fail.',
  )
}

/**
 * Read-only client for published content. Used at build time by static
 * routes and at request time by preview-disabled pages.
 * Uses the CDN for speed.
 */
export const sanityClient: SanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2024-10-01',
  useCdn: true,
  perspective: 'published',
})

/**
 * Client with the API token attached. Bypasses the CDN so it always
 * returns the latest data including drafts. Used by the preview
 * endpoint and any server-side operations that need to read drafts
 * or write mutations (migration scripts).
 */
export const previewClient: SanityClient = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion: '2024-10-01',
  useCdn: false,
  perspective: 'previewDrafts',
  token: token || undefined,
})

/**
 * Helper: pick the right client based on Astro's draftMode.
 * Pass this Astro's `Astro.locals.preview` (set by the middleware).
 */
export function getClient(isPreview: boolean): SanityClient {
  return isPreview ? previewClient : sanityClient
}
