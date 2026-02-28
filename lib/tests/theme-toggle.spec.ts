import { test, expect } from '@playwright/test'

test.describe('ThemeToggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('displays current theme and cycles on click', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /cycle theme/i })

    await expect(toggle).toBeVisible()
    await expect(toggle).toHaveText('Daylight')

    await toggle.click()
    await expect(toggle).toHaveText('Dusk')

    await toggle.click()
    await expect(toggle).toHaveText('Nighttime')

    await toggle.click()
    await expect(toggle).toHaveText('Morning')

    await toggle.click()
    await expect(toggle).toHaveText('Daylight')
  })

  test('has glassmorphism styling', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /cycle theme/i })

    const classes = await toggle.getAttribute('class')
    expect(classes).toContain('backdrop-blur')
    expect(classes).toContain('bg-white/10')
  })

  test('has correct aria-label that updates', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /cycle theme/i })

    await expect(toggle).toHaveAttribute('aria-label', 'Cycle theme (current: Daylight)')

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-label', 'Cycle theme (current: Dusk)')
  })

  test('is keyboard accessible', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /cycle theme/i })

    await toggle.focus()
    await expect(toggle).toBeFocused()
    await toggle.press('Enter')
    await expect(toggle).toHaveText('Dusk')

    await toggle.press(' ')
    await expect(toggle).toHaveText('Nighttime')
  })

  test('persists theme across reload', async ({ page }) => {
    const toggle = page.getByRole('button', { name: /cycle theme/i })

    await toggle.click()
    await expect(toggle).toHaveText('Dusk')

    await page.reload()
    await page.waitForLoadState('networkidle')
    const reloadedToggle = page.getByRole('button', { name: /cycle theme/i })
    await expect(reloadedToggle).toHaveText('Dusk')
  })
})
