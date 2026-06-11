const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'http://localhost:5173';

(async () => {
  const browser = await chromium.launch();

  // ── Mobile EN dark ──
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE);
  await page.waitForTimeout(1800);
  const card9 = page.locator('#project-9tours');
  await card9.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await card9.screenshot({ path: '.tmp-flip-front-en.png' });

  // Tap the card body (not a button) -> flip
  await page.locator('#project-9tours h3').first().click();
  await page.waitForTimeout(900);
  await card9.screenshot({ path: '.tmp-flip-back-en.png' });

  // Flip back via round button
  await page.locator('#project-9tours button[aria-label="Back to overview"]').click();
  await page.waitForTimeout(900);
  await card9.screenshot({ path: '.tmp-flip-front-again.png' });

  // GO-OUT front + back
  const goOut = page.locator('#project-go-out');
  await goOut.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await goOut.screenshot({ path: '.tmp-flip-goout-front.png' });
  await page.locator('#project-go-out h3').first().click();
  await page.waitForTimeout(900);
  await goOut.screenshot({ path: '.tmp-flip-goout-back.png' });

  // Light theme (9tours back still flipped? reset: reload not needed; just shoot light front)
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(400);
  await goOut.screenshot({ path: '.tmp-flip-goout-back-light.png' });
  await card9.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await card9.screenshot({ path: '.tmp-flip-front-light.png' });
  await page.close();

  // ── Mobile TH dark ──
  const pageTh = await browser.newPage();
  await pageTh.addInitScript(() => localStorage.setItem('lang', 'th'));
  await pageTh.setViewportSize({ width: 375, height: 812 });
  await pageTh.goto(BASE);
  await pageTh.waitForTimeout(1800);
  const card9th = pageTh.locator('#project-9tours');
  await card9th.scrollIntoViewIfNeeded();
  await pageTh.waitForTimeout(900);
  await card9th.screenshot({ path: '.tmp-flip-front-th.png' });
  await pageTh.locator('#project-9tours h3').first().click();
  await pageTh.waitForTimeout(900);
  await card9th.screenshot({ path: '.tmp-flip-back-th.png' });
  await pageTh.close();

  // ── Narrow mobile 320px ──
  const narrow = await browser.newPage();
  await narrow.setViewportSize({ width: 320, height: 700 });
  await narrow.goto(BASE);
  await narrow.waitForTimeout(1800);
  const n9 = narrow.locator('#project-9tours');
  await n9.scrollIntoViewIfNeeded();
  await narrow.waitForTimeout(900);
  await n9.screenshot({ path: '.tmp-flip-front-320.png' });
  await narrow.locator('#project-9tours h3').first().click();
  await narrow.waitForTimeout(900);
  await n9.screenshot({ path: '.tmp-flip-back-320.png' });
  await narrow.close();

  // ── Desktop regression ──
  const desk = await browser.newPage();
  await desk.setViewportSize({ width: 1280, height: 900 });
  await desk.goto(BASE);
  await desk.waitForTimeout(1800);
  const d9 = desk.locator('#project-9tours');
  await d9.scrollIntoViewIfNeeded();
  await desk.waitForTimeout(900);
  await d9.screenshot({ path: '.tmp-flip-desktop.png' });
  await desk.close();

  await browser.close();
  console.log('done');
})();
