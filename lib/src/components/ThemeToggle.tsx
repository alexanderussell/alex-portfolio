import { useTheme } from '../providers/ThemeProvider'
import { THEME_LABELS } from '../lib/theme'

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme()
  const label = THEME_LABELS[theme]

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Cycle theme (current: ${label})`}
      title={`Cycle theme (current: ${label})`}
      className="min-h-[44px] min-w-[44px] rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
    >
      {label}
    </button>
  )
}
