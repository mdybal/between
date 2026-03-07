import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { characters } from '@/data/characters'
import type { CharacterType } from '@/types'

const typeLabels: Record<CharacterType, string> = {
  player: 'Investigator',
  npc: 'NPC',
  ally: 'Ally',
  antagonist: 'Antagonist',
}

const typeBadgeVariant: Record<CharacterType, 'amber' | 'green' | 'muted' | 'red'> = {
  player: 'amber',
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

      {/* Traits */}
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
