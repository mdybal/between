import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, AlertTriangle } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import { getThreatsEn } from '@/data/threats_en'
import { getThreatsPl } from '@/data/threats_pl'
import { cn } from '@/lib/utils'
import { getThreatLevelStyle } from '@/lib/threatUtils'
import { useLanguage } from '@/i18n/LanguageContext'

type FilterValue = 'all' | 'mastermind' | 'threat'
export default function ThreatsPage() {
  const [filter, setFilter] = useState<FilterValue>('all')
  const { lang, t } = useLanguage()

  const activeThreats = lang === 'pl' ? getThreatsPl() : getThreatsEn()

  const typeFilters: { value: FilterValue; label: string }[] = [
    { value: 'all', label: t.threats.filters.all },
    { value: 'mastermind', label: t.threats.filters.mastermind },
    { value: 'threat', label: t.threats.filters.threat },
  ]

  const filtered = filter === 'all' ? activeThreats : activeThreats.filter((t) => t.type === filter)

  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <PageHeader title={t.threats.title} subtitle={t.threats.subtitle} />

      {/* Filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {typeFilters.map(({ value, label }) => (
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

      <div className="space-y-4">
        {filtered.map((threat) => (
          <Link
            key={threat.id}
            to={`/threats/${threat.id}`}
            className="art-card group block rounded-lg p-6 transition-all"
            style={{
              border: '1px solid var(--graphite-700)',
              backgroundColor: 'rgba(30,30,34,0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(150,30,30,0.4)'
              e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.8)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--graphite-700)'
              e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.5)'
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {(() => {
                    const { colorClass, circles } = getThreatLevelStyle(threat.threatLevel)
                    if (!circles) return null
                    return (
                      <span
                        className={cn(
                          'rounded border px-2 py-0.5 font-sc text-xs tracking-wide',
                          colorClass,
                          colorClass === 'text-red-400'
                            ? 'border-red-800/50 bg-rgba(100, 20, 20, 0.25)'
                            : colorClass === 'text-amber-500'
                              ? 'border-amber-800/50 bg-rgba(120, 60, 10, 0.25)'
                              : 'border-emerald-800/50 bg-rgba(10, 80, 40, 0.25)',
                        )}
                      >
                        {circles}
                      </span>
                    )
                  })()}
                  <Badge variant={threat.type === 'mastermind' ? 'red' : 'amber'}>
                    {t.threats.typeLabels[threat.type]}
                  </Badge>
                  <Badge variant={threat.status === 'active' ? 'red' : threat.status === 'neutralised' ? 'muted' : 'muted'}>
                    {t.threats.statusLabels[threat.status]}
                  </Badge>
                </div>

                <h2 className="font-display text-xl font-semibold text-graphite-200 transition-colors group-hover:text-red-300">
                  {threat.name}
                </h2>

                <p className="mt-2 line-clamp-2 font-serif text-sm leading-loose text-graphite-500">
                  {threat.description}
                </p>

                <p className="mt-3 font-sc text-xs text-graphite-600">
                  {threat.knownFacts.length} {t.threats.knownFacts} · {threat.suspicions.length} {t.threats.suspicions}
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
          <AlertTriangle size={24} className="mx-auto mb-3 text-graphite-700" />
          <p className="font-serif text-graphite-600 italic">{t.threats.empty}</p>
        </div>
      )}
    </div>
  )
}
