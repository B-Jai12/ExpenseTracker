import { cn } from '@/utils'

/**
 * PageHeader — consistent page title + subtitle + optional actions row.
 * Used at the top of every page for visual consistency.
 */
export function PageHeader({ title, subtitle, children, className }) {
  return (
    <div className={cn('flex items-start justify-between flex-wrap gap-3 mb-5', className)}>
      <div>
        <h1 className="text-xl font-bold text-white font-display tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-zinc-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2 shrink-0">
          {children}
        </div>
      )}
    </div>
  )
}
