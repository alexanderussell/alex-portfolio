import { test, expect } from '@playwright/test';

test('dusk theme applies correct CSS variables', async ({ page }) => {
  // Set dusk theme via localStorage, then load page so init script applies it
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('theme', 'dusk'));
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  const dataTheme = await page.locator('html').getAttribute('data-theme');
  expect(dataTheme).toBe('dusk');

  await page.screenshot({
    path: '.agent/screenshots/TASK-4-1.png',
    fullPage: true,
  });

  // Verify body has a visible background (not white/transparent)
  const bgColor = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  );
  expect(bgColor).not.toBe('rgb(255, 255, 255)');
  expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
});
