import { Link } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import type { Character } from '@/types'
import { npcSubtypeBadgeVariant, statusBadgeVariant } from '@/lib/characterUtils'
import { useLanguage } from '@/i18n/LanguageContext'

interface CharacterCardProps {
  character: Character
  /** If true, renders as a plain card (no link wrapper). Useful in SessionDetailPage. */
  asCard?: boolean
}

export default function CharacterCard({ character, asCard = false }: CharacterCardProps) {
  const { t } = useLanguage()

  const isHunter = character.type === 'hunter'

  const cardContent = (
    <>
      {/* Card inner: text on left, portrait on right */}
      <div className="flex gap-4">
        {/* Text column */}
        <div className="flex flex-1 flex-col">
          {/* Badges row */}
          <div className="mb-3 flex flex-wrap gap-2">
            {character.type === 'npc' ? (
              <>
                <Badge variant="muted">{t.characters.typeLabels.npc}</Badge>
                {character.subtype && (
                  <Badge variant={npcSubtypeBadgeVariant[character.subtype]}>
                    {t.characters.subtypeLabels[character.subtype]}
                  </Badge>
                )}
              </>
            ) : (
              <Badge variant="amber">{t.characters.typeLabels.hunter}</Badge>
            )}
            {character.status && (
              <Badge variant={statusBadgeVariant[character.status]}>
                {t.characters.statusLabels[character.status]}
              </Badge>
            )}
          </div>

          <h2 className="font-display text-xl font-semibold text-amber-600 group-hover:text-amber-200 transition-colors">
            {character.name}
            {character.alias && (
              <span className="ml-2 font-serif text-sm font-normal italic text-graphite-500">
                "{character.alias}"
              </span>
            )}
          </h2>
          <p className="mt-0.5 font-sc text-xs text-amber-700/80">{character.occupation}</p>

          <p className="mt-3 line-clamp-2 font-serif text-sm leading-loose text-graphite-500">
            {character.description}
          </p>

          {/* Conditions (Hunters only) */}
          {isHunter && character.conditions && character.conditions.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 font-sc text-xs uppercase tracking-widest text-graphite-600">
                {t.characters.conditions}
              </p>
              <div className="flex flex-wrap gap-1">
                {character.conditions.map((condition) => (
                  <Badge key={condition} variant="red">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Traits (NPCs only) */}
          {character.type === 'npc' && (
            <div className="mt-3 flex flex-wrap gap-1">
              {character.traits.map((trait) => (
                <Badge key={trait} variant="muted">
                  {trait}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Portrait medallion */}
        {character.imageUrl && (
          <div
            className="shrink-0 self-center flex items-center justify-center overflow-hidden"
            style={{
              width: '122px',
              height: '162px',
              borderRadius: '50%',
              backgroundColor: '#eacfa9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            <img
              src={character.imageUrl}
              alt={character.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </>
  )

  if (asCard) {
    return (
      <div
        className="art-card group flex flex-col rounded-lg p-5 transition-all"
        style={{
          border: '1px solid var(--graphite-700)',
          backgroundColor: 'rgba(30,30,34,0.5)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(180,120,40,0.35)'
          e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.8)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--graphite-700)'
          e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.5)'
        }}
      >
        {cardContent}
      </div>
    )
  }

  return (
    <Link
      key={character.id}
      to={`/characters/${character.id}`}
      className="art-card group flex flex-col rounded-lg p-5 transition-all"
      style={{
        border: '1px solid var(--graphite-700)',
        backgroundColor: 'rgba(30,30,34,0.5)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(180,120,40,0.35)'
        e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.8)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--graphite-700)'
        e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.5)'
      }}
    >
      {cardContent}
    </Link>
  )
}
