import { Suspense } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Users, Star } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { sessions } from '@/data/sessions'
import { sessionsPl } from '@/data/sessions_pl'
import { sessionContentRegistry } from '@/sessions/registry'
import { sessionContentRegistryPl } from '@/sessions/registry_pl'
import { useLanguage } from '@/i18n/LanguageContext'

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lang, t } = useLanguage()

  const activeSessions = lang === 'pl' ? sessionsPl : sessions
  const activeRegistry = lang === 'pl' ? sessionContentRegistryPl : sessionContentRegistry

  const session = activeSessions.find((s) => s.id === id)

  if (!session) return <Navigate to="/actual-plays" replace />

  const SessionContent = id ? activeRegistry[id] : undefined

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      {/* Back link */}
      <div className="pt-8">
        <Link
          to="/actual-plays"
          className="inline-flex items-center gap-2 font-sc text-sm text-graphite-500 transition-colors hover:text-amber-600"
        >
          <ArrowLeft size={14} />
          {t.sessionDetail.backLink}
        </Link>
      </div>

      {/* Header */}
      <header
        className="mt-6 pb-8"
        style={{ borderBottom: '1px solid rgba(180,120,40,0.18)' }}
      >
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="font-sc text-xs uppercase tracking-widest text-amber-700">
            {t.sessionDetail.session} {session.sessionNumber}
          </span>
          <span className="flex items-center gap-1 font-sc text-xs text-graphite-600">
            <Calendar size={11} />
            {new Date(session.date).toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="nouveau-heading font-display text-3xl font-bold text-amber-600 md:text-4xl">
          {session.title}
        </h1>

        {/* Players */}
        {session.players && session.players.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Users size={13} className="text-graphite-600" />
            {session.players.map((p) => (
              <Badge key={p} variant="muted">
                {p}
              </Badge>
            ))}
          </div>
        )}

        {/* Tags */}
        {session.tags && session.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {session.tags.map((tag) => (
              <Badge key={tag} variant="amber">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* ── Custom session content (from src/sessions/session-XX.tsx) ── */}
      {SessionContent ? (
        <div className="mt-8">
          <Suspense
            fallback={
              <p className="font-serif text-sm italic text-graphite-600 py-8 text-center">
                {t.sessionDetail.loading}
              </p>
            }
          >
            <SessionContent />
          </Suspense>
        </div>
      ) : (
        /* Fallback: render the plain data from sessions.ts if no custom file exists yet */
        <div className="mt-8 space-y-8">
          {/* Summary */}
          <section>
            <h2 className="mb-4 font-display text-xs uppercase tracking-widest text-graphite-500">
              {t.sessionDetail.summaryHeading}
            </h2>
            <p className="font-serif text-base leading-loose text-graphite-200">
              {session.summary}
            </p>
          </section>

          {/* Highlights */}
          {session.highlights.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 font-display text-xs uppercase tracking-widest text-graphite-500">
                <Star size={12} className="text-amber-700" />
                {t.sessionDetail.keyMomentsHeading}
              </h2>
              <ul className="space-y-3">
                {session.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 shrink-0 text-amber-700">✦</span>
                    <span className="font-serif text-sm leading-loose text-graphite-300">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {/* Navigation between sessions */}
      <nav
        className="mt-12 flex justify-between pt-6"
        style={{ borderTop: '1px solid var(--graphite-700)' }}
      >
        {(() => {
          const prev = activeSessions.find((s) => s.sessionNumber === session.sessionNumber - 1)
          const next = activeSessions.find((s) => s.sessionNumber === session.sessionNumber + 1)
          return (
            <>
              <div>
                {prev && (
                  <Link
                    to={`/actual-plays/${prev.id}`}
                    className="group flex flex-col font-serif text-sm"
                  >
                    <span className="text-xs text-graphite-600">{t.sessionDetail.previous}</span>
                    <span className="text-graphite-400 transition-colors group-hover:text-amber-600">
                      {t.sessionDetail.session} {prev.sessionNumber}: {prev.title}
                    </span>
                  </Link>
                )}
              </div>
              <div className="text-right">
                {next && (
                  <Link
                    to={`/actual-plays/${next.id}`}
                    className="group flex flex-col font-serif text-sm"
                  >
                    <span className="text-xs text-graphite-600">{t.sessionDetail.next}</span>
                    <span className="text-graphite-400 transition-colors group-hover:text-amber-600">
                      {t.sessionDetail.session} {next.sessionNumber}: {next.title}
                    </span>
                  </Link>
                )}
              </div>
            </>
          )
        })()}
      </nav>
    </div>
  )
}
