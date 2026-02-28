export type ThemeId = 'daylight' | 'dusk' | 'nighttime' | 'morning'

export const THEME_CYCLE: ThemeId[] = [
  'daylight',
  'dusk',
  'nighttime',
  'morning',
]

export const THEME_LABELS: Record<ThemeId, string> = {
  daylight: 'Daylight',
  dusk: 'Dusk',
  nighttime: 'Nighttime',
  morning: 'Morning',
}

export function getNextTheme(current: ThemeId): ThemeId {
  const index = THEME_CYCLE.indexOf(current)
  return THEME_CYCLE[(index + 1) % THEME_CYCLE.length]
}
