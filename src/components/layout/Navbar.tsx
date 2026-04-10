import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/i18n/LanguageContext'
import type { Lang } from '@/i18n/translations'

function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  const btn = (code: Lang, label: string) => (
    <button
      key={code}
      onClick={() => setLang(code)}
      className={cn(
        'font-sc text-xs tracking-widest transition-colors duration-200',
        lang === code
          ? 'text-amber-600'
          : 'text-graphite-500 hover:text-graphite-300',
      )}
      aria-pressed={lang === code}
    >
      {label}
    </button>
  )

  return (
    <div className="flex items-center gap-1.5 rounded border px-2 py-1"
      style={{ borderColor: 'rgba(180,120,40,0.2)', backgroundColor: 'rgba(30,30,34,0.4)' }}
    >
      {btn('en', 'EN')}
      <span className="text-graphite-700 text-xs select-none">|</span>
      {btn('pl', 'PL')}
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/actual-plays', label: t.nav.actualPlays },
    { to: '/characters', label: t.nav.characters },
    { to: '/threats', label: t.nav.threats },
    { to: '/map', label: t.nav.map },
  ]

  return (
    <header
      className="nouveau-nav-border sticky top-0 z-[2000] backdrop-blur-sm"
      style={{
        backgroundColor: 'rgba(22, 22, 26, 0.92)',
        borderBottom: '1px solid rgba(180, 120, 40, 0.2)',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <NavLink to="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-sc text-xs uppercase tracking-[0.3em] text-amber-600/70">
            The
          </span>
          <span className="font-display text-xl font-bold tracking-widest text-amber-600">
            BETWEEN
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'font-sc text-sm tracking-wide transition-colors duration-200',
                  isActive
                    ? 'text-amber-600'
                    : 'text-graphite-300 hover:text-amber-600',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop: language toggle + mobile hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            className="text-graphite-400 hover:text-amber-600 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.toggleMenu}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          className="px-4 pb-4 md:hidden"
          style={{
            backgroundColor: 'var(--graphite-950)',
            borderTop: '1px solid rgba(180, 120, 40, 0.15)',
          }}
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block py-2 font-sc text-sm tracking-wide transition-colors',
                  isActive ? 'text-amber-600' : 'text-graphite-300 hover:text-amber-600',
                )
              }
            >
              {label}
            </NavLink>
          ))}
          {/* Language toggle in mobile menu */}
          <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(180,120,40,0.15)' }}>
            <LanguageToggle />
          </div>
        </nav>
      )}
    </header>
  )
}
