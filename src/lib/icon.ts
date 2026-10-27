import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/** Rasterise public/favicon.svg to a square PNG of the given size. */
export async function iconPng(size: number, flatten = false): Promise<Response> {
  const svg = fs.readFileSync(path.join(process.cwd(), 'public', 'favicon.svg'));
  let img = sharp(svg, { density: 72 * Math.ceil(size / 32) * 2 }).resize(size, size);
  if (flatten) img = img.flatten({ background: '#1A1D21' });
  const png = await img.png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
