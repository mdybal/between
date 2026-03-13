import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Eye, HelpCircle } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { threats } from '@/data/threats'
import { sessions } from '@/data/sessions'
import type { ThreatLevel } from '@/types'

const threatLevelVariant: Record<ThreatLevel, 'muted' | 'amber' | 'red' | 'red'> = {
  minor: 'muted',
  moderate: 'amber',
  severe: 'red',
  catastrophic: 'red',
}

const threatLevelLabel: Record<ThreatLevel, string> = {
  minor: 'Minor Threat',
  moderate: 'Moderate Threat',
  severe: 'Severe Threat',
  catastrophic: '⚠ Catastrophic Threat',
}

export default function ThreatDetailPage() {
  const { id } = useParams<{ id: string }>()
  const threat = threats.find((t) => t.id === id)

  if (!threat) return <Navigate to="/threats" replace />

  const firstSession = threat.firstEncountered
    ? sessions.find((s) => s.id === threat.firstEncountered)
    : null

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      {/* Back link */}
      <div className="pt-8">
        <Link
          to="/threats"
          className="inline-flex items-center gap-2 font-sc text-sm text-graphite-500 transition-colors hover:text-amber-600"
        >
          <ArrowLeft size={14} />
          All Threats
        </Link>
      </div>

      {/* Header */}
      <header
        className="mt-6 pb-8"
        style={{ borderBottom: '1px solid rgba(150,30,30,0.2)' }}
      >
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant={threatLevelVariant[threat.threatLevel]}>
            {threatLevelLabel[threat.threatLevel]}
          </Badge>
          <Badge variant="muted">{threat.type}</Badge>
          <Badge
            variant={
              threat.status === 'active'
                ? 'red'
                : threat.status === 'neutralised'
                  ? 'green'
                  : 'muted'
            }
          >
            {threat.status}
          </Badge>
        </div>

        <h1 className="nouveau-heading font-display text-3xl font-bold text-red-400 md:text-4xl">
          {threat.name}
        </h1>

        {firstSession && (
          <p className="mt-3 font-sc text-xs text-graphite-600">
            First encountered:{' '}
            <Link
              to={`/actual-plays/${firstSession.id}`}
              className="text-amber-700 hover:text-amber-500 transition-colors"
            >
              Session {firstSession.sessionNumber}: {firstSession.title}
            </Link>
          </p>
        )}
      </header>

      {/* Description */}
      <section className="mt-8">
        <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
          Overview
        </h2>
        <p className="font-serif text-base leading-loose text-graphite-200">
          {threat.description}
        </p>
      </section>

      {/* Known Facts */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xs uppercase tracking-widest text-graphite-500">
          <Eye size={12} className="text-amber-700" />
          Known Facts
        </h2>
        <ul className="space-y-3">
          {threat.knownFacts.map((fact, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 shrink-0 text-amber-700">✦</span>
              <span className="font-serif text-sm leading-loose text-graphite-300">{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Suspicions */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xs uppercase tracking-widest text-graphite-500">
          <HelpCircle size={12} className="text-red-800" />
          Suspicions & Theories
        </h2>
        <ul className="space-y-3">
          {threat.suspicions.map((suspicion, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 shrink-0 text-red-900">?</span>
              <span className="font-serif text-sm italic leading-loose text-graphite-500">
                {suspicion}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
