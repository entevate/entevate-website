import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

// Load .env from the repo root regardless of CWD.
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
config({ path: path.resolve(__dirname, '..', '..', '.env') })

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId) {
  console.error('[sanity] PUBLIC_SANITY_PROJECT_ID not set in .env. Aborting.')
  process.exit(1)
}
if (!token) {
  console.error('[sanity] SANITY_API_TOKEN not set in .env. Aborting.')
  process.exit(1)
}

/**
 * Server-side write client with the Editor token.
 * Bypasses the CDN so mutations and reads reflect the latest state.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  useCdn: false,
  token,
  perspective: 'raw',
})

export { projectId, dataset }
