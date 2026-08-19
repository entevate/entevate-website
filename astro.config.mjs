// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

// Read Sanity env vars at build time. Astro/Vite exposes PUBLIC_-prefixed vars
// on both client and server; process.env is used here since this file runs in Node.
const SANITY_PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID || '';
const SANITY_DATASET = process.env.PUBLIC_SANITY_DATASET || 'production';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.entevate.com',

  // Astro 5: default 'static' output now behaves like the old 'hybrid'.
  // Individual routes opt in to SSR via `export const prerender = false`.
  output: 'static',
  adapter: vercel(),

  integrations: [
    react(),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      useCdn: true,
      studioBasePath: '/studio',
    }),
    sitemap({
      // Exclude internal/gated portals from search indexing
      filter: (page) =>
        !page.includes('/brand') &&
        !page.includes('/gtm') &&
        !page.includes('/studio') &&
        !page.includes('/api/') &&
        page !== 'https://www.entevate.com/growth-engine',
    }),
  ],
  redirects: {
    '/transformation': '/operational-intelligence',
    '/transformation/content-readiness': '/operational-intelligence/assessment',
    '/operational-intelligence/content-readiness': '/operational-intelligence/assessment',
    '/transformation/digital-strategy': '/operational-intelligence/digital-strategy',
    '/transformation/cad-to-cgi': '/operational-intelligence/cad-to-cgi',
    '/transformation/remote-assistance': '/operational-intelligence',
    '/operational-intelligence/remote-assistance': '/operational-intelligence',
  }
});
