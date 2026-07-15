import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { GlassCard } from './GlassCard'

/**
 * StatCard — animated stat card for dashboards.
 * Shows a label, icon, animated number value, and optional trend/note.
 */
export function StatCard({
  label,
  value,
  icon,
  iconBg = 'bg-blue-500/10',
  glow = 'none',
  note,
  trend,         // 'up' | 'down' | null
  prefix = '₹',
  decimals = 0,
  className,
}) {
  const trendColor = trend === 'up' ? 'text-emerald-400' : trend === 'down' ? 'text-red-400' : 'text-zinc-500'

  return (
    <GlassCard glow={glow} hover animate className={className}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase leading-none">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
          {icon}
        </div>
      </div>

      <p className="text-2xl font-bold text-white font-display leading-none tabular-nums">
        {prefix}
        <CountUp
          end={Number(value) || 0}
          decimals={decimals}
          duration={1.2}
          separator=","
          preserveValue
        />
      </p>

      {note && (
        <p className={`text-[10px] mt-2.5 font-medium ${trendColor}`}>
          {note}
        </p>
      )}
    </GlassCard>
  )
}
