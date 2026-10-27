// @ts-check
import { defineConfig } from 'astro/config';

// On GitHub Pages the deploy workflow sets SITE (e.g. https://jeanviaunel.github.io)
// and BASE_PATH (e.g. /portfolio for a project site, empty for a user site).
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
});
