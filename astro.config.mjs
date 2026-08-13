import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.kalingafirst.com',
  // Static output by default: pages are pre-rendered at build time for
  // ultra-fast delivery. Article slugs are resolved via getStaticPaths().
  output: 'static',
  // Hide the floating Astro dev toolbar at the bottom of the page.
  devToolbar: {
    enabled: false,
  },
  server: {
    port: 4321,
    host: true,
  },
  vite: {
    // Surface a helpful message during local dev if env vars are missing.
    define: {},
  },
});
