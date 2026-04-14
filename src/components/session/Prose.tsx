import { cn } from '@/lib/utils'
import type { ScenePhase } from '@/types'

/**
 * Phase-specific text color presets for prose (milder than dividers)
 */
const phaseTextColors: Record<ScenePhase, string> = {
  Dawn: 'text-amber-200/85',
  Day: 'text-yellow-50',
  Dusk: 'text-stone-300',
  Night: 'text-purple-200/85',
}

/**
 * Prose — a block of narrative text.
 * Use multiple <Prose> blocks to break up a session into paragraphs / sections.
 */
interface ProseProps {
  children: React.ReactNode
  phase?: ScenePhase
  className?: string
}

export function Prose({ children, phase, className }: ProseProps) {
  const phaseTextColor = phase ? phaseTextColors[phase] : null
  
  return (
    <p
      className={cn(
        'font-serif text-base leading-loose',
        phaseTextColor ?? 'text-graphite-200',
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
  phase?: ScenePhase
  children: React.ReactNode
  className?: string
}

export function ProseSection({ heading, phase, children, className }: ProseSectionProps) {
  return (
    <section className={cn('space-y-5', className)}>
      {heading && (
        <h3 className={cn(
          'font-display text-xs uppercase tracking-widest mb-3',
          phase ? phaseTextColors[phase].replace('/85', '/60') : 'text-graphite-400'
        )}>
          {heading}
        </h3>
      )}
      {children}
    </section>
  )
}
