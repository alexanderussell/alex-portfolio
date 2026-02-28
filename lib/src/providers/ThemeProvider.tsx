import { createContext, useCallback, useContext, useState } from 'react'
import { type ThemeId, THEME_CYCLE, getNextTheme } from '../lib/theme'

interface ThemeContextValue {
  theme: ThemeId
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function isValidTheme(value: unknown): value is ThemeId {
  return typeof value === 'string' && THEME_CYCLE.includes(value as ThemeId)
}

function getInitialTheme(): ThemeId {
  if (typeof window === 'undefined') return 'daylight'
  try {
    const stored = window.localStorage.getItem('theme')
    if (isValidTheme(stored)) return stored
  } catch {
    // localStorage may be unavailable
  }
  return 'daylight'
}

function applyTheme(theme: ThemeId) {
  const root = document.documentElement
  for (const t of THEME_CYCLE) {
    root.classList.remove(t)
  }
  root.classList.add(theme)
  root.setAttribute('data-theme', theme)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeId>(getInitialTheme)

  const cycleTheme = useCallback(() => {
    setTheme((current) => {
      const next = getNextTheme(current)
      try {
        window.localStorage.setItem('theme', next)
      } catch {
        // localStorage may be unavailable
      }
      applyTheme(next)
      return next
    })
  }, [])

  return (
    <ThemeContext value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}
