import { useLanguage } from '@/i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer
      className="mt-auto py-8 text-center"
      style={{
        backgroundColor: 'var(--graphite-950)',
        borderTop: '1px solid rgba(180, 120, 40, 0.18)',
      }}
    >
      {/* Art Nouveau footer ornament */}
      <div className="nouveau-divider mx-auto max-w-xs mb-5" />
      <p className="font-sc text-xs tracking-widest text-graphite-500 uppercase">
        {t.footer.tagline}
      </p>
      <p className="mt-1 font-serif text-xs text-graphite-600 italic">
        {t.footer.location}
      </p>
    </footer>
  )
}
