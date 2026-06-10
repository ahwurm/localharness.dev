import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const base = process.env.SHOT_BASE ?? 'http://localhost:4321';
const outDir = process.env.SHOT_DIR ?? '.planning/screens';
mkdirSync(outDir, { recursive: true });

const launch = async () => {
  try {
    return await chromium.launch();
  } catch {
    return await chromium.launch({ executablePath: '/usr/local/bin/chromium-browser' });
  }
};

const browser = await launch();
const pages = [
  ['/', 'index'],
  ['/localshift/', 'localshift'],
  ['/404.html', '404'],
];
const viewports = [
  [1440, 900, 'desktop'],
  [390, 844, 'mobile'],
];

for (const [w, h, vp] of viewports) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  for (const [path, name] of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(5500); // let the hero demo animation finish
    await page.screenshot({ path: `${outDir}/${name}-${vp}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log(`shots written to ${outDir}`);
