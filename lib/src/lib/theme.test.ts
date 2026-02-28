import { describe, expect, it } from 'vitest'
import { getNextTheme, THEME_CYCLE } from './theme'
import type { ThemeId } from './theme'

describe('THEME_CYCLE', () => {
  it('contains exactly 4 themes in order', () => {
    expect(THEME_CYCLE).toEqual(['daylight', 'dusk', 'nighttime', 'morning'])
  })
})

describe('getNextTheme', () => {
  it('cycles daylight → dusk', () => {
    expect(getNextTheme('daylight')).toBe('dusk')
  })

  it('cycles dusk → nighttime', () => {
    expect(getNextTheme('dusk')).toBe('nighttime')
  })

  it('cycles nighttime → morning', () => {
    expect(getNextTheme('nighttime')).toBe('morning')
  })

  it('wraps morning → daylight', () => {
    expect(getNextTheme('morning')).toBe('daylight')
  })

  it('completes a full cycle back to the start', () => {
    let theme: ThemeId = 'daylight'
    for (const _ of THEME_CYCLE) {
      theme = getNextTheme(theme)
    }
    expect(theme).toBe('daylight')
  })
})
