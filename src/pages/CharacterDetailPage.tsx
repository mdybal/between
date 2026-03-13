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
          className="inline-flex items-center gap-2 font-sc text-sm text-graphite-500 transition-colors hover:text-amber-600"
        >
          <ArrowLeft size={14} />
          All Characters
        </Link>
      </div>

      {/* Header */}
      <header
        className="mt-6 pb-8"
        style={{ borderBottom: '1px solid rgba(180,120,40,0.18)' }}
      >
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

        <h1 className="nouveau-heading font-display text-3xl font-bold text-amber-600 md:text-4xl">
          {character.name}
        </h1>
        {character.alias && (
          <p className="mt-1 font-serif text-base italic text-graphite-500">
            Known as "{character.alias}"
          </p>
        )}
        <p className="mt-2 font-sc text-sm text-amber-700/80">{character.occupation}</p>
      </header>

      {/* Description */}
      <section className="mt-8">
        <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
          Description
        </h2>
        <p className="font-serif text-base leading-loose text-graphite-200">
          {character.description}
        </p>
      </section>

      {/* Background */}
      <section className="mt-8">
        <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
          Background
        </h2>
        <p className="font-serif text-base leading-loose text-graphite-300">
          {character.background}
        </p>
      </section>

      {/* Traits (NPCs / non-hunters only) */}
      {!isHunter && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
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
          <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
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
            <p className="font-serif text-sm italic text-graphite-600">No active conditions.</p>
          )}
        </section>
      )}

      {/* Private Quarters (Hunters only) */}
      {isHunter && character.privateQuarters && character.privateQuarters.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
            Private Quarters
          </h2>
          <div className="flex flex-wrap gap-2">
            {character.privateQuarters.map((item) => (
              <span
                key={item.name}
                className={[
                  'inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-sc text-xs tracking-wide',
                  item.used
                    ? 'border-yellow-700/50 text-yellow-400'
                    : 'border-yellow-900/30 text-yellow-700/60 line-through',
                ].join(' ')}
                style={{
                  backgroundColor: item.used ? 'rgba(100,70,10,0.3)' : 'rgba(60,50,10,0.15)',
                }}
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
          <h2 className="mb-4 font-display text-xs uppercase tracking-widest text-graphite-500">
            Masks
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
                      {/* Used indicator dot */}
                      <span
                        className={[
                          'h-2 w-2 shrink-0 rounded-full',
                          mask.used
                            ? 'bg-yellow-500'
                            : 'border bg-transparent',
                        ].join(' ')}
                        style={mask.used ? {} : { borderColor: 'var(--graphite-700)' }}
                      />
                      <span
                        className={[
                          'font-serif text-sm',
                          mask.used ? 'text-yellow-300' : 'text-graphite-600',
                        ].join(' ')}
                      >
                        {mask.name}
                      </span>
                      {mask.used && (
                        <span className="ml-auto font-sc text-[10px] text-yellow-700">
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
        <div
          className="mt-8 flex h-48 items-center justify-center rounded-lg border border-dashed"
          style={{ borderColor: 'var(--graphite-700)', backgroundColor: 'rgba(30,30,34,0.3)' }}
        >
          <p className="font-serif text-xs italic text-graphite-700">
            No portrait available
          </p>
        </div>
      )}
      {character.imageUrl && (
        <div
          className="mt-8 overflow-hidden rounded-lg"
          style={{ border: '1px solid var(--graphite-700)' }}
        >
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
