import { useSearchParams } from 'react-router-dom'
import PageHeader from '@/components/ui/PageHeader'
import CharacterCard from '@/components/ui/CharacterCard'
import CheckboxDropdown, {
  type CheckboxDropdownOption,
} from '@/components/ui/CheckboxDropdown'
import { getCharactersEn } from '@/data/characters_en'
import { getCharactersPl } from '@/data/characters_pl'
import { getThreatsEn } from '@/data/threats_en'
import { getThreatsPl } from '@/data/threats_pl'
import type { NpcSubtype } from '@/types'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/LanguageContext'

type MainFilter = 'hunter' | 'npc'
type HunterSubFilter = 'all' | 'active' | 'retired'
type NpcSubFilter = 'all' | NpcSubtype

export default function CharactersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lang, t } = useLanguage()

  const mainFilter: MainFilter = (searchParams.get('main') as MainFilter) || 'hunter'
  const subParam = searchParams.get('sub') || 'all'

  const hunterSub: HunterSubFilter = mainFilter === 'hunter' ? (subParam as HunterSubFilter) : 'all'
  const npcSub: NpcSubFilter = mainFilter === 'npc' ? (subParam as NpcSubFilter) : 'all'

  const setMainFilter = (value: MainFilter) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('main', value)
    // Reset sub filter when switching main filter
    if (value === 'hunter') {
      newParams.set('sub', hunterSub)
    } else {
      newParams.set('sub', npcSub)
    }
    setSearchParams(newParams)
  }

  const setHunterSub = (value: HunterSubFilter) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('sub', value)
    setSearchParams(newParams)
  }

  const setNpcSub = (value: NpcSubFilter) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('sub', value)
    setSearchParams(newParams)
  }

  // ─── Case filter (NPC only) ────────────────────────────────────────────────
  // Stored in the URL as a comma-separated list of threat ids
  // (e.g. `cases=mastermind-conspiracy,james-street-ghost`).
  // The special sentinel `__none__` represents characters that have no
  // associated case (i.e. `character.case` is undefined). When the list is
  // empty, all NPCs match (no filtering by case).
  const casesParam = searchParams.get('cases') || ''
  const selectedCases = casesParam
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const includeNoCase = selectedCases.includes('__none__')
  const selectedThreatCases = selectedCases.filter((c) => c !== '__none__')

  const setSelectedCases = (next: string[]) => {
    const newParams = new URLSearchParams(searchParams)
    if (next.length === 0) {
      newParams.delete('cases')
    } else {
      newParams.set('cases', next.join(','))
    }
    setSearchParams(newParams)
  }

  const activeCharacters = lang === 'pl' ? getCharactersPl() : getCharactersEn()
  const activeThreats = lang === 'pl' ? getThreatsPl() : getThreatsEn()

  // Options for the case dropdown — sourced from src/data/threats.ts (ids)
  // and the language-specific threats text files (display names).
  // The special `__none__` entry represents characters that have no
  // associated case (i.e. `character.case` is undefined).
  const caseOptions: CheckboxDropdownOption[] = [
    ...activeThreats.map((th) => ({ value: th.id, label: th.name })),
    { value: '__none__', label: t.characters.caseFilters.none },
  ]

  const filtered = activeCharacters.filter((c) => {
    if (c.type !== mainFilter) return false
    if (mainFilter === 'hunter') {
      if (hunterSub === 'all') return true
      return c.status === hunterSub
    }
    // npc
    if (npcSub !== 'all' && c.subtype !== npcSub) return false
    // Case filter — only applies when at least one case is selected
    if (selectedCases.length > 0) {
      if (!c.case) {
        // Character has no case; only match if `__none__` is selected
        return includeNoCase
      }
      return selectedThreatCases.includes(c.case)
    }
    return true
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

        {/* Case filter — only visible when the NPC main filter is active */}
        {mainFilter === 'npc' && (
          <>
            {/* Divider */}
            <span
              className="h-5 w-px"
              style={{ backgroundColor: 'var(--graphite-700)' }}
              aria-hidden="true"
            />
            <CheckboxDropdown
              label={t.characters.caseFilters.label}
              allLabel={t.characters.caseFilters.all}
              options={caseOptions}
              selected={selectedCases}
              onChange={setSelectedCases}
            />
          </>
        )}
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
