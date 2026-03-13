import { Link } from 'react-router-dom'
import { BookOpen, Users, Skull, ChevronRight } from 'lucide-react'
import { sessions } from '@/data/sessions'
import { characters } from '@/data/characters'
import { threats } from '@/data/threats'

const sections = [
  {
    to: '/actual-plays',
    icon: BookOpen,
    label: 'Actual Plays',
    description: 'Chronicles of each session — the discoveries, the horrors, and the moments that defined the investigation.',
    count: sessions.length,
    countLabel: 'sessions recorded',
  },
  {
    to: '/characters',
    icon: Users,
    label: 'Characters',
    description: 'The investigators, their allies, and the souls they have encountered in the fog-shrouded streets of London.',
    count: characters.length,
    countLabel: 'characters catalogued',
  },
  {
    to: '/threats',
    icon: Skull,
    label: 'Threats & Masterminds',
    description: 'The forces arrayed against the investigators — cults, conspiracies, and the shadowy figures who pull the strings.',
    count: threats.length,
    countLabel: 'threats identified',
  },
]

export default function HomePage() {
  const latestSession = sessions.at(-1)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      {/* Hero */}
      <section className="relative flex flex-col items-center py-24 text-center">
        {/* Atmospheric background glow */}
        {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(180,120,40,0.07)' }} />
        </div> */}

        <p className="relative font-sc text-xs uppercase tracking-[0.4em] text-amber-600/70">
          A Victorian TTRPG Campaign
        </p>
        <h1 className="nouveau-heading relative mt-4 font-display text-6xl font-bold tracking-widest text-amber-600 md:text-8xl">
          THE BETWEEN
        </h1>

        {/* Art Nouveau ornamental divider */}
        <div className="relative mx-auto mt-6 nouveau-divider max-w-sm" />

        <p className="relative mt-6 max-w-2xl font-serif text-base leading-loose text-graphite-300 md:text-lg">
          London, 1893. Beneath the gaslit streets and behind the velvet curtains of high society,
          something ancient stirs. A band of investigators stands between the city and the darkness
          that hungers for it.
        </p>
        <p className="relative mt-3 font-serif text-sm italic text-graphite-500">
          "The fog does not merely obscure — it conceals."
        </p>
      </section>

      {/* Latest Session Banner */}
      {latestSession && (
        <section className="mb-12">
          <Link
            to={`/actual-plays/${latestSession.id}`}
            className="art-card group block rounded-lg p-6 transition-colors"
            style={{
              border: '1px solid var(--graphite-700)',
              backgroundColor: 'rgba(30, 30, 34, 0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(180,120,40,0.4)'
              e.currentTarget.style.backgroundColor = 'rgba(30, 30, 34, 0.85)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--graphite-700)'
              e.currentTarget.style.backgroundColor = 'rgba(30, 30, 34, 0.5)'
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sc text-xs uppercase tracking-widest text-amber-600/70">
                  Latest Session
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-amber-600 group-hover:text-amber-200 transition-colors">
                  Session {latestSession.sessionNumber}: {latestSession.title}
                </h2>
                <p className="mt-2 line-clamp-2 font-serif text-sm leading-loose text-graphite-400">
                  {latestSession.summary}
                </p>
              </div>
              <ChevronRight
                size={20}
                className="mt-1 shrink-0 text-amber-700 transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>
        </section>
      )}

      {/* Section Cards */}
      <section className="grid gap-6 md:grid-cols-3">
        {sections.map(({ to, icon: Icon, label, description, count, countLabel }) => (
          <Link
            key={to}
            to={to}
            className="art-card group flex flex-col rounded-lg p-6 transition-all duration-200"
            style={{
              border: '1px solid var(--graphite-700)',
              backgroundColor: 'rgba(30, 30, 34, 0.5)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(180,120,40,0.4)'
              e.currentTarget.style.backgroundColor = 'rgba(30, 30, 34, 0.85)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--graphite-700)'
              e.currentTarget.style.backgroundColor = 'rgba(30, 30, 34, 0.5)'
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="rounded p-2"
                style={{
                  border: '1px solid rgba(180,120,40,0.3)',
                  backgroundColor: 'rgba(120,60,10,0.2)',
                }}
              >
                <Icon size={18} className="text-amber-500" />
              </div>
              <h3 className="mt-1 font-display text-xl font-semibold text-amber-600 group-hover:text-amber-200 transition-colors">
                {label}
              </h3>
            </div>
            <p className="flex-1 font-serif text-sm leading-loose text-graphite-500">
              {description}
            </p>
            <div
              className="mt-4 flex items-center justify-between pt-4"
              style={{ borderTop: '1px solid var(--graphite-700)' }}
            >
              <span className="font-sc text-xs text-graphite-600">
                {count} {countLabel}
              </span>
              <ChevronRight
                size={16}
                className="text-amber-800 transition-transform group-hover:translate-x-1 group-hover:text-amber-500"
              />
            </div>
          </Link>
        ))}
      </section>

      {/* Campaign Overview */}
      <section className="mt-16">
        <div className="mx-auto nouveau-divider max-w-sm mb-10" />
        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="parchment rounded-lg p-6"
          >
            <h3 className="mb-3 font-display text-base font-semibold text-amber-600">
              The Setting
            </h3>
            <p className="font-serif text-sm leading-loose text-graphite-300">
              Victorian London at the height of the Empire — a city of gaslight and shadow, of
              scientific progress and ancient superstition. The Between is a horror TTRPG that
              places investigators at the intersection of the rational and the unknowable.
            </p>
          </div>
          <div
            className="parchment rounded-lg p-6"
          >
            <h3 className="mb-3 font-display text-base font-semibold text-amber-600">
              The System
            </h3>
            <p className="font-serif text-sm leading-loose text-graphite-300">
              <em>The Between</em> is a Powered by the Apocalypse game designed by Jason Morningstar,
              focused on collaborative horror storytelling. Players take on the roles of investigators
              drawn into a web of supernatural conspiracy in 1890s London.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
