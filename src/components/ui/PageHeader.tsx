import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn('py-12 text-center', className)}>
      <h1 className="font-serif text-4xl font-bold tracking-widest text-amber-400 md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 font-serif text-sm tracking-widest text-stone-500 uppercase">
          {subtitle}
        </p>
      )}
      {/* Ornamental divider */}
      <div className="mx-auto mt-6 flex max-w-xs items-center gap-3">
        <div className="h-px flex-1 bg-amber-900/40" />
        <span className="text-amber-700 text-xs">✦</span>
        <div className="h-px flex-1 bg-amber-900/40" />
      </div>
    </div>
  )
}
