// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from '../providers/ThemeProvider'
import ThemeToggle from './ThemeToggle'

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  localStorage.clear()
})

describe('ThemeToggle', () => {
  it('renders with current theme label', () => {
    renderToggle()
    const btn = screen.getByRole('button', { name: /cycle theme/i })
    expect(btn.textContent).toBe('Daylight')
  })

  it('displays correct label for stored theme', () => {
    localStorage.setItem('theme', 'nighttime')
    renderToggle()
    expect(screen.getByRole('button').textContent).toBe('Nighttime')
  })

  it('cycles theme on click', () => {
    renderToggle()
    const btn = screen.getByRole('button')

    expect(btn.textContent).toBe('Daylight')

    fireEvent.click(btn)
    expect(btn.textContent).toBe('Dusk')

    fireEvent.click(btn)
    expect(btn.textContent).toBe('Nighttime')

    fireEvent.click(btn)
    expect(btn.textContent).toBe('Morning')

    fireEvent.click(btn)
    expect(btn.textContent).toBe('Daylight')
  })

  it('has correct aria-label', () => {
    renderToggle()
    const btn = screen.getByRole('button')
    expect(btn.getAttribute('aria-label')).toBe('Cycle theme (current: Daylight)')
  })

  it('updates aria-label after cycling', () => {
    renderToggle()
    const btn = screen.getByRole('button')

    fireEvent.click(btn)
    expect(btn.getAttribute('aria-label')).toBe('Cycle theme (current: Dusk)')
  })

  it('has glassmorphism styling (backdrop-blur)', () => {
    renderToggle()
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('backdrop-blur')
    expect(btn.className).toContain('bg-white/10')
  })

  it('is keyboard focusable', () => {
    renderToggle()
    const btn = screen.getByRole('button')
    btn.focus()
    expect(document.activeElement).toBe(btn)
  })
})
