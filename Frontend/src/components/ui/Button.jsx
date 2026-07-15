import { Loader2 } from 'lucide-react'
import { cn } from '@/utils'

/**
 * Button component with primary / ghost / danger / success variants.
 * Supports left icon, right icon, and loading state.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...rest
}) {
  const base = [
    'inline-flex items-center justify-center font-semibold rounded-xl',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none',
    'select-none',
  ].join(' ')

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 to-blue-600 text-white border border-blue-500/30 ' +
      'hover:from-blue-400 hover:to-blue-500 hover:shadow-glow-blue active:scale-[0.97] ' +
      'shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]',
    ghost:
      'glass border border-white/10 text-zinc-400 ' +
      'hover:text-white hover:bg-white/[0.07] hover:border-white/20 active:scale-[0.97]',
    danger:
      'bg-red-500/15 border border-red-500/25 text-red-400 ' +
      'hover:bg-red-500/25 hover:border-red-500/40 active:scale-[0.97]',
    success:
      'bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 ' +
      'hover:bg-emerald-500/25 hover:border-emerald-500/40 active:scale-[0.97]',
    outline:
      'bg-transparent border border-white/15 text-white ' +
      'hover:bg-white/5 hover:border-white/25 active:scale-[0.97]',
  }

  const sizes = {
    xs: 'px-2.5 py-1 text-[11px] gap-1 rounded-lg',
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-4.5 py-2 text-sm gap-2',
    lg: 'px-6 py-2.5 text-sm gap-2',
    xl: 'px-8 py-3 text-base gap-2.5',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
