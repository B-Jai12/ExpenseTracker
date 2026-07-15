import { cn } from '@/utils'

const variants = {
  default:  'bg-white/8 text-zinc-300 border-white/10',
  blue:     'bg-blue-500/15 text-blue-400 border-blue-500/20',
  green:    'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  red:      'bg-red-500/15 text-red-400 border-red-500/20',
  yellow:   'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  purple:   'bg-purple-500/15 text-purple-400 border-purple-500/20',
  cyan:     'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
  orange:   'bg-orange-500/15 text-orange-400 border-orange-500/20',
}

/**
 * Badge — compact pill for statuses, counts, and labels.
 */
export function Badge({ children, variant = 'default', className, dot = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full',
        'text-[10px] font-bold uppercase tracking-wider border',
        variants[variant],
        className
      )}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', {
            'bg-blue-400':    variant === 'blue',
            'bg-emerald-400': variant === 'green',
            'bg-red-400':     variant === 'red',
            'bg-yellow-400':  variant === 'yellow',
            'bg-purple-400':  variant === 'purple',
            'bg-cyan-400':    variant === 'cyan',
            'bg-orange-400':  variant === 'orange',
            'bg-zinc-400':    variant === 'default',
          })}
        />
      )}
      {children}
    </span>
  )
}
