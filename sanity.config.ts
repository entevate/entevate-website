import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'

import { schemaTypes, SINGLETON_TYPES } from './sanity/schemas'
import { structure } from './sanity/structure'

/**
 * Sanity Studio configuration.
 *
 * Loaded in two contexts:
 *   1. Vite/Astro build for the embedded Studio (browser bundle).
 *   2. Sanity CLI (Node) for commands like `sanity deploy`, `sanity dev`.
 *
 * `process.env` is available in both; `import.meta.env` is Vite-only and
 * would throw here when the CLI loads this file, killing commands that
 * don't need a project (login, projects list, init).
 */

const envSource =
  (typeof process !== 'undefined' && process.env) ||
  (typeof (import.meta as any) !== 'undefined' && (import.meta as any).env) ||
  ({} as Record<string, string | undefined>)

const projectId = envSource.PUBLIC_SANITY_PROJECT_ID
const dataset = envSource.PUBLIC_SANITY_DATASET || 'production'
const siteUrl = envSource.PUBLIC_SITE_URL || 'http://localhost:4321'

if (!projectId) {
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
        origin: siteUrl,
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
