export default function Footer() {
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
        ✦ &nbsp; The Between &nbsp; · &nbsp; A Victorian TTRPG Campaign &nbsp; ✦
      </p>
      <p className="mt-1 font-serif text-xs text-graphite-600 italic">
        London, 1893
      </p>
    </footer>
  )
}
