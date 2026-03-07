import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/actual-plays', label: 'Actual Plays' },
  { to: '/characters', label: 'Characters' },
  { to: '/threats', label: 'Threats & Masterminds' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/30 bg-stone-950/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <NavLink to="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-serif text-xs uppercase tracking-[0.3em] text-amber-600/70">
            The
          </span>
          <span className="font-serif text-xl font-bold tracking-widest text-amber-400">
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
                  'font-serif text-sm tracking-wide transition-colors duration-200',
                  isActive
                    ? 'text-amber-400'
                    : 'text-stone-400 hover:text-amber-300',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="text-stone-400 hover:text-amber-400 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-amber-900/20 bg-stone-950 px-4 pb-4 md:hidden">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'block py-2 font-serif text-sm tracking-wide transition-colors',
                  isActive ? 'text-amber-400' : 'text-stone-400 hover:text-amber-300',
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
