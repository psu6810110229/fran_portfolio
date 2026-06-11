const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5174');
  await page.waitForTimeout(1200);
  const nav = await page.$('nav, header');
  await nav.screenshot({ path: 'mobile-navbar.png' });
  await browser.close();
})();
