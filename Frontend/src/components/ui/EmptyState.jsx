import { motion } from 'framer-motion'
import { Button } from './Button'

/**
 * EmptyState — illustrated empty state with icon, title, description, and optional CTA.
 */
export function EmptyState({
  icon,
  emoji,
  title,
  description,
  action,
  actionLabel,
  actionIcon,
  className = '',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      {emoji ? (
        <div className="text-5xl mb-4 select-none">{emoji}</div>
      ) : icon ? (
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-600 mb-4">
          {icon}
        </div>
      ) : null}

      <p className="text-base font-semibold text-white mb-1.5">{title}</p>

      {description && (
        <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">{description}</p>
      )}

      {action && actionLabel && (
        <Button
          onClick={action}
          size="sm"
          className="mt-5"
          leftIcon={actionIcon}
        >
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}
