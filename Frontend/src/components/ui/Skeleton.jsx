import { cn } from '@/utils'

/** Shimmer block — the base skeleton unit */
function SkeletonBlock({ className }) {
  return (
    <div
      className={cn('skeleton rounded-xl', className)}
      aria-hidden="true"
    />
  )
}

/** Full-page dashboard skeleton matching the real layout */
export function DashboardSkeleton() {
  return (
    <div className="space-y-5" aria-label="Loading dashboard…">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass rounded-2xl p-5 border border-white/[0.06] space-y-4">
            <div className="flex justify-between items-start">
              <SkeletonBlock className="h-2.5 w-20" />
              <SkeletonBlock className="h-8 w-8 rounded-xl" />
            </div>
            <SkeletonBlock className="h-7 w-28" />
            <SkeletonBlock className="h-2 w-16" />
          </div>
        ))}
      </div>

      {/* Insights + Quote row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-2xl p-5 border border-white/[0.06] space-y-4">
          <SkeletonBlock className="h-2.5 w-32" />
          <div className="grid grid-cols-3 gap-4">
            <SkeletonBlock className="h-24 rounded-2xl" />
            <div className="col-span-2 space-y-3">
              <SkeletonBlock className="h-10 rounded-xl" />
              <SkeletonBlock className="h-10 rounded-xl" />
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 border border-white/[0.06] space-y-3">
          <SkeletonBlock className="h-2.5 w-24" />
          <SkeletonBlock className="h-20 rounded-xl" />
          <SkeletonBlock className="h-3 w-32" />
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 glass rounded-2xl p-5 border border-white/[0.06] space-y-4">
          <SkeletonBlock className="h-2.5 w-32" />
          <SkeletonBlock className="h-52 rounded-xl" />
        </div>
        <div className="glass rounded-2xl p-5 border border-white/[0.06] space-y-4">
          <SkeletonBlock className="h-2.5 w-28" />
          <SkeletonBlock className="h-36 w-36 rounded-full mx-auto" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <SkeletonBlock className="h-2 w-2 rounded-full" />
                <SkeletonBlock className="h-2 flex-1" />
                <SkeletonBlock className="h-2 w-8" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="glass rounded-2xl p-5 border border-white/[0.06] space-y-4">
        <SkeletonBlock className="h-2.5 w-40" />
        <RowSkeleton count={5} />
      </div>
    </div>
  )
}

/** Generic row skeleton for tables and lists */
export function RowSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3" aria-label="Loading…">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-1.5">
          <SkeletonBlock className="h-8 w-8 rounded-xl shrink-0" />
          <SkeletonBlock className="h-3 flex-1 max-w-[200px]" />
          <SkeletonBlock className="h-3 w-20 ml-auto" />
          <SkeletonBlock className="h-3 w-16" />
        </div>
      ))}
    </div>
  )
}

/** Card grid skeleton for Budgets, Bills, Savings */
export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 border border-white/[0.06] space-y-4">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-10 w-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-3 w-28" />
              <SkeletonBlock className="h-2 w-20" />
            </div>
          </div>
          <SkeletonBlock className="h-2 w-full rounded-full" />
          <div className="flex justify-between">
            <SkeletonBlock className="h-2.5 w-20" />
            <SkeletonBlock className="h-2.5 w-12" />
          </div>
        </div>
      ))}
    </div>
  )
}
