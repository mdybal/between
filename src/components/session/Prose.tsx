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
        'font-serif text-base leading-relaxed text-stone-300',
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
    <section className={cn('space-y-4', className)}>
      {heading && (
        <h3 className="font-serif text-xs uppercase tracking-widest text-stone-500 mb-2">
          {heading}
        </h3>
      )}
      {children}
    </section>
  )
}
