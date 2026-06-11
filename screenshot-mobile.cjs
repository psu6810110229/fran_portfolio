const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5174');
  await page.waitForTimeout(1500);
  const el = await page.$('#projects');
  await el.screenshot({ path: 'mobile-projects-section.png' });
  // light mode
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(300);
  await el.screenshot({ path: 'mobile-projects-section-light.png' });
  await browser.close();
})();
