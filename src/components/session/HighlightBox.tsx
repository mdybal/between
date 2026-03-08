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
    wrapper: 'border-amber-800/50 bg-amber-950/20',
    title: 'text-amber-400',
    bullet: 'text-amber-700',
  },
  danger: {
    wrapper: 'border-red-900/50 bg-red-950/20',
    title: 'text-red-400',
    bullet: 'text-red-800',
  },
  note: {
    wrapper: 'border-stone-700/50 bg-stone-900/40',
    title: 'text-stone-400',
    bullet: 'text-stone-600',
  },
  lore: {
    wrapper: 'border-violet-900/50 bg-violet-950/20',
    title: 'text-violet-400',
    bullet: 'text-violet-800',
  },
}

const variantDefaultTitles: Record<HighlightVariant, string> = {
  clue: 'Clue Discovered',
  danger: 'Danger',
  note: 'Note',
  lore: 'Lore',
}

/**
 * HighlightBox — a callout box for clues, dangers, lore, or GM notes.
 *
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
        'rounded-lg border p-4 my-4',
        styles.wrapper,
        className,
      )}
    >
      <p className={cn('mb-2 font-serif text-xs uppercase tracking-widest', styles.title)}>
        {displayTitle}
      </p>
      <div className="font-serif text-sm leading-relaxed text-stone-400">
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
          <span className="font-serif text-sm leading-relaxed text-stone-400">{item}</span>
        </li>
      ))}
    </ul>
  )
}
