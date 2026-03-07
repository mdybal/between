import { Link } from 'react-router-dom'
import { Calendar, ChevronRight } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import { sessions } from '@/data/sessions'

export default function ActualPlaysPage() {
  const sorted = [...sessions].sort((a, b) => b.sessionNumber - a.sessionNumber)

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      <PageHeader
        title="Actual Plays"
        subtitle="Chronicles of the Investigation"
      />

      <div className="space-y-4">
        {sorted.map((session) => (
          <Link
            key={session.id}
            to={`/actual-plays/${session.id}`}
            className="group block rounded-lg border border-stone-800 bg-stone-900/40 p-6 transition-all hover:border-amber-800/40 hover:bg-stone-900/70"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Session number + date */}
                <div className="mb-2 flex flex-wrap items-center gap-3">
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

                {/* Title */}
                <h2 className="font-serif text-xl font-semibold text-stone-200 transition-colors group-hover:text-amber-300">
                  {session.title}
                </h2>

                {/* Summary */}
                <p className="mt-2 line-clamp-2 font-serif text-sm leading-relaxed text-stone-500">
                  {session.summary}
                </p>

                {/* Tags */}
                {session.tags && session.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {session.tags.map((tag) => (
                      <Badge key={tag} variant="muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <ChevronRight
                size={18}
                className="mt-1 shrink-0 text-amber-900 transition-transform group-hover:translate-x-1 group-hover:text-amber-600"
              />
            </div>
          </Link>
        ))}
      </div>

      {sessions.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-stone-600 italic">
            The chronicles have yet to be written…
          </p>
        </div>
      )}
    </div>
  )
}
