import { test, expect } from '@playwright/test';

test('morning theme applies correct CSS variables', async ({ page }) => {
  // Set morning theme via localStorage, then load page so init script applies it
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('theme', 'morning'));
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  const dataTheme = await page.locator('html').getAttribute('data-theme');
  expect(dataTheme).toBe('morning');

  await page.screenshot({
    path: '.agent/screenshots/TASK-6-1.png',
    fullPage: true,
  });

  // Verify body has a visible background (not white/transparent)
  const bgColor = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  );
  expect(bgColor).not.toBe('rgb(255, 255, 255)');
  expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
});
