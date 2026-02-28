import { test, expect } from '@playwright/test'

test.describe('Homepage content block', () => {
  test('displays name, bio, Projects heading, and project list', async ({
    page,
  }) => {
    await page.goto('/')

    // Name displayed with display-title class
    const name = page.locator('main h1')
    await expect(name).toHaveText('Alex Russell')
    await expect(name).toHaveClass(/display-title/)

    // Bio paragraph present
    const bio = page.locator('main p').first()
    await expect(bio).toContainText('Product Designer')

    // Projects heading with display-title class
    const projectsHeading = page.locator('main h2')
    await expect(projectsHeading).toHaveText('Projects')
    await expect(projectsHeading).toHaveClass(/display-title/)

    // Project list items
    const projectItems = page.locator('main ul li')
    await expect(projectItems).toHaveCount(3)
    await expect(projectItems.nth(0)).toContainText('AI Design System')
    await expect(projectItems.nth(1)).toContainText('Sunlit')
    await expect(projectItems.nth(2)).toContainText('Portfolio')
  })

  test('uses exactly 2 font sizes', async ({ page }) => {
    await page.goto('/')

    // Display elements use --font-size-display
    const nameSize = await page
      .locator('main h1')
      .evaluate((el) => getComputedStyle(el).fontSize)
    const projectsHeadingSize = await page
      .locator('main h2')
      .evaluate((el) => getComputedStyle(el).fontSize)
    expect(nameSize).toBe(projectsHeadingSize)

    // Body elements use --font-size-body
    const bioSize = await page
      .locator('main p')
      .first()
      .evaluate((el) => getComputedStyle(el).fontSize)
    const linkSize = await page
      .locator('main ul li a')
      .first()
      .evaluate((el) => getComputedStyle(el).fontSize)
    expect(bioSize).toBe(linkSize)

    // Display and body sizes are different
    expect(nameSize).not.toBe(bioSize)
  })

  test('screenshot', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(500)
    await page.screenshot({
      path: '../.agent/screenshots/TASK-10-1.png',
      fullPage: true,
    })
  })
})
