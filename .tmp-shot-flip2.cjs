const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:5174';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE);
  await page.waitForTimeout(1800);

  // GO-OUT: flip, then bring scope row into view and let the count-up run
  const goOut = page.locator('#project-go-out');
  await goOut.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.locator('#project-go-out h3').first().click();
  await page.waitForTimeout(800);
  await page.locator('#project-go-out .' + 'mobileScopeRow'.replace('mobileScopeRow', '') + '[class*="mobileScopeRow"]').scrollIntoViewIfNeeded().catch(() => {});
  await page.evaluate(() => {
    const el = document.querySelector('#project-go-out [class*="mobileScopeRow"]');
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(1600);
  await page.screenshot({ path: '.tmp-flip2-goout-back-top.png' });

  // 9tours back head row (dark)
  await page.evaluate(() => {
    const card = document.querySelector('#project-9tours');
    if (card) card.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(600);
  await page.locator('#project-9tours h3').first().click().catch(() => {});
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const el = document.querySelector('#project-9tours [class*="mobileBackHead"]');
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: '.tmp-flip2-9tours-back-head.png' });

  // 9tours front dark, top of card in viewport
  await page.locator('#project-9tours button[aria-label="Back to overview"]').click();
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const card = document.querySelector('#project-9tours');
    if (card) card.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: '.tmp-flip2-9tours-front-dark.png' });

  await browser.close();
  console.log('done');
})();
