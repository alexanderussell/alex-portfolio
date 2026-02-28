import { test, expect } from '@playwright/test'

const THEMES = ['daylight', 'dusk', 'nighttime', 'morning'] as const

test.describe('Background gradients per theme', () => {
  for (const theme of THEMES) {
    test(`${theme} theme has a gradient background`, async ({ page }) => {
      // Set the theme via localStorage before navigation
      await page.addInitScript((t) => {
        window.localStorage.setItem('theme', t)
      }, theme)

      await page.goto('http://localhost:3000')
      await page.waitForLoadState('domcontentloaded')

      // Verify the data-theme attribute is applied
      const dataTheme = await page
        .locator('html')
        .getAttribute('data-theme')
      expect(dataTheme).toBe(theme)

      // Verify body::before has the gradient background via computed style
      const bgImage = await page.evaluate(() => {
        const before = window.getComputedStyle(
          document.body,
          '::before',
        )
        return before.backgroundImage
      })
      expect(bgImage).not.toBe('none')
      expect(bgImage).toContain('gradient')

      // Verify pointer-events is none (doesn't block interactions)
      const pointerEvents = await page.evaluate(() => {
        const before = window.getComputedStyle(
          document.body,
          '::before',
        )
        return before.pointerEvents
      })
      expect(pointerEvents).toBe('none')

      // Verify it covers the viewport (position fixed, inset 0)
      const position = await page.evaluate(() => {
        const before = window.getComputedStyle(
          document.body,
          '::before',
        )
        return before.position
      })
      expect(position).toBe('fixed')
    })
  }

  test('screenshot of each theme gradient', async ({ page }) => {
    for (const theme of THEMES) {
      await page.addInitScript((t) => {
        window.localStorage.setItem('theme', t)
      }, theme)
      await page.goto('http://localhost:3000')
      await page.waitForLoadState('domcontentloaded')
      await page.screenshot({
        path: `.agent/screenshots/TASK-7-${theme}.png`,
        fullPage: false,
      })
    }
  })
})
