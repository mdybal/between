import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'amber' | 'red' | 'green' | 'muted'
  className?: string
}

const variantClasses = {
  default: 'border-graphite-600 text-graphite-300',
  amber:   'text-amber-600 border-amber-800/50',
  red:     'text-red-400 border-red-800/50',
  green:   'text-emerald-400 border-emerald-800/50',
  muted:   'text-graphite-400 border-graphite-700',
}

const variantBg = {
  default: 'rgba(37, 37, 40, 0.8)',
  amber:   'rgba(120, 60, 10, 0.25)',
  red:     'rgba(100, 20, 20, 0.25)',
  green:   'rgba(10, 80, 40, 0.25)',
  muted:   'rgba(30, 30, 34, 0.8)',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-2 py-0.5 font-sc text-xs tracking-wide',
        variantClasses[variant],
        className,
      )}
      style={{ backgroundColor: variantBg[variant] }}
    >
      {children}
    </span>
  )
}
