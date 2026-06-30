import { Link, useLocation } from 'react-router-dom'
import Badge from '@/components/ui/Badge'
import type { Character } from '@/types'
import { npcSubtypeBadgeVariant, statusBadgeVariant } from '@/lib/characterUtils'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/LanguageContext'
import { getThreatsEn } from '@/data/threats_en'
import { getThreatsPl } from '@/data/threats_pl'

interface CharacterCardProps {
  character: Character
  /** If true, renders as a plain card (no link wrapper). Useful in SessionDetailPage. */
  asCard?: boolean
}

export default function CharacterCard({ character, asCard = false }: CharacterCardProps) {
  const { lang, t } = useLanguage()
  const location = useLocation()

  const isHunter = character.type === 'hunter'
  const isNpc = character.type === 'npc'

  // NPC stylistic variants (only relevant when type === 'npc')
  const isAlly = isNpc && character.subtype === 'ally'
  const isAntagonist = isNpc && character.subtype === 'antagonist'
  const isDead = character.status === 'deceased'

  // Base background tint per NPC subtype
  //   - ally:       slightly lighter (faint green lift)
  //   - antagonist: slightly darker
  //   - neutral / hunter: original tone
  const baseBg = isAlly
    ? 'rgba(36,42,34,0.5)'   // a touch lighter + green-leaning
    : isAntagonist
      ? 'rgba(42, 34, 34, 0.5)'  // slightly darker than default
      : 'rgba(30,30,34,0.5)'

  // Hover background: brighter version of the base tint
  const hoverBg = isAlly
    ? 'rgba(36,42,34,0.8)'
    : isAntagonist
      ? 'rgba(22,22,26,0.9)'
      : 'rgba(30,30,34,0.8)'

  // Hover border tint
  //   - ally:       green-tinted
  //   - antagonist: red-tinted
  //   - neutral / hunter: original amber
  const hoverBorder = isAlly
    ? 'rgba(80,160,90,0.45)'   // green
    : isAntagonist
      ? 'rgba(180,60,60,0.45)' // red
      : 'rgba(180,120,40,0.35)'

  // Deceased NPCs keep the graphite border (no thematic hover) and go greyscale
  const restingBorder = 'var(--graphite-700)'

  // Preserve search params when navigating to character detail
  const searchParams = location.search

  // Resolve the case (threat) display name for NPCs that have a `case` field.
  // The id maps to a threat in src/data/threats.ts; the display name comes
  // from the language-specific threats text data.
  const caseName = (() => {
    if (!character.case) return null
    const threats = lang === 'pl' ? getThreatsPl() : getThreatsEn()
    return threats.find((th) => th.id === character.case)?.name ?? null
  })()

  const cardContent = (
    <>
      {/* Card inner: text on left, portrait on right */}
      <div className="flex flex-1 gap-4">
        {/* Text column */}
        <div className="flex flex-1 flex-col">
          {/* Badges row — kept OUTSIDE the greyscaled area so tags stay in full color */}
          <div className="mb-3 flex flex-wrap gap-2">
            {character.type === 'npc' ? (
              <>
                <Badge variant="muted">{t.characters.typeLabels.npc}</Badge>
                {character.subtype && (
                  <Badge variant={npcSubtypeBadgeVariant[character.subtype]}>
                    {t.characters.subtypeLabels[character.subtype]}
                  </Badge>
                )}
                {caseName && (
                  <Badge variant="amber">
                    {t.characters.caseBadgeLabel}: {caseName}
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

          {/* Greyscaled body — wraps everything below the badges so the
              name, description, conditions, traits and portrait are desaturated
              for dead NPCs, while the badges above stay in full color. */}
          <div className={cn(isDead && 'grayscale opacity-70')}>
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
                {character.traits?.map((trait) => (
                  <Badge key={trait} variant="muted">
                    {trait}
                  </Badge>
                )) ?? []}
              </div>
            )}
          </div>
        </div>

        {/* Portrait medallion — wrapped in the greyscaled area for dead NPCs
            (kept in the right-hand column of the inner flex row so it still
            sits next to the text, but visually desaturated with the body). */}
        <div className={cn('flex items-center', isDead && 'grayscale opacity-70')}>
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
      </div>
    </>
  )

  // Note: greyscale for dead characters is applied to the inner body/portrait
  // wrappers (see cardContent), not the outer card, so that the badges/tags
  // remain in full color.
  const cardClass = cn('art-card group flex flex-col rounded-lg p-5 transition-all')

  if (asCard) {
    return (
      <div
        className={cardClass}
        style={{
          border: '1px solid var(--graphite-700)',
          backgroundColor: baseBg,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = hoverBorder
          e.currentTarget.style.backgroundColor = hoverBg
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = restingBorder
          e.currentTarget.style.backgroundColor = baseBg
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
      state={{ fromCharacters: searchParams }}
      className={cardClass}
      style={{
        border: '1px solid var(--graphite-700)',
        backgroundColor: baseBg,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hoverBorder
        e.currentTarget.style.backgroundColor = hoverBg
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = restingBorder
        e.currentTarget.style.backgroundColor = baseBg
      }}
    >
      {cardContent}
    </Link>
  )
}
