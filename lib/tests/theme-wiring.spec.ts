import { test, expect } from '@playwright/test'

test.describe('TASK-12: Theme provider and toggle wired into root layout', () => {
  test('ThemeToggle is visible at top of page', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /Cycle theme/ })
    await expect(toggle).toBeVisible()
  })

  test('theme cycles through all 4 themes on click', async ({ page }) => {
    await page.goto('/')
    const toggle = page.getByRole('button', { name: /Cycle theme/ })
    const html = page.locator('html')

    // Wait for hydration
    await page.waitForLoadState('networkidle')

    // Default should be daylight
    await expect(html).toHaveAttribute('data-theme', 'daylight')
    await expect(toggle).toContainText('Daylight')

    // Cycle: daylight -> dusk
    await toggle.click()
    await expect(html).toHaveAttribute('data-theme', 'dusk')
    await expect(toggle).toContainText('Dusk')

    // Cycle: dusk -> nighttime
    await toggle.click()
    await expect(html).toHaveAttribute('data-theme', 'nighttime')
    await expect(toggle).toContainText('Nighttime')

    // Cycle: nighttime -> morning
    await toggle.click()
    await expect(html).toHaveAttribute('data-theme', 'morning')
    await expect(toggle).toContainText('Morning')

    // Cycle: morning -> daylight
    await toggle.click()
    await expect(html).toHaveAttribute('data-theme', 'daylight')
    await expect(toggle).toContainText('Daylight')
  })

  test('theme persists across page reload (no flash)', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const toggle = page.getByRole('button', { name: /Cycle theme/ })

    // Set theme to dusk
    await toggle.click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dusk')

    // Reload page
    await page.reload()

    // Theme should still be dusk immediately (init script runs before React)
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dusk')
    await expect(page.getByRole('button', { name: /Cycle theme/ })).toContainText('Dusk')
  })

  test('init script applies theme before body renders', async ({ page }) => {
    // Set localStorage before navigating
    await page.goto('/')
    await page.evaluate(() => localStorage.setItem('theme', 'nighttime'))
    await page.reload()

    // The init script should have applied nighttime before React hydration
    const dataTheme = await page.locator('html').getAttribute('data-theme')
    expect(dataTheme).toBe('nighttime')
  })

  test('screenshot of wired layout', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)
    await page.screenshot({ path: '.agent/screenshots/TASK-12-1.png', fullPage: true })
  })
})
