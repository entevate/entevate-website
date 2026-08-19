import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'

import { schemaTypes, SINGLETON_TYPES } from './sanity/schemas'
import { structure } from './sanity/structure'

/**
 * Sanity Studio configuration.
 *
 * Values read from Vite's public env (must be prefixed PUBLIC_ so they're
 * available in the client bundle where Studio runs).
 */

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  // Don't throw at import time in production; the Studio route will surface
  // a friendlier message. During dev, this warning helps.
  console.warn(
    '[sanity.config] PUBLIC_SANITY_PROJECT_ID is not set. Studio will fail to load until it is.',
  )
}

export default defineConfig({
  name: 'entevate',
  title: 'ENTEVATE Content',
  projectId: projectId || 'placeholder',
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ structure }),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4321',
        previewMode: {
          enable: '/api/preview',
          disable: '/api/exit-preview',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
    // Hide "Create new" affordance on singleton doc types.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.includes(schemaType)),
  },
  document: {
    // Block delete + duplicate on singleton documents.
    actions: (input, context) => {
      if (SINGLETON_TYPES.includes(context.schemaType)) {
        return input.filter(
          ({ action }) => action !== 'delete' && action !== 'duplicate' && action !== 'unpublish',
        )
      }
      return input
    },
  },
})
