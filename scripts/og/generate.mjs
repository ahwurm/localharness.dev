import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const font = (pkg, file) => `file://${root}/node_modules/@fontsource-variable/${pkg}/files/${file}`;

const cards = [
  {
    name: 'localharness',
    brand: ['local', 'harness'],
    tagline: 'AI agents on your own hardware.',
  },
  {
    name: 'localshift',
    brand: ['local', 'shift'],
    tagline: 'Same workflow. Same output. Much lower cost.',
  },
];

const html = (c) => `<!doctype html>
<html><head><style>
  @font-face {
    font-family: 'Geist';
    src: url('${font('geist', 'geist-latin-wght-normal.woff2')}') format('woff2-variations');
    font-weight: 100 900;
  }
  @font-face {
    font-family: 'Geist Mono';
    src: url('${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')}') format('woff2-variations');
    font-weight: 100 900;
  }
  * { margin: 0; }
  body {
    width: 1200px; height: 630px;
    background: #15161b;
    display: flex; flex-direction: column; justify-content: center;
    padding: 0 96px; box-sizing: border-box;
    font-family: 'Geist', sans-serif;
    position: relative; overflow: hidden;
  }
  .brand { font-family: 'Geist Mono', monospace; font-weight: 600; font-size: 104px; letter-spacing: -0.03em; color: #eeeff2; }
  .brand .u { color: #5ee9a4; }
  .tagline { margin-top: 26px; font-size: 40px; font-weight: 500; color: #c7cad2; letter-spacing: -0.01em; }
  .domain { position: absolute; bottom: 56px; left: 96px; font-family: 'Geist Mono', monospace; font-size: 26px; color: #5ee9a4; }
</style></head>
<body>
  <div class="brand">${c.brand[0]}<span class="u">_</span>${c.brand[1]}</div>
  <div class="tagline">${c.tagline}</div>
  <div class="domain">localharness.dev</div>
</body></html>`;

mkdirSync(`${root}/public/og`, { recursive: true });

const launch = async () => {
  try {
    return await chromium.launch();
  } catch {
    return await chromium.launch({ executablePath: '/usr/local/bin/chromium-browser' });
  }
};

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await page.setContent(html(c), { waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.fonts.status === 'loaded');
  await page.screenshot({ path: `${root}/public/og/${c.name}.png` });
  console.log(`og: ${c.name}.png`);
}
await browser.close();
