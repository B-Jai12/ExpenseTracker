import { cn } from '@/utils'
import { motion } from 'framer-motion'

const glowMap = {
  none:   '',
  blue:   'hover:shadow-glow-blue hover:border-blue-500/20',
  green:  'hover:shadow-glow-green hover:border-emerald-500/20',
  purple: 'hover:shadow-glow-purple hover:border-purple-500/20',
  cyan:   'hover:shadow-glow-cyan hover:border-cyan-500/20',
}

/**
 * GlassCard — the primary surface component for FinFlow.
 * Supports hover animations, glow effects, optional motion wrapping,
 * and noPad for full-bleed card content.
 */
export function GlassCard({
  children,
  className,
  glow = 'none',
  hover = false,
  noPad = false,
  animate = false,
  onClick,
  as: Tag = 'div',
}) {
  const glowClass = glowMap[glow] || ''

  const classes = cn(
    'glass rounded-3xl border border-white/[0.06] shadow-card',
    !noPad && 'p-5',
    hover && 'transition-all duration-300 cursor-pointer',
    hover && 'hover:bg-white/[0.045] hover:border-white/[0.10]',
    hover && glowClass,
    onClick && !hover && 'cursor-pointer',
    className
  )

  if (animate) {
    return (
      <motion.div
        onClick={onClick}
        className={classes}
        whileHover={hover ? { y: -2 } : undefined}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <Tag onClick={onClick} className={classes}>
      {children}
    </Tag>
  )
}
