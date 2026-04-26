// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.entevate.com',
  integrations: [
    react(),
    sitemap({
      // Exclude internal/gated portals from search indexing
      filter: (page) =>
        !page.includes('/brand') &&
        !page.includes('/gtm') &&
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
