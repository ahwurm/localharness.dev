import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://localharness.dev',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !/\/(404|github|docs|plugins\/web)\/?$/.test(new URL(page).pathname),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  redirects: {
    '/github': 'https://github.com/ahwurm/localharness',
    '/localshift/github': 'https://github.com/ahwurm/localshift',
    '/docs': 'https://github.com/ahwurm/localharness/tree/main/docs/specs',
    // the web plugin's page was renamed Mobile 2026-10-02 ("web" read as web search)
    '/plugins/web': '/plugins/mobile/',
  },
});
