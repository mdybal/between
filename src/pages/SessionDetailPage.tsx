import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import CharacterCard from '@/components/ui/CharacterCard'
import { SessionContentRenderer } from '@/components/session/SessionContentRenderer'
import { getCharactersEn } from '@/data/characters_en'
import { getCharactersPl } from '@/data/characters_pl'
import { getSessionsEn } from '@/data/sessions_en'
import { getSessionsPl } from '@/data/sessions_pl'
import { useLanguage } from '@/i18n/LanguageContext'

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lang, t } = useLanguage()

  const activeSessions = lang === 'pl' ? getSessionsPl() : getSessionsEn()
  const session = id ? activeSessions.find((s) => s.id === id) : undefined

  if (!session) return <Navigate to="/actual-plays" replace />

  // Get characters for NPC lookup
  const allCharacters = lang === 'pl' ? getCharactersPl() : getCharactersEn()
  const sessionNpcs = session.npcIds
    ? allCharacters.filter((c) => session.npcIds?.includes(c.id))
    : []

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

      {/* ── Custom session content from scenes ── */}
      {session.scenes && session.scenes.length > 0 ? (
        <div className="mt-8">
          <SessionContentRenderer scenes={session.scenes} />
        </div>
      ) : (
        /* Fallback: render the summary */
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="mb-4 font-display text-xs uppercase tracking-widest text-graphite-500">
              {t.sessionDetail.summaryHeading}
            </h2>
            <p className="font-serif text-base leading-loose text-graphite-200">
              {session.summary}
            </p>
          </section>
        </div>
      )}

      {/* ── NPCs Section ── */}
      {sessionNpcs.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 font-display text-xs uppercase tracking-widest text-graphite-500">
            {t.sessionDetail.npcsHeading}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {sessionNpcs.map((npc) => (
              <CharacterCard key={npc.id} character={npc} />
            ))}
          </div>
        </section>
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
