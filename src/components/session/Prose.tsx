import { cn } from '@/lib/utils'
import type { HtmlString, ScenePhase } from '@/types'

/**
 * Phase-specific text color presets for prose (milder than dividers)
 */
const phaseTextColors: Record<ScenePhase, string> = {
  Dawn: 'text-amber-300/90',
  Day: 'text-yellow-100/90',
  Dusk: 'text-stone-400',
  Night: 'text-purple-300/90',
}

/**
 * Prose — a block of narrative text.
 *
 * The `html` prop is treated as an `HtmlString` (see `src/types`) and is
 * rendered with `dangerouslySetInnerHTML` so that a small, safe subset of
 * inline HTML (e.g. `<br>`, `<em>`, `<strong>`, `<ul>`) takes effect.
 *
 * Use a `<div>` (not `<p>`) here because the contents may legally include
 * block-level tags such as `<ul>`/`<li>` — browsers will close a `<p>`
 * early if it contains such tags, which would break the layout.
 */
interface ProseProps {
  html: HtmlString
  phase?: ScenePhase
  className?: string
}

export function Prose({ html, phase, className }: ProseProps) {
  const phaseTextColor = phase ? phaseTextColors[phase] : null

  return (
    <div
      className={cn(
        'prose-html font-serif text-base leading-loose',
        phaseTextColor ?? 'text-graphite-200',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
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
