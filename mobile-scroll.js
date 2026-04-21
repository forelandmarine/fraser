const { chromium, devices } = require('playwright-core');
const path = require('path');
const browserPath = path.join(require('os').homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell');

(async () => {
  const browser = await chromium.launch({ executablePath: browserPath });
  const context = await browser.newContext({ ...devices['iPhone 14'] });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3333', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(4000);
  
  // Scroll to film strip
  await page.evaluate(() => window.scrollTo(0, window.innerHeight + 50));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/mob-film.png' });
  
  // Scroll to crossing
  await page.evaluate(() => {
    const crossing = document.querySelector('img[src*="453"]')?.closest('section');
    if (crossing) crossing.scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/mob-crossing.png' });
  
  // Scroll to prints
  await page.evaluate(() => {
    const prints = document.querySelector('.bg-deep.py-20');
    if (prints) prints.scrollIntoView();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/mob-prints.png' });
  
  await browser.close();
})();
