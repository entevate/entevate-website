// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.entevate.com',
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/brand') })],
  redirects: {
    '/transformation': '/operational-intelligence',
    '/transformation/content-readiness': '/operational-intelligence/content-readiness',
    '/transformation/digital-strategy': '/operational-intelligence/digital-strategy',
    '/transformation/cad-to-cgi': '/operational-intelligence/cad-to-cgi',
    '/transformation/remote-assistance': '/operational-intelligence',
    '/operational-intelligence/remote-assistance': '/operational-intelligence',
  }
});
