// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeProvider'

function wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.className = ''
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  localStorage.clear()
})

describe('ThemeProvider', () => {
  it('defaults to daylight when no stored theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('daylight')
  })

  it('reads stored theme from localStorage', () => {
    localStorage.setItem('theme', 'nighttime')
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('nighttime')
  })

  it('ignores invalid stored theme and defaults to daylight', () => {
    localStorage.setItem('theme', 'invalid-theme')
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBe('daylight')
  })

  it('cycles theme and persists to localStorage', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => result.current.cycleTheme())
    expect(result.current.theme).toBe('dusk')
    expect(localStorage.getItem('theme')).toBe('dusk')

    act(() => result.current.cycleTheme())
    expect(result.current.theme).toBe('nighttime')
    expect(localStorage.getItem('theme')).toBe('nighttime')
  })

  it('applies data-theme attribute and class to documentElement', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => result.current.cycleTheme())
    expect(document.documentElement.getAttribute('data-theme')).toBe('dusk')
    expect(document.documentElement.classList.contains('dusk')).toBe(true)
    expect(document.documentElement.classList.contains('daylight')).toBe(false)
  })

  it('completes full cycle back to daylight', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    act(() => result.current.cycleTheme()) // dusk
    act(() => result.current.cycleTheme()) // nighttime
    act(() => result.current.cycleTheme()) // morning
    act(() => result.current.cycleTheme()) // daylight

    expect(result.current.theme).toBe('daylight')
    expect(localStorage.getItem('theme')).toBe('daylight')
  })
})

describe('useTheme', () => {
  it('throws when used outside ThemeProvider', () => {
    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within a ThemeProvider')
  })
})
