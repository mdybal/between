import { type Scene } from '@/types'
import { Prose, ProseSection } from './Prose'
import { PullQuote } from './PullQuote'
import { HighlightBox, BulletList } from './HighlightBox'
import { SessionDivider } from './SessionDivider'

interface SessionContentRendererProps {
  scenes: Scene[]
}

export function SessionContentRenderer({ scenes }: SessionContentRendererProps) {
  if (!scenes || scenes.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {scenes.map((scene, index) => (
        <div key={index}>
          {/* Scene heading as divider */}
          <SessionDivider label={scene.label} />

          {/* Prose paragraphs */}
          {scene.prose && scene.prose.length > 0 && (
            <ProseSection>
              {scene.prose.map((paragraph, pIndex) => (
                <Prose key={pIndex}>{paragraph}</Prose>
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
              {scene.highlightBox.items ? (
                <BulletList items={scene.highlightBox.items} />
              ) : scene.highlightBox.content ? (
                scene.highlightBox.content
              ) : null}
            </HighlightBox>
          )}
        </div>
      ))}
    </div>
  )
}
