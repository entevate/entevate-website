import { defineCliConfig } from 'sanity/cli'

/**
 * Sanity CLI config (used by `sanity` command).
 * Kept minimal; production config lives in sanity.config.ts.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  },
})
