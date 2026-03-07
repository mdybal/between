import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'amber' | 'red' | 'green' | 'muted'
  className?: string
}

const variantClasses = {
  default: 'bg-stone-800 text-stone-300 border-stone-700',
  amber: 'bg-amber-950/60 text-amber-400 border-amber-800/50',
  red: 'bg-red-950/60 text-red-400 border-red-800/50',
  green: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50',
  muted: 'bg-stone-900 text-stone-500 border-stone-800',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded border px-2 py-0.5 font-serif text-xs tracking-wide',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
