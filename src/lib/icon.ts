import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

/**
 * Site icon from the portrait: a circle cut just inside the photo's own circular crop
 * (the source has black corners). Transparent outside the circle, or on paper when
 * `flatten` is set, because iOS shows transparent corners as black.
 */
export async function iconPng(size: number, flatten = false): Promise<Response> {
  const src = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'portrait.jpg'));
  const r = size * 0.485;
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="#fff"/></svg>`,
  );
  let img = sharp(src)
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: mask, blend: 'dest-in' }]);
  if (flatten) img = sharp(await img.png().toBuffer()).flatten({ background: '#FAFAF7' });
  const png = await img.png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
}
