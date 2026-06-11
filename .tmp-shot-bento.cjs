const { chromium } = require('playwright');

const URL = process.env.DEV_URL || 'http://localhost:5173';

async function settleScroll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
  });
  await page.waitForTimeout(800);
}

(async () => {
  const browser = await chromium.launch();

  // Desktop dark EN
  const page = await browser.newPage({ deviceScaleFactor: 2 });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(URL);
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await settleScroll(page);

  const nine = await page.$('#project-9tours');
  const goout = await page.$('#project-go-out');

  await nine.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await nine.screenshot({ path: '.tmp-v2-9tours-rest.png' });

  const main = await nine.$('button[class*="bentoMain"]');
  await main.hover();
  await page.waitForTimeout(800);
  await nine.screenshot({ path: '.tmp-v2-9tours-hover-main.png' });

  const role = await nine.$('button[class*="bentoRole"]');
  await role.hover();
  await page.waitForTimeout(800);
  await nine.screenshot({ path: '.tmp-v2-9tours-hover-role.png' });

  const shot1 = await nine.$('button[class*="bentoShot1"]');
  await shot1.hover();
  await page.waitForTimeout(800);
  await nine.screenshot({ path: '.tmp-v2-9tours-hover-shot.png' });

  const stats = await nine.$('div[class*="bentoStats"]');
  await stats.hover();
  await page.waitForTimeout(800);
  await nine.screenshot({ path: '.tmp-v2-9tours-hover-stats.png' });

  await page.mouse.move(0, 0);
  await goout.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await goout.screenshot({ path: '.tmp-v2-goout-rest.png' });

  // Light theme
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'light'));
  await page.waitForTimeout(400);
  await nine.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await nine.screenshot({ path: '.tmp-v2-9tours-light.png' });

  // Thai (real language switch via the navbar toggle)
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.click('button[aria-label="Switch to Thai"]');
  await page.waitForTimeout(900);
  await nine.screenshot({ path: '.tmp-v2-9tours-th.png' });
  await role.hover();
  await page.waitForTimeout(800);
  await nine.screenshot({ path: '.tmp-v2-9tours-th-hover-role.png' });
  await stats.hover();
  await page.waitForTimeout(800);
  await nine.screenshot({ path: '.tmp-v2-9tours-th-hover-stats.png' });
  await page.close();

  // Mobile dark EN
  const m = await browser.newPage({ deviceScaleFactor: 2 });
  await m.setViewportSize({ width: 375, height: 812 });
  await m.goto(URL);
  await m.waitForTimeout(1500);
  await m.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await settleScroll(m);
  const proj = await m.$('#projects');
  const card = await m.$('#project-9tours');
  await card.scrollIntoViewIfNeeded();
  await m.waitForTimeout(400);
  await card.screenshot({ path: '.tmp-v2-mobile-rest.png' });
  const moreBtn = await card.$('button[class*="mobileMoreButton"]');
  await moreBtn.click();
  await m.waitForTimeout(700);
  await card.screenshot({ path: '.tmp-v2-mobile-expanded.png' });
  await proj.screenshot({ path: '.tmp-v2-mobile-section.png' });
  await m.close();

  await browser.close();
})();
