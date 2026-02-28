import { test, expect } from '@playwright/test'

test.describe('Mobile responsive layout', () => {
  test.use({ viewport: { width: 320, height: 568 } })

  test('no horizontal overflow at 320px', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('h1')

    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    )
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    )
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
  })

  test('content is readable at 320px', async ({ page }) => {
    await page.goto('/')
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()

    const main = page.locator('main')
    const box = await main.boundingBox()
    expect(box).not.toBeNull()
    // Content should fit within the viewport
    expect(box!.x).toBeGreaterThanOrEqual(0)
    expect(box!.x + box!.width).toBeLessThanOrEqual(320)
  })

  test('theme toggle has adequate touch target (min 44px)', async ({
    page,
  }) => {
    await page.goto('/')
    const toggle = page.locator('button[aria-label^="Cycle theme"]')
    await expect(toggle).toBeVisible()

    const box = await toggle.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(44)
    expect(box!.width).toBeGreaterThanOrEqual(44)
  })

  test('line length is constrained with max-width', async ({ page }) => {
    await page.goto('/')
    const main = page.locator('main')
    const maxWidth = await main.evaluate((el) => getComputedStyle(el).maxWidth)
    // max-w-2xl = 672px (42rem)
    expect(maxWidth).not.toBe('none')
  })

  test('screenshot at 320px viewport', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('h1')
    await page.screenshot({
      path: '../.agent/screenshots/TASK-13-320px.png',
      fullPage: true,
    })
  })
})
