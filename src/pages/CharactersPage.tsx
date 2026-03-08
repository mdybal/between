import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import { characters } from '@/data/characters'
import type { CharacterType } from '@/types'
import { cn } from '@/lib/utils'

const typeLabels: Record<CharacterType, string> = {
  hunter: 'Hunter',
  npc: 'NPC',
  ally: 'Ally',
  antagonist: 'Antagonist',
}

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

const filters: { value: CharacterType | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'hunter', label: 'Hunters' },
  { value: 'npc', label: 'NPCs' },
  { value: 'ally', label: 'Allies' },
  { value: 'antagonist', label: 'Antagonists' },
]

export default function CharactersPage() {
  const [filter, setFilter] = useState<CharacterType | 'all'>('all')

  const filtered = filter === 'all' ? characters : characters.filter((c) => c.type === filter)

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <PageHeader title="Characters" subtitle="Dramatis Personae" />

      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={cn(
              'rounded border px-3 py-1 font-serif text-xs tracking-wide transition-colors',
              filter === value
                ? 'border-amber-700 bg-amber-950/50 text-amber-400'
                : 'border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-700 hover:text-stone-300',
            )}
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
            className="group flex flex-col rounded-lg border border-stone-800 bg-stone-900/40 p-5 transition-all hover:border-amber-800/40 hover:bg-stone-900/70"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant={typeBadgeVariant[character.type]}>
                  {typeLabels[character.type]}
                </Badge>
                <Badge variant={statusBadgeVariant[character.status]}>
                  {character.status}
                </Badge>
              </div>
              <ChevronRight
                size={16}
                className="mt-0.5 shrink-0 text-amber-900 transition-transform group-hover:translate-x-1 group-hover:text-amber-600"
              />
            </div>

            <h2 className="font-serif text-lg font-semibold text-stone-200 transition-colors group-hover:text-amber-300">
              {character.name}
              {character.alias && (
                <span className="ml-2 font-serif text-sm font-normal italic text-stone-500">
                  "{character.alias}"
                </span>
              )}
            </h2>
            <p className="mt-0.5 font-serif text-xs text-amber-700/80">{character.occupation}</p>

            <p className="mt-3 line-clamp-2 font-serif text-sm leading-relaxed text-stone-500">
              {character.description}
            </p>

            {/* Conditions (Hunters only) */}
            {character.type === 'hunter' && character.conditions && character.conditions.length > 0 && (
              <div className="mt-3">
                <p className="mb-1 font-serif text-xs uppercase tracking-widest text-stone-600">
                  Conditions
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
          <p className="font-serif text-stone-600 italic">No characters found.</p>
        </div>
      )}
    </div>
  )
}
