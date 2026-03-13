import { cn } from '@/lib/utils'

type HighlightVariant = 'clue' | 'danger' | 'note' | 'lore'

interface HighlightBoxProps {
  title?: string
  children: React.ReactNode
  variant?: HighlightVariant
  className?: string
}

const variantStyles: Record<HighlightVariant, { wrapper: string; title: string; bullet: string }> = {
  clue: {
    wrapper: 'border-amber-800/40',
    title: 'text-amber-600',
    bullet: 'text-amber-700',
  },
  danger: {
    wrapper: 'border-red-900/40',
    title: 'text-red-400',
    bullet: 'text-red-800',
  },
  note: {
    wrapper: 'border-graphite-600/50',
    title: 'text-graphite-300',
    bullet: 'text-graphite-500',
  },
  lore: {
    wrapper: 'border-violet-900/40',
    title: 'text-violet-400',
    bullet: 'text-violet-800',
  },
}

const variantBg: Record<HighlightVariant, string> = {
  clue:   'rgba(120, 80, 10, 0.1)',
  danger: 'rgba(100, 20, 20, 0.1)',
  note:   'rgba(37, 37, 40, 0.5)',
  lore:   'rgba(60, 20, 80, 0.1)',
}

const variantDefaultTitles: Record<HighlightVariant, string> = {
  clue: 'Clue Discovered',
  danger: 'Danger',
  note: 'Note',
  lore: 'Lore',
}

/**
 * HighlightBox — a callout box for clues, dangers, lore, or GM notes.
 * variant: "clue" | "danger" | "note" | "lore"
 */
export function HighlightBox({
  title,
  children,
  variant = 'note',
  className,
}: HighlightBoxProps) {
  const styles = variantStyles[variant]
  const displayTitle = title ?? variantDefaultTitles[variant]

  return (
    <aside
      className={cn(
        'art-card rounded-lg border p-5 my-5',
        styles.wrapper,
        className,
      )}
      style={{ backgroundColor: variantBg[variant] }}
    >
      <p className={cn('mb-3 font-display text-xs uppercase tracking-widest', styles.title)}>
        {displayTitle}
      </p>
      <div className="font-serif text-sm leading-loose text-graphite-300">
        {children}
      </div>
    </aside>
  )
}

/**
 * BulletList — a simple styled list, useful inside HighlightBox or standalone.
 */
interface BulletListProps {
  items: string[]
  bulletColor?: string
  className?: string
}

export function BulletList({ items, bulletColor = 'text-amber-700', className }: BulletListProps) {
  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className={cn('mt-1 shrink-0', bulletColor)}>✦</span>
          <span className="font-serif text-sm leading-loose text-graphite-300">{item}</span>
        </li>
      ))}
    </ul>
  )
}
