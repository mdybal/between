import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import { characters } from '@/data/characters'
import { charactersPl } from '@/data/characters_pl'
import type { NpcSubtype } from '@/types'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/LanguageContext'

type MainFilter = 'hunter' | 'npc'
type HunterSubFilter = 'all' | 'active' | 'retired'
type NpcSubFilter = 'all' | NpcSubtype

const npcSubtypeBadgeVariant: Record<NpcSubtype, 'amber' | 'green' | 'muted' | 'red'> = {
  neutral: 'muted',
  ally: 'green',
  antagonist: 'red',
}

const statusBadgeVariant: Record<string, 'green' | 'red' | 'amber' | 'muted'> = {
  active: 'green',
  retired: 'amber',
  deceased: 'red',
  missing: 'amber',
  unknown: 'muted',
}

export default function CharactersPage() {
  const [mainFilter, setMainFilter] = useState<MainFilter>('hunter')
  const [hunterSub, setHunterSub] = useState<HunterSubFilter>('all')
  const [npcSub, setNpcSub] = useState<NpcSubFilter>('all')
  const { lang, t } = useLanguage()

  const activeCharacters = lang === 'pl' ? charactersPl : characters

  const filtered = activeCharacters.filter((c) => {
    if (c.type !== mainFilter) return false
    if (mainFilter === 'hunter') {
      if (hunterSub === 'all') return true
      return c.status === hunterSub
    }
    // npc
    if (npcSub === 'all') return true
    return c.subtype === npcSub
  })

  const hunterSubFilters: { value: HunterSubFilter; label: string }[] = [
    { value: 'all', label: t.characters.subFilters.all },
    { value: 'active', label: t.characters.subFilters.active },
    { value: 'retired', label: t.characters.subFilters.retired },
  ]

  const npcSubFilters: { value: NpcSubFilter; label: string }[] = [
    { value: 'all', label: t.characters.subFilters.all },
    { value: 'neutral', label: t.characters.subtypeLabels.neutral },
    { value: 'ally', label: t.characters.subtypeLabels.ally },
    { value: 'antagonist', label: t.characters.subtypeLabels.antagonist },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <PageHeader title={t.characters.title} subtitle={t.characters.subtitle} />

      {/* Filter row */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {/* Main filters */}
        <div className="flex gap-2">
          {(['hunter', 'npc'] as MainFilter[]).map((value) => (
            <button
              key={value}
              onClick={() => setMainFilter(value)}
              className={cn(
                'rounded border px-3 py-1 font-sc text-xs tracking-wide transition-colors',
                mainFilter === value
                  ? 'border-amber-700 text-amber-600'
                  : 'text-graphite-500 hover:text-graphite-300',
              )}
              style={
                mainFilter === value
                  ? { backgroundColor: 'rgba(120,60,10,0.3)' }
                  : { borderColor: 'var(--graphite-700)', backgroundColor: 'rgba(30,30,34,0.4)' }
              }
            >
              {value === 'hunter' ? t.characters.filters.hunter : t.characters.filters.npc}
            </button>
          ))}
        </div>

        {/* Divider */}
        <span
          className="h-5 w-px"
          style={{ backgroundColor: 'var(--graphite-700)' }}
          aria-hidden="true"
        />

        {/* Sub-filters */}
        <div className="flex gap-2">
          {mainFilter === 'hunter'
            ? hunterSubFilters.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setHunterSub(value)}
                  className={cn(
                    'rounded border px-3 py-1 font-sc text-xs tracking-wide transition-colors',
                    hunterSub === value
                      ? 'border-amber-800/70 text-amber-700'
                      : 'text-graphite-600 hover:text-graphite-400',
                  )}
                  style={
                    hunterSub === value
                      ? { backgroundColor: 'rgba(100,50,5,0.25)' }
                      : { borderColor: 'var(--graphite-800)', backgroundColor: 'rgba(30,30,34,0.25)' }
                  }
                >
                  {label}
                </button>
              ))
            : npcSubFilters.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setNpcSub(value)}
                  className={cn(
                    'rounded border px-3 py-1 font-sc text-xs tracking-wide transition-colors',
                    npcSub === value
                      ? 'border-amber-800/70 text-amber-700'
                      : 'text-graphite-600 hover:text-graphite-400',
                  )}
                  style={
                    npcSub === value
                      ? { backgroundColor: 'rgba(100,50,5,0.25)' }
                      : { borderColor: 'var(--graphite-800)', backgroundColor: 'rgba(30,30,34,0.25)' }
                  }
                >
                  {label}
                </button>
              ))}
        </div>
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
                {/* For NPCs show type badge + subtype badge */}
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
