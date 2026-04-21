const { chromium, devices } = require('playwright-core');
const path = require('path');

// Find the chromium binary
const browserPath = path.join(require('os').homedir(), 'Library/Caches/ms-playwright/chromium_headless_shell-1217/chrome-headless-shell-mac-arm64/chrome-headless-shell');

(async () => {
  const browser = await chromium.launch({ executablePath: browserPath });
  const iPhone = devices['iPhone 14'];
  const context = await browser.newContext({ ...iPhone });
  const page = await context.newPage();
  
  await page.goto('http://localhost:3333', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(4000);
  
  await page.screenshot({ path: '/tmp/mob-hero.png' });
  
  const debug = await page.evaluate(() => {
    const results = {};
    results.viewport = { w: window.innerWidth, h: window.innerHeight };
    results.scrollH = document.body.scrollHeight;
    
    // All sections
    const sections = document.querySelectorAll('section');
    results.sections = Array.from(sections).map((s, i) => {
      const r = s.getBoundingClientRect();
      const cs = getComputedStyle(s);
      return {
        i, w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top),
        cssH: cs.height, overflow: cs.overflow, overflowX: cs.overflowX,
        classes: s.className.substring(0, 60),
        style: s.getAttribute('style')?.substring(0, 60) || '',
      };
    });
    
    // Film strip container specifically
    const filmDiv = document.querySelector('.overflow-x-auto');
    if (filmDiv) {
      const r = filmDiv.getBoundingClientRect();
      const cs = getComputedStyle(filmDiv);
      results.filmDiv = {
        w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top),
        cssH: cs.height, overflow: cs.overflow, overflowX: cs.overflowX,
        snap: cs.scrollSnapType,
      };
      const track = filmDiv.firstElementChild;
      if (track) {
        const tr = track.getBoundingClientRect();
        results.filmTrack = { w: Math.round(tr.width), h: Math.round(tr.height), transform: cs.transform };
      }
      // First few children sizes
      const kids = track?.children;
      if (kids) {
        results.filmKids = Array.from(kids).slice(0, 4).map(k => {
          const kr = k.getBoundingClientRect();
          return { w: Math.round(kr.width), h: Math.round(kr.height), classes: k.className.substring(0, 50) };
        });
      }
    }
    
    return results;
  });
  
  console.log(JSON.stringify(debug, null, 2));
  await browser.close();
})();
