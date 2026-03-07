import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import { threats } from '@/data/threats'
import type { ThreatLevel } from '@/types'
import { cn } from '@/lib/utils'

const threatLevelVariant: Record<ThreatLevel, 'muted' | 'amber' | 'red' | 'red'> = {
  minor: 'muted',
  moderate: 'amber',
  severe: 'red',
  catastrophic: 'red',
}

const threatLevelLabel: Record<ThreatLevel, string> = {
  minor: 'Minor',
  moderate: 'Moderate',
  severe: 'Severe',
  catastrophic: '⚠ Catastrophic',
}

const typeFilters = [
  { value: 'all', label: 'All' },
  { value: 'mastermind', label: 'Masterminds' },
  { value: 'cult', label: 'Cults' },
  { value: 'creature', label: 'Creatures' },
  { value: 'conspiracy', label: 'Conspiracies' },
  { value: 'supernatural', label: 'Supernatural' },
] as const

type FilterValue = (typeof typeFilters)[number]['value']

export default function ThreatsPage() {
  const [filter, setFilter] = useState<FilterValue>('all')

  const filtered = filter === 'all' ? threats : threats.filter((t) => t.type === filter)

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <PageHeader title="Threats & Masterminds" subtitle="Known Dangers to the Investigation" />

      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {typeFilters.map(({ value, label }) => (
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

      <div className="space-y-4">
        {filtered.map((threat) => (
          <Link
            key={threat.id}
            to={`/threats/${threat.id}`}
            className="group block rounded-lg border border-stone-800 bg-stone-900/40 p-6 transition-all hover:border-red-900/40 hover:bg-stone-900/70"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant={threatLevelVariant[threat.threatLevel]}>
                    {threatLevelLabel[threat.threatLevel]}
                  </Badge>
                  <Badge variant="muted">{threat.type}</Badge>
                  <Badge variant={threat.status === 'active' ? 'red' : threat.status === 'neutralised' ? 'green' : 'muted'}>
                    {threat.status}
                  </Badge>
                </div>

                <h2 className="font-serif text-xl font-semibold text-stone-200 transition-colors group-hover:text-red-300">
                  {threat.name}
                </h2>

                <p className="mt-2 line-clamp-2 font-serif text-sm leading-relaxed text-stone-500">
                  {threat.description}
                </p>

                <p className="mt-3 font-serif text-xs text-stone-600">
                  {threat.knownFacts.length} known facts · {threat.suspicions.length} suspicions
                </p>
              </div>

              <ChevronRight
                size={18}
                className="mt-1 shrink-0 text-red-900/60 transition-transform group-hover:translate-x-1 group-hover:text-red-700"
              />
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <AlertTriangle size={24} className="mx-auto mb-3 text-stone-700" />
          <p className="font-serif text-stone-600 italic">No threats identified in this category.</p>
        </div>
      )}
    </div>
  )
}
