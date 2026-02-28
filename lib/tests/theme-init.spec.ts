import { test, expect } from '@playwright/test'

test('theme init script applies daylight by default', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().includes('net::')) {
      errors.push(msg.text())
    }
  })

  await page.goto('/')
  await page.waitForLoadState('domcontentloaded')

  const dataTheme = await page.locator('html').getAttribute('data-theme')
  expect(dataTheme).toBe('daylight')

  const hasClass = await page.locator('html').evaluate(
    (el) => el.classList.contains('daylight')
  )
  expect(hasClass).toBe(true)

  expect(errors).toEqual([])
})

test('theme persists across page loads via localStorage', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('domcontentloaded')

  // Set theme to dusk via localStorage
  await page.evaluate(() => localStorage.setItem('theme', 'dusk'))

  // Reload page
  await page.reload()
  await page.waitForLoadState('domcontentloaded')

  const dataTheme = await page.locator('html').getAttribute('data-theme')
  expect(dataTheme).toBe('dusk')
})
