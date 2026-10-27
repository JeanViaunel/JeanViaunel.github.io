import type { APIRoute } from 'astro';
import { nav } from '../data/site';
import { url } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  const paths = ['', ...nav.map((n) => n.path), 'work/marine-debris/', 'research/2d-to-bim/'];
  const entries = paths
    .map((p) => `  <url><loc>${new URL(url(p), site)}</loc></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
