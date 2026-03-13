import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export default function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn('nouveau-page-header py-14 text-center', className)}>
      {subtitle && (
        <p className="mb-2 font-sc text-xs tracking-[0.4em] uppercase text-graphite-400">
          {subtitle}
        </p>
      )}
      <h1 className="nouveau-heading font-display text-4xl font-bold tracking-widest text-amber-600 md:text-5xl">
        {title}
      </h1>
      {/* Art Nouveau ornamental divider */}
      <div className="mx-auto mt-8 nouveau-divider max-w-sm" />
    </div>
  )
}
