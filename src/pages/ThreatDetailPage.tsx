import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Eye, HelpCircle } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { threats } from '@/data/threats'
import { threatsPl } from '@/data/threats_pl'
import { sessions } from '@/data/sessions'
import { sessionsPl } from '@/data/sessions_pl'
import type { ThreatLevel } from '@/types'
import { useLanguage } from '@/i18n/LanguageContext'

const threatLevelVariant: Record<ThreatLevel, 'muted' | 'amber' | 'red' | 'red'> = {
  minor: 'muted',
  moderate: 'amber',
  severe: 'red',
  catastrophic: 'red',
}

export default function ThreatDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lang, t } = useLanguage()

  const activeThreats = lang === 'pl' ? threatsPl : threats
  const activeSessions = lang === 'pl' ? sessionsPl : sessions

  const threat = activeThreats.find((t) => t.id === id)

  if (!threat) return <Navigate to="/threats" replace />

  const firstSession = threat.firstEncountered
    ? activeSessions.find((s) => s.id === threat.firstEncountered)
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
          {t.threatDetail.backLink}
        </Link>
      </div>

      {/* Header */}
      <header
        className="mt-6 pb-8"
        style={{ borderBottom: '1px solid rgba(150,30,30,0.2)' }}
      >
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant={threatLevelVariant[threat.threatLevel]}>
            {t.threatDetail.threatLevelLabels[threat.threatLevel]}
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
            {t.threatDetail.firstEncountered}:{' '}
            <Link
              to={`/actual-plays/${firstSession.id}`}
              className="text-amber-700 hover:text-amber-500 transition-colors"
            >
              {t.sessionDetail.session} {firstSession.sessionNumber}: {firstSession.title}
            </Link>
          </p>
        )}
      </header>

      {/* Description */}
      <section className="mt-8">
        <h2 className="mb-3 font-display text-xs uppercase tracking-widest text-graphite-500">
          {t.threatDetail.overview}
        </h2>
        <p className="font-serif text-base leading-loose text-graphite-200">
          {threat.description}
        </p>
      </section>

      {/* Known Facts */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xs uppercase tracking-widest text-graphite-500">
          <Eye size={12} className="text-amber-700" />
          {t.threatDetail.knownFacts}
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
          {t.threatDetail.suspicions}
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

      {/* Clue Images */}
      {threat.clueImages && threat.clueImages.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xs uppercase tracking-widest text-graphite-500">
            {t.threatDetail.clues}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
            {threat.clueImages.map((filename, i) => (
              <div
                key={i}
                className="rounded bg-[#eacfa9] p-2"
                style={{ aspectRatio: '114 / 65' }}
              >
                <img
                  src={`/img/clues/${filename}`}
                  alt={`Clue ${i + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
