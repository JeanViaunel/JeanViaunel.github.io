// Prints cv/*.html to the PDFs the site serves from public/cv/.
// Run: npm run cv   (set BROWSER to a Chromium-based browser if Brave isn't installed)
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, '..', 'public', 'cv');
const executablePath = process.env.BROWSER ?? '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';

const docs = [
  ['resume.html', 'victor-jean-viaunel-resume.pdf'],
  ['academic-cv.html', 'victor-jean-viaunel-academic-cv.pdf'],
];

const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage();
for (const [src, pdf] of docs) {
  await page.goto(pathToFileURL(path.join(here, src)).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(out, pdf), format: 'A4', preferCSSPageSize: true, printBackground: true });
  console.log('wrote', pdf);
}
await browser.close();
