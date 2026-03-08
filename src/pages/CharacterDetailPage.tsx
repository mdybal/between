import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { characters } from '@/data/characters'
import type { CharacterType } from '@/types'

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

export default function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const character = characters.find((c) => c.id === id)

  if (!character) return <Navigate to="/characters" replace />

  const isHunter = character.type === 'hunter'

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      {/* Back link */}
      <div className="pt-8">
        <Link
          to="/characters"
          className="inline-flex items-center gap-2 font-serif text-sm text-stone-500 transition-colors hover:text-amber-400"
        >
          <ArrowLeft size={14} />
          All Characters
        </Link>
      </div>

      {/* Header */}
      <header className="mt-6 border-b border-amber-900/20 pb-8">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant={typeBadgeVariant[character.type]}>
            {typeLabels[character.type]}
          </Badge>
          <Badge variant={statusBadgeVariant[character.status]}>
            {character.status}
          </Badge>
          {/* Conditions inline in header for hunters */}
          {isHunter && character.conditions && character.conditions.map((condition) => (
            <Badge key={condition} variant="red">
              {condition}
            </Badge>
          ))}
        </div>

        <h1 className="font-serif text-3xl font-bold text-amber-400 md:text-4xl">
          {character.name}
        </h1>
        {character.alias && (
          <p className="mt-1 font-serif text-base italic text-stone-500">
            Known as "{character.alias}"
          </p>
        )}
        <p className="mt-2 font-serif text-sm text-amber-700/80">{character.occupation}</p>
      </header>

      {/* Description */}
      <section className="mt-8">
        <h2 className="mb-3 font-serif text-xs uppercase tracking-widest text-stone-500">
          Description
        </h2>
        <p className="font-serif text-base leading-relaxed text-stone-300">
          {character.description}
        </p>
      </section>

      {/* Background */}
      <section className="mt-8">
        <h2 className="mb-3 font-serif text-xs uppercase tracking-widest text-stone-500">
          Background
        </h2>
        <p className="font-serif text-base leading-relaxed text-stone-400">
          {character.background}
        </p>
      </section>

      {/* Traits (NPCs / non-hunters only) */}
      {!isHunter && (
        <section className="mt-8">
          <h2 className="mb-3 font-serif text-xs uppercase tracking-widest text-stone-500">
            Traits
          </h2>
          <div className="flex flex-wrap gap-2">
            {character.traits.map((trait) => (
              <Badge key={trait} variant="amber">
                {trait}
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Conditions (Hunters only) */}
      {isHunter && (
        <section className="mt-8">
          <h2 className="mb-3 font-serif text-xs uppercase tracking-widest text-stone-500">
            Conditions
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
            <p className="font-serif text-sm italic text-stone-600">No active conditions.</p>
          )}
        </section>
      )}

      {/* Private Quarters (Hunters only) */}
      {isHunter && character.privateQuarters && character.privateQuarters.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-serif text-xs uppercase tracking-widest text-stone-500">
            Private Quarters
          </h2>
          <div className="flex flex-wrap gap-2">
            {character.privateQuarters.map((item) => (
              <span
                key={item.name}
                className={[
                  'inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-serif text-xs tracking-wide',
                  item.used
                    ? 'border-yellow-700/50 bg-yellow-950/60 text-yellow-400'
                    : 'border-yellow-900/30 bg-yellow-950/20 text-yellow-700/60 line-through',
                ].join(' ')}
              >
                {item.name}
                {item.used && (
                  <span className="text-[10px] text-yellow-600/70">✓</span>
                )}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Masks (Hunters only) — two-column layout, one column per category */}
      {isHunter && character.masks && character.masks.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-4 font-serif text-xs uppercase tracking-widest text-stone-500">
            Masks
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {character.masks.map((group) => (
              <div key={group.category}>
                {/* Category header */}
                <h3 className="mb-3 border-b border-yellow-900/30 pb-1 font-serif text-sm font-semibold text-yellow-600">
                  {group.category}
                </h3>
                {/* Individual masks */}
                <ul className="space-y-2">
                  {group.masks.map((mask) => (
                    <li key={mask.name} className="flex items-center gap-2">
                      {/* Used indicator dot */}
                      <span
                        className={[
                          'h-2 w-2 shrink-0 rounded-full',
                          mask.used
                            ? 'bg-yellow-500'
                            : 'border border-stone-700 bg-transparent',
                        ].join(' ')}
                      />
                      <span
                        className={[
                          'font-serif text-sm',
                          mask.used ? 'text-yellow-300' : 'text-stone-600',
                        ].join(' ')}
                      >
                        {mask.name}
                      </span>
                      {mask.used && (
                        <span className="ml-auto font-serif text-[10px] text-yellow-700">
                          used
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Image placeholder */}
      {!character.imageUrl && (
        <div className="mt-8 flex h-48 items-center justify-center rounded-lg border border-dashed border-stone-800 bg-stone-900/30">
          <p className="font-serif text-xs italic text-stone-700">
            No portrait available
          </p>
        </div>
      )}
      {character.imageUrl && (
        <div className="mt-8 overflow-hidden rounded-lg border border-stone-800">
          <img
            src={character.imageUrl}
            alt={character.name}
            className="w-full object-cover"
          />
        </div>
      )}
    </div>
  )
}
