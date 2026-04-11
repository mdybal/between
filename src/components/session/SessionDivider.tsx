import { cn } from '@/lib/utils'
import type { ScenePhase } from '@/types'

interface SessionDividerProps {
  label?: string
  phase?: ScenePhase
  className?: string
}

/**
 * Phase-specific styling presets for scene dividers
 */
const phaseStyles: Record<ScenePhase, { bg: string; text: string; gradient: string; flourish: string }> = {
  Dawn: {
    bg: 'bg-amber-950/30',
    text: 'text-amber-400',
    gradient: 'rgba(245,158,11,0.35)',
    flourish: '𖤓',
  },
  Day: {
    bg: 'bg-yellow-950/30',
    text: 'text-yellow-100',
    gradient: 'rgba(250,204,21,0.4)',
    flourish: '☀',
  },
  Dusk: {
    bg: 'bg-stone-800/40',
    text: 'text-stone-300',
    gradient: 'rgba(168,162,158,0.4)',
    flourish: '☁',
  },
  Night: {
    bg: 'bg-purple-950/50',
    text: 'text-purple-300',
    gradient: 'rgba(147,51,234,0.35)',
    flourish: '☾',
  },
}

/**
 * SessionDivider — an Art Nouveau ornamental horizontal rule.
 * Optionally accepts a short label (e.g. "Scene II") and phase for themed styling.
 */
export function SessionDivider({ label, phase, className }: SessionDividerProps) {
  const phaseStyle = phase ? phaseStyles[phase] : null

  if (label) {
    return (
      <div className={cn('flex items-center gap-4 my-10', className)}>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(to right, transparent, ${phaseStyle?.gradient ?? 'rgba(180,120,40,0.4)'})`,
          }}
        />
        <div className={cn('px-2 py-1 rounded', phaseStyle?.bg)}>
          <span className={cn('font-display text-xs uppercase tracking-widest px-1', phaseStyle?.text)}>
            {phaseStyle?.flourish ?? '❧'} {label} {phaseStyle?.flourish ?? '❧'}
          </span>
        </div>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(to left, transparent, ${phaseStyle?.gradient ?? 'rgba(180,120,40,0.4)'})`,
          }}
        />
      </div>
    )
  }

  return (
    <div className={cn('nouveau-divider', className)} />
  )
}
