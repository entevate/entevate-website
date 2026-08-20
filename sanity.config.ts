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
 * IMPORTANT: Vite's build-time replacement of `import.meta.env.X` only
 * happens for LITERAL property accesses. Dynamic access (e.g. via a
 * `envSource[key]` abstraction) breaks that static analysis and ships
 * an empty string to the browser bundle. Read each var directly below.
 *
 * In the Node CLI context, `import.meta.env` is undefined; the try/catch
 * shields us there and we fall back to `process.env`.
 */

let viteProjectId: string | undefined
let viteDataset: string | undefined
let viteSiteUrl: string | undefined
try {
  viteProjectId = (import.meta as any).env?.PUBLIC_SANITY_PROJECT_ID
  viteDataset = (import.meta as any).env?.PUBLIC_SANITY_DATASET
  viteSiteUrl = (import.meta as any).env?.PUBLIC_SITE_URL
} catch {
  // Node CLI: import.meta.env is undefined; process.env fallback below.
}

const nodeEnv =
  typeof process !== 'undefined' && process.env ? process.env : ({} as NodeJS.ProcessEnv)

const projectId = viteProjectId || nodeEnv.PUBLIC_SANITY_PROJECT_ID
const dataset = viteDataset || nodeEnv.PUBLIC_SANITY_DATASET || 'production'
const siteUrl = viteSiteUrl || nodeEnv.PUBLIC_SITE_URL || 'http://localhost:4321'

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
