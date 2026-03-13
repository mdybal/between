import { cn } from '@/lib/utils'

interface PullQuoteProps {
  children: React.ReactNode
  attribution?: string
  className?: string
}

/**
 * PullQuote — a styled blockquote for memorable in-game lines or flavour text.
 * Uses Art Nouveau vine border via the nouveau-quote CSS class.
 */
export function PullQuote({ children, attribution, className }: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        'nouveau-quote relative my-8 py-2',
        className,
      )}
    >
      <p className="font-serif text-base italic leading-loose text-amber-200/85">
        {children}
      </p>
      {attribution && (
        <footer className="mt-3 font-sc text-xs text-graphite-500">
          — {attribution}
        </footer>
      )}
    </blockquote>
  )
}
