import { test, expect } from '@playwright/test'

test.describe('Typography scale', () => {
  test('defines --font-size-display and --font-size-body CSS variables', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000')

    const vars = await page.evaluate(() => {
      const root = document.documentElement
      const style = getComputedStyle(root)
      return {
        display: style.getPropertyValue('--font-size-display').trim(),
        body: style.getPropertyValue('--font-size-body').trim(),
      }
    })

    expect(vars.display).toBe('1.875rem')
    expect(vars.body).toBe('1rem')
  })

  test('defines --font-display font family', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const fontDisplay = await page.evaluate(() => {
      const root = document.documentElement
      return getComputedStyle(root).getPropertyValue('--font-display').trim()
    })

    expect(fontDisplay).toContain('Fraunces')
  })

  test('.display-title uses display font family and size', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // The index page should have at least one .display-title element
    const el = page.locator('.display-title').first()
    await expect(el).toBeVisible()

    const styles = await el.evaluate((node) => {
      const cs = getComputedStyle(node)
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
      }
    })

    expect(styles.fontFamily).toContain('Fraunces')
    // 1.875rem = 30px at default 16px root
    expect(styles.fontSize).toBe('30px')
  })
})
