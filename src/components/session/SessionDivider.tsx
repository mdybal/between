import { cn } from '@/lib/utils'

interface SessionDividerProps {
  label?: string
  className?: string
}

/**
 * SessionDivider — an ornamental horizontal rule.
 * Optionally accepts a short label (e.g. "Scene II").
 */
export function SessionDivider({ label, className }: SessionDividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4 my-8', className)}>
        <div className="h-px flex-1 bg-amber-900/30" />
        <span className="font-serif text-xs uppercase tracking-widest text-amber-800/70">
          {label}
        </span>
        <div className="h-px flex-1 bg-amber-900/30" />
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center gap-3 my-8', className)}>
      <div className="h-px w-16 bg-amber-900/30" />
      <span className="text-amber-800/50 text-xs">✦</span>
      <div className="h-px w-16 bg-amber-900/30" />
    </div>
  )
}
