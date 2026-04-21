import { useEffect, useState } from 'react'
import { Download, FileText, Loader2 } from 'lucide-react'
import { useLanguage } from '@/i18n/LanguageContext'

interface BlobFile {
  url: string
  filename: string
  size: number
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function DownloadPage() {
  const { t } = useLanguage()
  const [files, setFiles] = useState<BlobFile[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/blobs')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data: BlobFile[]) => setFiles(data))
      .catch(() => setError(t.download.empty))
  }, [t])

  return (
    <div className="mx-auto max-w-4xl px-4 pb-16">
      {/* Header */}
      <section className="py-8 text-center">
        <p className="font-sc text-xs uppercase tracking-[0.4em] text-amber-600/70">
          {t.download.subtitle}
        </p>
        <h1 className="nouveau-heading mt-2 font-display text-5xl font-bold tracking-widest text-amber-600 md:text-6xl">
          {t.download.title}
        </h1>
        <div className="nouveau-divider mx-auto mt-4 max-w-xs" />
        <p className="mx-auto mt-4 max-w-lg font-serif text-sm leading-loose text-graphite-400">
          {t.download.description}
        </p>
      </section>

      <div className="mx-auto nouveau-divider max-w-xs" />

      {/* Content */}
      <div className="mt-8">
        {error && (
          <p className="py-12 text-center font-serif text-graphite-500">{error}</p>
        )}

        {files === null && !error && (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={24} className="animate-spin text-amber-600" />
          </div>
        )}

        {files && files.length === 0 && (
          <p className="py-12 text-center font-serif text-graphite-500">
            {t.download.empty}
          </p>
        )}

        {files && files.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <a
                key={file.url}
                href={file.url}
                download={file.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="art-card group flex flex-col gap-3 rounded-lg p-5 transition-colors duration-200"
                style={{
                  border: '1px solid var(--graphite-700)',
                  backgroundColor: 'rgba(30, 30, 34, 0.5)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(180,120,40,0.4)'
                  e.currentTarget.style.backgroundColor = 'rgba(30, 30, 34, 0.85)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--graphite-700)'
                  e.currentTarget.style.backgroundColor = 'rgba(30, 30, 34, 0.5)'
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className="rounded p-2 shrink-0"
                    style={{
                      border: '1px solid rgba(180,120,40,0.3)',
                      backgroundColor: 'rgba(120,60,10,0.2)',
                    }}
                  >
                    <FileText size={18} className="text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-display text-sm font-semibold leading-snug text-amber-600 group-hover:text-amber-200 transition-colors truncate"
                      title={file.filename}
                    >
                      {file.filename}
                    </p>
                    <p className="mt-1 font-sc text-xs text-graphite-600">
                      {t.download.fileSize}: {formatBytes(file.size)}
                    </p>
                  </div>
                </div>

                <div
                  className="mt-1 flex items-center gap-1.5 pt-3"
                  style={{ borderTop: '1px solid var(--graphite-700)' }}
                >
                  <Download
                    size={13}
                    className="text-amber-700 group-hover:text-amber-400 transition-colors"
                  />
                  <span className="font-sc text-xs text-amber-700 group-hover:text-amber-400 transition-colors">
                    {t.download.download}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
