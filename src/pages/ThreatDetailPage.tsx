import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Eye, HelpCircle } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { getSessionsEn } from '@/data/sessions_en'
import { getSessionsPl } from '@/data/sessions_pl'
import { getThreatsEn } from '@/data/threats_en'
import { getThreatsPl } from '@/data/threats_pl'
import { cn } from '@/lib/utils'
import { getThreatLevelStyle } from '@/lib/threatUtils'
import { useLanguage } from '@/i18n/LanguageContext'

export default function ThreatDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lang, t } = useLanguage()

  const activeThreats = lang === 'pl' ? getThreatsPl() : getThreatsEn()
  const activeSessions = lang === 'pl' ? getSessionsPl() : getSessionsEn()

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
          <Badge
            variant={
              threat.status === 'active'
                ? 'red'
                : threat.status === 'neutralised'
                  ? 'muted'
                  : 'muted'
            }
          >
            {t.threats.statusLabels[threat.status]}
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
      {threat.knownFacts && threat.knownFacts.length > 0 && (
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
      )}

      {/* Questions */}
      <section className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-display text-xs uppercase tracking-widest text-graphite-500">
          <HelpCircle size={12} className="text-red-800" />
          {t.threatDetail.questions}
        </h2>
        <ul className="space-y-4">
          {threat.questions.map((q, i) => (
            <li key={i} className="flex flex-col gap-2">
              <div className="flex gap-3">
                <span className="mt-1 shrink-0 text-red-900">?</span>
                <span className={q.answer ? 'font-serif text-sm italic leading-loose text-emerald-400' : 'font-serif text-sm italic leading-loose text-graphite-500'}>
                  {q.question}
                </span>
              </div>
              {q.answer && (
                <div className="ml-6 flex gap-3">
                  <span className="mt-1 shrink-0 text-emerald-600">✓</span>
                  <div className="flex flex-col gap-1">
                    <span className="font-sc text-xs uppercase tracking-wide text-emerald-600">{t.threatDetail.answer}</span>
                    <span className="font-serif text-sm leading-loose text-emerald-300">{q.answer}</span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Mask Section */}
      {threat.mask && (
        <section
          className="mt-10 rounded-lg p-6"
          style={{
            backgroundColor: 'rgba(40, 38, 34, 0.7)',
            border: '1px solid rgba(180, 150, 60, 0.3)',
          }}
        >
          {/* Flourish Header */}
          <div className="mb-4 flex items-center gap-3">
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(180, 150, 60, 0.4))',
              }}
            />
            <div className="flex items-center gap-2 px-2 py-1">
              <img 
                src="/img/mask.svg" 
                alt="" 
                className="h-4 w-4" 
                style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(26%) saturate(667%) hue-rotate(3deg) brightness(97%) contrast(88%)' }}
              />
              <span className="font-display text-xs uppercase tracking-widest text-amber-600">
                {threat.mask.title}
              </span>
              <img 
                src="/img/mask.svg" 
                alt="" 
                className="h-4 w-4" 
                style={{ filter: 'brightness(0) saturate(100%) invert(56%) sepia(26%) saturate(667%) hue-rotate(3deg) brightness(97%) contrast(88%)' }}
              />
            </div>
            <div
              className="h-px flex-1"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(180, 150, 60, 0.4))',
              }}
            />
          </div>
          <p className="font-serif text-sm leading-loose text-graphite-300 text-center">
            {threat.mask.description}
          </p>
        </section>
      )}

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
