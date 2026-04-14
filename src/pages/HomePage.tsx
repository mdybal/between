import { Link } from 'react-router-dom'
import { BookOpen, Users, Skull, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'
import { getCharactersEn } from '@/data/characters_en'
import { getCharactersPl } from '@/data/characters_pl'
import { getThreatsEn } from '@/data/threats_en'
import { getThreatsPl } from '@/data/threats_pl'
import type { Session } from '@/types'

const sessionModules = import.meta.glob('@/data/sessions/session-*.ts', { eager: true })

const sessions: Session[] = Object.values(sessionModules)
  .map((module) => {
    const mod = module as Record<string, unknown>
    // Handle both default exports and named exports
    if (mod.default) return mod.default as Session
    // For named exports like session01, session02, etc.
    const keys = Object.keys(mod).filter(k => k.startsWith('session'))
    return mod[keys[0]] as Session
  })

export default function HomePage() {
  const { lang, t } = useLanguage()

  // For now, sessions are only in English (same data for both languages)
  const activeSessions = sessions
  const activeCharacters = lang === 'pl' ? getCharactersPl() : getCharactersEn()
  const activeThreats = lang === 'pl' ? getThreatsPl() : getThreatsEn()

  const latestSession = activeSessions.at(-1)

  const sections = [
    {
      to: '/actual-plays',
      icon: BookOpen,
      label: t.home.sections.actualPlays.label,
      description: t.home.sections.actualPlays.description,
      count: activeSessions.length,
      countLabel: t.home.sections.actualPlays.countLabel,
    },
    {
      to: '/characters',
      icon: Users,
      label: t.home.sections.characters.label,
      description: t.home.sections.characters.description,
      count: activeCharacters.length,
      countLabel: t.home.sections.characters.countLabel,
    },
    {
      to: '/threats',
      icon: Skull,
      label: t.home.sections.threats.label,
      description: t.home.sections.threats.description,
      count: activeThreats.length,
      countLabel: t.home.sections.threats.countLabel,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10">
      {/* Hero */}
      <section className="relative flex flex-col items-center py-5 text-center">
        <p className="relative font-sc text-xs uppercase tracking-[0.4em] text-amber-600/70">
          {t.home.eyebrow}
        </p>
        <h1 className="nouveau-heading relative mt-2 font-display text-6xl font-bold tracking-widest text-amber-600 md:text-8xl">
          THE BETWEEN
        </h1>
        {/* Art Nouveau ornamental divider */}
        <div className="relative mx-auto mt-1 nouveau-divider max-w-sm" />
        <p className="relative max-w-2xl font-serif text-base leading-loose text-graphite-300 md:text-base">
          {t.home.intro}
        </p>
      </section>
      <div className="mx-auto nouveau-divider max-w-sm " />
      {/* Latest Session Banner */}
      {latestSession && (
        <section className="mb-5">
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
                  {t.home.latestSession}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold text-amber-600 group-hover:text-amber-200 transition-colors">
                  {t.actualPlays.session} {latestSession.sessionNumber}: {latestSession.title}
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
      <div className="mx-auto nouveau-divider max-w-sm " />
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
    </div>
  )
}
