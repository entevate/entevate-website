import { defineCliConfig } from 'sanity/cli'

/**
 * Sanity CLI config (used by `sanity` command).
 *
 * Only includes the `api` block when PUBLIC_SANITY_PROJECT_ID is set.
 * This lets commands that don't need a project (login, projects list,
 * init) run cleanly before .env is populated.
 */
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production'

export default defineCliConfig(
  projectId ? { api: { projectId, dataset } } : ({} as never),
)
