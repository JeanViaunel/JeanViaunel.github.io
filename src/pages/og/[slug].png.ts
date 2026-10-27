// 1200×630 share images, rendered at build time. Satori turns the text into
// vector paths (so no system fonts are needed) and sharp rasterises the SVG.
import fs from 'node:fs';
import path from 'node:path';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { site } from '../../data/site';
import { isarcSentence } from '../../data/publications';
import { facts, leaderboard, submissions } from '../../data/marine-debris';

const us = leaderboard.find((r) => r.us)!;
const best = Math.max(...submissions.map((s) => s.score));

const cards: Record<string, { kicker: string; title: string; sub: string }> = {
  home: {
    kicker: 'Civil engineer who writes software',
    title: 'I teach computers to read buildings.',
    sub: 'Scan-to-BIM, IFC and language models for BIM at the NTU H-Team lab.',
  },
  work: { kicker: 'Work', title: 'Things I’ve built', sub: 'Scan-to-BIM, computer vision, AI datasets and web products.' },
  research: {
    kicker: 'Research',
    title: 'Papers and talks',
    sub: 'Scan-to-BIM with mobile LiDAR and LLM-assisted BIM generation, ISARC and ICCCBE 2026.',
  },
  about: { kicker: 'About', title: 'Two trades, one desk', sub: 'Civil engineer and full-stack developer at National Taiwan University.' },
  now: { kicker: 'Now', title: 'What I’m doing now', sub: 'Research at NTU, MaiSchool, PhotoForge, and helping Haitian students apply in Taiwan.' },
  'marine-debris': {
    kicker: 'Case study',
    title: 'Marine debris detection',
    sub: `${submissions.length} submissions from ${submissions[0].score.toFixed(3)} to ${best.toFixed(3)} mAP, finishing ${us.privateRank}th of ${facts.teamsEntered} teams.`,
  },
  '2d-to-bim': {
    kicker: 'Research explainer',
    title: 'From 2D drawings to BIM',
    sub: isarcSentence,
  },
};

export const getStaticPaths: GetStaticPaths = () => Object.keys(cards).map((slug) => ({ params: { slug } }));

const font = (pkg: string, file: string) =>
  fs.readFileSync(path.join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));
const fonts = [
  { name: 'Plex Sans', data: font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff'), weight: 400 as const },
  { name: 'Plex Sans', data: font('ibm-plex-sans', 'ibm-plex-sans-latin-600-normal.woff'), weight: 600 as const },
  { name: 'Plex Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff'), weight: 500 as const },
];

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
});

const C = { paper: '#FAFAF7', ink: '#1A1D21', body: '#3A3F46', muted: '#5A6068', rule: '#DEDFDA', accent: '#C2410C' };

function card(c: { kicker: string; title: string; sub: string }): Node {
  const mark = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><rect width="26" height="26" rx="5" fill="#1A1D21"/><path d="M7 7.5l6 11 6-11" fill="none" stroke="#FAFAF7" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="19.5" cy="19" r="2" fill="#C2410C"/></svg>',
  )}`;
  const dots = Array.from({ length: 11 }, (_, r) =>
    Array.from({ length: 13 }, (_, c) => `<circle cx="${5 + c * 9 + (r % 2) * 4}" cy="${5 + r * 8.5}" r="1.3"/>`).join(''),
  ).join('');
  const motif = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 96"><rect x="1" y="1" width="238" height="94" fill="#FFFFFF" stroke="#1A1D21" stroke-width="2"/><g fill="#1A1D21">${dots}</g><rect x="120" y="2" width="118" height="92" fill="#EEEFEA"/><line x1="120" y1="2" x2="120" y2="94" stroke="#C2410C" stroke-width="2" stroke-dasharray="5 4"/></svg>`,
  )}`;
  return h(
    'div',
    {
      // Satori sizes the content box: 1200 × 630 minus padding and the bottom border.
      width: 1200 - 72 * 2,
      height: 630 - 64 - 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px 0',
      borderBottom: `10px solid ${C.accent}`,
      backgroundColor: C.paper,
      backgroundImage: `linear-gradient(to right, rgba(26,29,33,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,29,33,0.06) 1px, transparent 1px)`,
      backgroundSize: '30px 30px',
      fontFamily: 'Plex Sans',
      color: C.ink,
    },
    h(
      'div',
      { display: 'flex', alignItems: 'center', gap: 18 },
      { type: 'img', props: { src: mark, width: 48, height: 48 } },
      h('div', { fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }, site.name),
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', maxWidth: 960 },
      h('div', { fontFamily: 'Plex Mono', fontSize: 22, letterSpacing: 2, textTransform: 'uppercase', color: C.accent, marginBottom: 18 }, c.kicker),
      h('div', { fontSize: 76, fontWeight: 600, lineHeight: 1.04, letterSpacing: -2.5 }, c.title),
      h('div', { fontSize: 30, lineHeight: 1.4, color: C.body, marginTop: 24 }, c.sub),
    ),
    h(
      'div',
      { display: 'flex', width: 1056, alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 40 },
      h('div', { fontFamily: 'Plex Mono', fontSize: 22, color: C.muted }, 'jeanviaunel.github.io'),
      // The site's motif: half scanned points, half model, split by a dashed line.
      { type: 'img', props: { src: motif, width: 240, height: 96 } },
    ),
  );
}

export const GET: APIRoute = async ({ params }) => {
  const c = cards[params.slug as string];
  const svg = await satori(card(c) as never, { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
