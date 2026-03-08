import { cn } from '@/lib/utils'

interface PullQuoteProps {
  children: React.ReactNode
  attribution?: string
  className?: string
}

/**
 * PullQuote — a styled blockquote for memorable in-game lines or flavour text.
 */
export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        'relative my-6 border-l-2 border-amber-700/60 pl-5 py-1',
        className,
      )}
    >
      <p className="font-serif text-base italic leading-relaxed text-amber-200/80">
        {children}
      </p>
      {attribution && (
        <footer className="mt-2 font-serif text-xs text-stone-600">
          — {attribution}
        </footer>
      )}
    </blockquote>
  )
}
