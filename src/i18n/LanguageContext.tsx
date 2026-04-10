import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { translations } from './translations'
import type { Lang, Translations } from './translations'

// ─── Context ──────────────────────────────────────────────────────────────────

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem('lang')
    if (stored === 'en' || stored === 'pl') return stored
  } catch {
    // localStorage unavailable (SSR / private browsing edge cases)
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {
      // ignore
    }
  }, [])

  const value: LanguageContextValue = {
    lang,
    setLang,
    t: translations[lang] as Translations,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
