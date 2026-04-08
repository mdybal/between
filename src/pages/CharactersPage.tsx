import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import { characters } from '@/data/characters'
import { charactersPl } from '@/data/characters_pl'
import type { CharacterType } from '@/types'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/LanguageContext'

const typeBadgeVariant: Record<CharacterType, 'amber' | 'green' | 'muted' | 'red'> = {
  hunter: 'amber',
  ally: 'green',
  npc: 'muted',
  antagonist: 'red',
}

const statusBadgeVariant = {
  active: 'green',
  deceased: 'red',
  missing: 'amber',
  unknown: 'muted',
} as const

export default function CharactersPage() {
  const [filter, setFilter] = useState<CharacterType | 'all'>('all')
  const { lang, t } = useLanguage()

  const activeCharacters = lang === 'pl' ? charactersPl : characters

  const filters: { value: CharacterType | 'all'; label: string }[] = [
    { value: 'all', label: t.characters.filters.all },
    { value: 'hunter', label: t.characters.filters.hunter },
    { value: 'npc', label: t.characters.filters.npc },
    { value: 'ally', label: t.characters.filters.ally },
    { value: 'antagonist', label: t.characters.filters.antagonist },
  ]

  const filtered = filter === 'all' ? activeCharacters : activeCharacters.filter((c) => c.type === filter)

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <PageHeader title={t.characters.title} subtitle={t.characters.subtitle} />

      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              'rounded border px-3 py-1 font-sc text-xs tracking-wide transition-colors',
              filter === value
                ? 'border-amber-700 text-amber-600'
                : 'text-graphite-500 hover:text-graphite-300',
            )}
            style={
              filter === value
                ? { backgroundColor: 'rgba(120,60,10,0.3)' }
                : { borderColor: 'var(--graphite-700)', backgroundColor: 'rgba(30,30,34,0.4)' }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Character grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((character) => (
          <Link
            key={character.id}
            to={`/characters/${character.id}`}
            className="art-card group flex flex-col rounded-lg p-5 transition-all"
            style={{
              border: '1px solid var(--graphite-700)',
              backgroundColor: 'rgba(30,30,34,0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(180,120,40,0.35)'
              e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.8)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--graphite-700)'
              e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.5)'
            }}
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant={typeBadgeVariant[character.type]}>
                  {t.characters.typeLabels[character.type]}
                </Badge>
                <Badge variant={statusBadgeVariant[character.status]}>
                  {t.characters.statusLabels[character.status]}
                </Badge>
              </div>
              <ChevronRight
                size={16}
                className="mt-0.5 shrink-0 text-amber-900 transition-transform group-hover:translate-x-1 group-hover:text-amber-600"
              />
            </div>

            <h2 className="mt-1 font-display text-xl font-semibold text-amber-600 group-hover:text-amber-200 transition-colors">
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
            {character.type === 'hunter' && character.conditions && character.conditions.length > 0 && (
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

            {/* Traits (NPCs / non-hunters) */}
            {character.type !== 'hunter' && (
              <div className="mt-3 flex flex-wrap gap-1">
                {character.traits.map((trait) => (
                  <Badge key={trait} variant="muted">
                    {trait}
                  </Badge>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-graphite-600 italic">{t.characters.empty}</p>
        </div>
      )}
    </div>
  )
}
