import { useParams, Link, Navigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { getCharactersEn } from '@/data/characters_en'
import { getCharactersPl } from '@/data/characters_pl'
import { npcSubtypeBadgeVariant, statusBadgeVariant } from '@/lib/characterUtils'
import { useLanguage } from '@/i18n/LanguageContext'

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lang, t } = useLanguage()
  const location = useLocation()

  const activeCharacters = lang === 'pl' ? getCharactersPl() : getCharactersEn()
  const character = activeCharacters.find((c) => c.id === id)

  if (!character) return <Navigate to="/characters" replace />

  const isHunter = character.type === 'hunter'

  // Preserve search params when going back to characters page
  const backToCharacters = location.state?.fromCharacters
    ? '/characters' + location.state.fromCharacters
    : '/characters'

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      {/* Back link */}
      <div className="pt-8">
        <Link
          to={backToCharacters}
          state={location.state}
          className="inline-flex items-center gap-2 font-sc text-sm text-graphite-500 transition-colors hover:text-amber-600"
        >
          <ArrowLeft size={14} />
          {t.characterDetail.backLink}
        </Link>
      </div>

      {/* Header */}
      <header
        className="relative mt-6 pb-6 pt-4"
        style={{ borderBottom: '1px solid rgba(180,120,40,0.18)' }}
      >
        {/* Portrait - floating left, doesn't affect header centering */}
        {character.imageUrl && (
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2"
            style={{ paddingLeft: '1rem' }}
          >
            <div
              className="flex items-center justify-center overflow-hidden"
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
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}

        {/* Text content - centered across full page width */}
        <div className="flex flex-col items-center">
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {character.type === 'npc' ? (
              <>
                <Badge variant="muted">
                  {t.characters.typeLabels.npc}
                </Badge>
                {character.subtype && (
                  <Badge variant={npcSubtypeBadgeVariant[character.subtype]}>
                    {t.characters.subtypeLabels[character.subtype]}
                  </Badge>
                )}
              </>
            ) : (
              <Badge variant="amber">
                {t.characters.typeLabels.hunter}
              </Badge>
            )}
            {character.status && (
              <Badge variant={statusBadgeVariant[character.status]}>
                {t.characters.statusLabels[character.status]}
              </Badge>
            )}
            {/* Conditions inline in header for hunters */}
            {isHunter && character.conditions && character.conditions.map((condition) => (
              <Badge key={condition} variant="red">
                {condition}
              </Badge>
            ))}
          </div>

          <h1 className="nouveau-heading max-w-[66%] break-words text-center font-display text-3xl font-bold text-amber-600 md:text-4xl">
            {character.name}
          </h1>
          {character.alias && (
            <p className="mt-1 font-serif text-base italic text-graphite-500">
              {t.characterDetail.knownAs} "{character.alias}"
            </p>
          )}
          <p className="mt-2 font-sc text-sm text-amber-700/80">{character.occupation}</p>
        </div>
      </header>
      {/* Main content */}
      <div className="mt-8">
        {/* Description */}
        <section>
          <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
            {t.characterDetail.description}
          </h2>
          <p className="font-serif text-base leading-loose text-graphite-200">
            {character.description}
          </p>
        </section>

        {/* Background */}
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
            {t.characterDetail.background}
          </h2>
          <p className="font-serif text-base leading-loose text-graphite-300">
            {character.background}
          </p>
        </section>

        {/* Traits (NPCs / non-hunters only) */}
        {!isHunter && (
          <section className="mt-8">
            <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
              {t.characterDetail.traits}
            </h2>
            <div className="flex flex-wrap gap-2">
              {character.traits?.map((trait) => (
                <Badge key={trait} variant="amber">
                  {trait}
                </Badge>
              )) ?? []}
            </div>
          </section>
        )}

        {/* Conditions (Hunters only) */}
        {isHunter && (
          <section className="mt-8">
            <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
              {t.characterDetail.conditions}
            </h2>
            {character.conditions && character.conditions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {character.conditions.map((condition) => (
                  <Badge key={condition} variant="red">
                    {condition}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="font-serif text-sm italic text-graphite-600">{t.characterDetail.noConditions}</p>
            )}
          </section>
        )}
      </div>

      {/* Masks (Hunters only) — two-column layout, one column per category */}
      {isHunter && character.masks && character.masks.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 font-display text-xs uppercase tracking-widest text-graphite-500">
            {t.characterDetail.masks}
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {character.masks.map((group) => (
              <div key={group.category}>
                {/* Category header */}
                <h3
                  className="mb-3 pb-1 font-display text-sm font-semibold text-yellow-600"
                  style={{ borderBottom: '1px solid rgba(120,80,10,0.3)' }}
                >
                  {group.category}
                </h3>
                {/* Individual masks */}
                <ul className="space-y-2">
                  {group.masks.map((mask) => (
                    <li key={mask.name} className="flex items-center gap-2">
                      {/* Masked indicator dot - green filled circle */}
                      <span
                        className={[
                          'h-2 w-2 shrink-0 rounded-full',
                          mask.masked
                            ? 'bg-green-500'
                            : mask.used
                            ? 'bg-yellow-500'
                            : 'border bg-transparent',
                        ].join(' ')}
                        style={!mask.masked && !mask.used ? { borderColor: 'var(--graphite-700)' } : {}}
                      />
                      <span
                        className={[
                          'font-serif text-sm',
                          mask.masked ? 'text-green-400' : mask.used ? 'text-yellow-300' : 'text-graphite-600',
                        ].join(' ')}
                      >
                        {mask.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
