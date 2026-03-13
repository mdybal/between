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
            className="art-card group block rounded-lg p-6 transition-all"
            style={{
              border: '1px solid var(--graphite-700)',
              backgroundColor: 'rgba(30,30,34,0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(180,120,40,0.35)'
              e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.8)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--graphite-700)'
              e.currentTarget.style.backgroundColor = 'rgba(30,30,34,0.5)'
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Session number + date */}
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="font-sc text-xs uppercase tracking-widest text-amber-700">
                    Session {session.sessionNumber}
                  </span>
                  <span className="flex items-center gap-1 font-sc text-xs text-graphite-600">
                    <Calendar size={11} />
                    {new Date(session.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Title */}
                <h2 className="mt-1 font-display text-xl font-semibold text-amber-600 group-hover:text-amber-200 transition-colors">
                  {session.title}
                </h2>

                {/* Summary */}
                <p className="mt-2 line-clamp-2 font-serif text-sm leading-loose text-graphite-500">
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
          <p className="font-serif text-graphite-600 italic">
            The chronicles have yet to be written…
          </p>
        </div>
      )}
    </div>
  )
}
