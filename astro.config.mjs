// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URL: override in CI with SITE_URL once the CF Pages URL is known.
const SITE = process.env.SITE_URL || 'https://fluxion-seo.pages.dev';

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'always',
  },
  compressHTML: true,
});
