import { test, expect } from '@playwright/test';

test('nighttime theme applies correct CSS variables', async ({ page }) => {
  // Set nighttime theme via localStorage, then load page so init script applies it
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('theme', 'nighttime'));
  await page.reload();
  await page.waitForLoadState('domcontentloaded');

  const dataTheme = await page.locator('html').getAttribute('data-theme');
  expect(dataTheme).toBe('nighttime');

  await page.screenshot({
    path: '.agent/screenshots/TASK-5-1.png',
    fullPage: true,
  });

  // Verify body has a dark background (nighttime = near-black)
  const bgColor = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  );
  // Should not be white or transparent
  expect(bgColor).not.toBe('rgb(255, 255, 255)');
  expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');

  // Verify foreground is light (text should be readable on dark bg)
  const fgColor = await page.evaluate(() =>
    getComputedStyle(document.body).color,
  );
  expect(fgColor).not.toBe('rgb(0, 0, 0)');
});
