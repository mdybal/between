import { cn } from '@/lib/utils'

interface SessionDividerProps {
  label?: string
  className?: string
}

/**
 * SessionDivider — an Art Nouveau ornamental horizontal rule.
 * Optionally accepts a short label (e.g. "Scene II").
 */
export function SessionDivider({ label, className }: SessionDividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4 my-10', className)}>
        <div
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to right, transparent, rgba(180,120,40,0.4))' }}
        />
        <span className="font-display text-xs uppercase tracking-widest text-amber-800/80 px-1">
          ❧ {label} ❧
        </span>
        <div
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to left, transparent, rgba(180,120,40,0.4))' }}
        />
      </div>
    )
  }

  return (
    <div className={cn('nouveau-divider', className)} />
  )
}
