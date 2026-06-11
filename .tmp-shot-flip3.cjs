const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:5174';

(async () => {
  const browser = await chromium.launch();

  // 1) Reduced motion: flip should crossfade to back face
  const rm = await browser.newPage();
  await rm.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await rm.emulateMedia({ reducedMotion: 'reduce' });
  await rm.setViewportSize({ width: 375, height: 812 });
  await rm.goto(BASE);
  await rm.waitForTimeout(1500);
  await rm.locator('#project-9tours').scrollIntoViewIfNeeded();
  await rm.waitForTimeout(500);
  await rm.locator('#project-9tours h3').first().click();
  await rm.waitForTimeout(600);
  const backVisible = await rm.evaluate(() => {
    const back = document.querySelector('#project-9tours [class*="mobileFaceBack"]');
    return back ? getComputedStyle(back).opacity : 'missing';
  });
  console.log('reduced-motion back opacity:', backVisible);
  await rm.screenshot({ path: '.tmp-flip3-reduced.png' });
  await rm.close();

  // 2) Hero tap must open gallery, not flip
  const page = await browser.newPage();
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE);
  await page.waitForTimeout(1500);
  await page.locator('#project-9tours').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator('#project-9tours [class*="mobileHeroButton"]').click();
  await page.waitForTimeout(800);
  const dialogOpen = await page.evaluate(() => Boolean(document.querySelector('[role="dialog"]')));
  const flipped = await page.evaluate(() => {
    const card = document.querySelector('#project-9tours [class*="mobileFlipCard"]');
    return card ? card.className.includes('Flipped') : 'missing';
  });
  console.log('gallery dialog open:', dialogOpen, '| card flipped:', flipped);
  await page.screenshot({ path: '.tmp-flip3-gallery.png' });
  await page.close();

  await browser.close();
})();
