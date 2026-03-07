import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Users, Star } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import { sessions } from '@/data/sessions'

export default function SessionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const session = sessions.find((s) => s.id === id)

  if (!session) return <Navigate to="/actual-plays" replace />

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16">
      {/* Back link */}
      <div className="pt-8">
        <Link
          to="/actual-plays"
          className="inline-flex items-center gap-2 font-serif text-sm text-stone-500 transition-colors hover:text-amber-400"
        >
          <ArrowLeft size={14} />
          All Sessions
        </Link>
      </div>

      {/* Header */}
      <header className="mt-6 border-b border-amber-900/20 pb-8">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="font-serif text-xs uppercase tracking-widest text-amber-700">
            Session {session.sessionNumber}
          </span>
          <span className="flex items-center gap-1 font-serif text-xs text-stone-600">
            <Calendar size={11} />
            {new Date(session.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>

        <h1 className="font-serif text-3xl font-bold text-amber-400 md:text-4xl">
          {session.title}
        </h1>

        {/* Players */}
        {session.players && session.players.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Users size={13} className="text-stone-600" />
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

      {/* Summary */}
      <section className="mt-8">
        <h2 className="mb-4 font-serif text-xs uppercase tracking-widest text-stone-500">
          Session Summary
        </h2>
        <p className="font-serif text-base leading-relaxed text-stone-300">
          {session.summary}
        </p>
      </section>

      {/* Highlights */}
      {session.highlights.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-xs uppercase tracking-widest text-stone-500">
            <Star size={12} className="text-amber-700" />
            Key Moments
          </h2>
          <ul className="space-y-3">
            {session.highlights.map((highlight, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 shrink-0 text-amber-700">✦</span>
                <span className="font-serif text-sm leading-relaxed text-stone-400">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Navigation between sessions */}
      <nav className="mt-12 flex justify-between border-t border-stone-800 pt-6">
        {(() => {
          const prev = sessions.find((s) => s.sessionNumber === session.sessionNumber - 1)
          const next = sessions.find((s) => s.sessionNumber === session.sessionNumber + 1)
          return (
            <>
              <div>
                {prev && (
                  <Link
                    to={`/actual-plays/${prev.id}`}
                    className="group flex flex-col font-serif text-sm"
                  >
                    <span className="text-xs text-stone-600">← Previous</span>
                    <span className="text-stone-400 transition-colors group-hover:text-amber-400">
                      Session {prev.sessionNumber}: {prev.title}
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
                    <span className="text-xs text-stone-600">Next →</span>
                    <span className="text-stone-400 transition-colors group-hover:text-amber-400">
                      Session {next.sessionNumber}: {next.title}
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
