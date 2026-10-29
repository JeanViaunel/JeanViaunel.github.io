import { execSync } from 'node:child_process';
import type { APIRoute } from 'astro';
import { url } from '../lib/url';

// Each URL with the source file whose last commit dates it.
const pages: [string, string][] = [
  ['', 'src/pages/index.astro'],
  ['work/', 'src/pages/work.astro'],
  ['work/marine-debris/', 'src/pages/work/marine-debris.astro'],
  ['work/scan-to-bim/', 'src/pages/work/scan-to-bim.astro'],
  ['research/', 'src/pages/research.astro'],
  ['research/2d-to-bim/', 'src/pages/research/2d-to-bim.astro'],
  ['about/', 'src/pages/about.astro'],
  ['now/', 'src/pages/now.astro'],
];

const lastmod = (file: string) => {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${file}"`, { encoding: 'utf8' }).trim();
    if (d) return d;
  } catch {
    // not a git checkout
  }
  return new Date().toISOString().slice(0, 10);
};

export const GET: APIRoute = ({ site }) => {
  const entries = pages
    .map(([p, file]) => `  <url><loc>${new URL(url(p), site)}</loc><lastmod>${lastmod(file)}</lastmod></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
