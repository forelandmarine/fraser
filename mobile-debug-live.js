const { chromium, devices } = require('playwright-core');
const path = require('path');
const browserPath = path.join(require('os').homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell');

(async () => {
  const browser = await chromium.launch({ executablePath: browserPath });
  const context = await browser.newContext({ ...devices['iPhone 14'] });
  const page = await context.newPage();
  
  await page.goto('https://fraseredwards.vercel.app', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(5000);
  
  await page.screenshot({ path: '/tmp/live-hero.png' });
  
  // Scroll to film strip area
  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 20));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/live-film.png' });
  
  // Scroll further
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2 + 100));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/live-crossing.png' });
  
  await browser.close();
})();
