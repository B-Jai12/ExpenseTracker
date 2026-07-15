import { cn } from '@/utils'

/**
 * Input component with label, icon, error state, and optional hint text.
 * Focus state uses a subtle blue glow matching the FinFlow design system.
 */
export function Input({
  label,
  error,
  hint,
  icon,
  rightElement,
  className,
  id,
  containerClassName,
  ...rest
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={cn('space-y-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none z-10">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full rounded-xl bg-white/[0.04] text-sm text-white placeholder-zinc-600',
            'border transition-all duration-200',
            'focus:outline-none',
            icon ? 'pl-9' : 'pl-3.5',
            rightElement ? 'pr-10' : 'pr-3.5',
            'py-2.5',
            error
              ? 'border-red-500/50 focus:border-red-500/70 focus:bg-red-500/5 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.10)]'
              : 'border-white/[0.08] focus:border-blue-500/40 focus:bg-blue-500/[0.03] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.10)]',
            className
          )}
          {...rest}
        />
        {rightElement && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 z-10">
            {rightElement}
          </span>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-[11px] text-zinc-600">{hint}</p>
      )}
    </div>
  )
}
