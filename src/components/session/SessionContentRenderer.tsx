import { cn } from '@/lib/utils'
import { type Scene } from '@/types'
import { Prose, ProseSection } from './Prose'
import { PullQuote } from './PullQuote'
import { HighlightBox, BulletList } from './HighlightBox'
import { SessionDivider } from './SessionDivider'

interface SessionContentRendererProps {
  scenes: Scene[]
}

/**
 * Phase-specific border presets for scene containers
 * Background is uniform (same as session cards)
 */
const phaseBorders: Record<string, { border: string }> = {
  Dawn: {
    border: 'border-amber-800/40',
  },
  Day: {
    border: 'border-yellow-700/35',
  },
  Dusk: {
    border: 'border-stone-500/50',
  },
  Night: {
    border: 'border-purple-800/50',
  },
}

export function SessionContentRenderer({ scenes }: SessionContentRendererProps) {
  if (!scenes || scenes.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {scenes.map((scene, index) => {
        const phaseBorder = scene.phase ? phaseBorders[scene.phase] : null
        
        return (
          <div
            key={index}
            className={cn(
              'rounded-lg px-4 py-3 border',
              phaseBorder?.border ?? 'border-transparent'
            )}
            style={{
              backgroundColor: 'rgba(30,30,34,0.5)',
            }}
          >
            {/* Scene heading as divider */}
            <SessionDivider label={scene.label} phase={scene.phase} />

            {/* Prose paragraphs */}
            {scene.prose && scene.prose.length > 0 && (
              <ProseSection phase={scene.phase}>
                {scene.prose.map((paragraph, pIndex) => (
                  <Prose key={pIndex} phase={scene.phase}>{paragraph}</Prose>
                ))}
              </ProseSection>
            )}

            {/* Pull quote */}
            {scene.pullQuote && (
              <PullQuote
                attribution={scene.pullQuote.attribution}
              >
                {scene.pullQuote.text}
              </PullQuote>
            )}

            {/* Highlight box */}
            {scene.highlightBox && (
              <HighlightBox
                variant={scene.highlightBox.variant}
                title={scene.highlightBox.title}
              >
                {scene.highlightBox.content && (
                  <p className="mb-3 text-sm leading-relaxed text-graphite-300">
                    {scene.highlightBox.content}
                  </p>
                )}
                {scene.highlightBox.items && (
                  <BulletList items={scene.highlightBox.items} />
                )}
              </HighlightBox>
            )}
          </div>
        )
      })}
    </div>
  )
}
