import { useState } from 'react'
import PageHeader from '@/components/ui/PageHeader'
import CharacterCard from '@/components/ui/CharacterCard'
import { getCharactersEn } from '@/data/characters_en'
import { getCharactersPl } from '@/data/characters_pl'
import type { NpcSubtype } from '@/types'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/LanguageContext'

type MainFilter = 'hunter' | 'npc'
type HunterSubFilter = 'all' | 'active' | 'retired'
type NpcSubFilter = 'all' | NpcSubtype

export default function CharactersPage() {
  const [mainFilter, setMainFilter] = useState<MainFilter>('hunter')
  const [hunterSub, setHunterSub] = useState<HunterSubFilter>('all')
  const [npcSub, setNpcSub] = useState<NpcSubFilter>('all')
  const { lang, t } = useLanguage()

  const activeCharacters = lang === 'pl' ? getCharactersPl() : getCharactersEn()

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
          <CharacterCard key={character.id} character={character} />
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
