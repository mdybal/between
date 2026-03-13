import { cn } from '@/lib/utils'

/**
 * Prose — a block of narrative text.
 * Use multiple <Prose> blocks to break up a session into paragraphs / sections.
 */
interface ProseProps {
  children: React.ReactNode
  className?: string
}

export function Prose({ children, className }: ProseProps) {
  return (
    <p
      className={cn(
        'font-serif text-base leading-loose text-graphite-200',
        className,
      )}
    >
      {children}
    </p>
  )
}

/**
 * ProseSection — groups several Prose blocks under an optional heading.
 */
interface ProseSectionProps {
  heading?: string
  children: React.ReactNode
  className?: string
}

export function ProseSection({ heading, children, className }: ProseSectionProps) {
  return (
    <section className={cn('space-y-5', className)}>
      {heading && (
        <h3 className="font-display text-xs uppercase tracking-widest text-graphite-400 mb-3">
          {heading}
        </h3>
      )}
      {children}
    </section>
  )
}
