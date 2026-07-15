import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { savingsService } from '@/services/savingsService'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { CardGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Plus, Pencil, Trash2, PiggyBank, PlusCircle, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDateShort, daysUntil, formatCurrency } from '@/utils'
import CountUp from 'react-countup'

const EMOJIS = ['🎯', '🏠', '✈️', '🚗', '💻', '📱', '🎓', '💍', '🏖️', '💰']
const inSixMonths = () => { const d = new Date(); d.setMonth(d.getMonth() + 6); return d.toISOString().split('T')[0] }
const emptyForm = () => ({ name: '', description: '', targetAmount: '', savedAmount: '', deadline: inSixMonths() })

const selectCls = 'w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white focus:outline-none focus:border-blue-500/40 transition-all'
const labelCls  = 'block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5'

/* Animated SVG ring */
function ProgressRing({ pct, completed, size = 72 }) {
  const r     = (size - 10) / 2
  const circ  = 2 * Math.PI * r
  const color = completed ? '#10B981' : pct >= 75 ? '#3B82F6' : '#8B5CF6'

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          className="fill-none stroke-white/[0.06]" strokeWidth="5"
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r}
          className="fill-none" stroke={color} strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
          transition={{ duration: 1.0, ease: 'easeOut', delay: 0.1 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-white leading-none">
          {completed ? '✓' : `${pct.toFixed(0)}%`}
        </span>
      </div>
    </div>
  )
}

export function Savings() {
  const qc = useQueryClient()
  const [modal, setModal]   = useState(false)
  const [editing, setEdit]  = useState(null)
  const [form, setForm]     = useState(emptyForm())
  const [errs, setErrs]     = useState({})
  const [saving, setSave]   = useState(false)
  const [delId, setDelId]   = useState(null)
  const [contGoal, setContGoal]     = useState(null)
  const [contAmt, setContAmt]       = useState('')
  const [contributing, setContrib]  = useState(false)

  const { data: goals = [], isLoading } = useQuery({
    queryKey: ['savings'],
    queryFn: savingsService.getAll,
    staleTime: 15_000,
  })

  const inv = () => qc.invalidateQueries({ queryKey: ['savings'] })

  const createMut = useMutation({ mutationFn: savingsService.create,                    onSuccess: () => { inv(); toast.success('Goal created!'); close() }, onError: () => toast.error('Failed') })
  const updateMut = useMutation({ mutationFn: ({ id, d }) => savingsService.update(id, d), onSuccess: () => { inv(); toast.success('Goal updated!'); close() }, onError: () => toast.error('Failed') })
  const contMut   = useMutation({ mutationFn: ({ id, a }) => savingsService.addContribution(id, a), onSuccess: () => { inv(); toast.success('Contribution added! 🎉'); setContGoal(null); setContAmt('') }, onError: () => toast.error('Failed') })
  const deleteMut = useMutation({ mutationFn: savingsService.delete,                    onSuccess: () => { inv(); toast.success('Goal deleted'); setDelId(null) }, onError: () => toast.error('Failed') })

  const open = (g = null) => {
    setEdit(g)
    setForm(g
      ? { name: g.name, description: g.description || '', targetAmount: Number(g.targetAmount), savedAmount: Number(g.savedAmount), deadline: g.deadline }
      : emptyForm()
    )
    setErrs({})
    setModal(true)
  }
  const close = () => { setModal(false); setEdit(null); setForm(emptyForm()); setErrs({}) }
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.targetAmount || Number(form.targetAmount) <= 0) e.targetAmount = 'Target must be > 0'
    if (!form.deadline) e.deadline = 'Deadline is required'
    setErrs(e)
    return !Object.keys(e).length
  }

  const submit = async () => {
    if (!validate()) return
    setSave(true)
    const payload = { ...form, targetAmount: Number(form.targetAmount), savedAmount: Number(form.savedAmount) || 0 }
    try {
      if (editing) await updateMut.mutateAsync({ id: editing.id, d: payload })
      else         await createMut.mutateAsync(payload)
    } finally { setSave(false) }
  }

  const handleContribute = async () => {
    const amount = parseFloat(contAmt)
    if (!amount || amount <= 0) { toast.error('Enter a valid positive amount'); return }
    setContrib(true)
    try { await contMut.mutateAsync({ id: contGoal.id, a: amount }) }
    finally { setContrib(false) }
  }

  const totalTarget    = goals.reduce((s, g) => s + Number(g.targetAmount), 0)
  const totalSaved     = goals.reduce((s, g) => s + Number(g.savedAmount), 0)
  const completedCount = goals.filter(g => g.completed).length
  const overallPct     = totalTarget > 0 ? Math.min((totalSaved / totalTarget) * 100, 100) : 0

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <PageHeader title="Savings Goals" subtitle={`${goals.length} goals — ${completedCount} completed`}>
        <Button onClick={() => open()} size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
          New Goal
        </Button>
      </PageHeader>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard hover>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Goals</p>
          <p className="text-xl font-bold text-white font-display">
            <CountUp end={goals.length} duration={0.8} preserveValue />
          </p>
        </GlassCard>
        <GlassCard hover glow="green">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Total Saved</p>
          <p className="text-xl font-bold text-emerald-400 font-display tabular-nums">
            ₹<CountUp end={totalSaved} duration={1.0} separator="," preserveValue />
          </p>
        </GlassCard>
        <GlassCard hover glow={completedCount > 0 ? 'blue' : 'none'}>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Completed</p>
          <p className="text-xl font-bold text-blue-400 font-display">
            {completedCount} <span className="text-zinc-600 text-base">/ {goals.length}</span>
          </p>
        </GlassCard>
      </div>

      {/* Overall progress */}
      {totalTarget > 0 && (
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Overall Savings Progress</p>
              <p className="text-sm text-white mt-0.5 font-semibold">
                {formatCurrency(totalSaved)} <span className="text-zinc-600 font-normal">saved of {formatCurrency(totalTarget)}</span>
              </p>
            </div>
            <span className="text-lg font-bold text-blue-400 font-display tabular-nums">
              {overallPct.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </GlassCard>
      )}

      {/* Goal cards */}
      {isLoading ? (
        <CardGridSkeleton count={6} />
      ) : goals.length === 0 ? (
        <GlassCard>
          <EmptyState
            icon={<PiggyBank className="w-7 h-7" />}
            title="No savings goals yet"
            description="Create a savings goal to track progress towards a new car, vacation, emergency fund, or anything else."
            action={() => open()}
            actionLabel="Create your first goal"
            actionIcon={<Plus className="w-3.5 h-3.5" />}
          />
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence>
            {goals.map((g, idx) => {
              const pct  = Math.min(g.progressPercentage, 100)
              const days = daysUntil(g.deadline)

              return (
                <motion.div
                  key={g.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <GlassCard
                    hover
                    className={`relative group h-full flex flex-col ${g.completed ? 'border-emerald-500/20' : ''}`}
                  >
                    {/* Status */}
                    {g.completed && (
                      <div className="mb-3">
                        <Badge variant="green" dot><CheckCircle2 className="w-2.5 h-2.5" /> Completed</Badge>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      {!g.completed && (
                        <button
                          onClick={() => setContGoal(g)}
                          className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-zinc-500 hover:text-emerald-400 transition-colors"
                          title="Add Contribution"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button onClick={() => open(g)} className="p-1.5 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDelId(g.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl glass-light border border-white/[0.08] flex items-center justify-center text-2xl shrink-0">
                        {EMOJIS[idx % EMOJIS.length]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">{g.name}</p>
                        {g.description && (
                          <p className="text-[10px] text-zinc-500 truncate">{g.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Progress row */}
                    <div className="flex items-center gap-4 mb-4">
                      <ProgressRing pct={pct} completed={g.completed} size={64} />

                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-500">Saved</span>
                          <span className="text-emerald-400 font-semibold tabular-nums">{formatCurrency(g.savedAmount)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-500">Target</span>
                          <span className="text-white font-semibold tabular-nums">{formatCurrency(g.targetAmount)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-500">Remaining</span>
                          <span className={`font-semibold tabular-nums ${g.completed ? 'text-emerald-400' : 'text-zinc-400'}`}>
                            {g.completed ? '✅ Done!' : formatCurrency(g.remainingAmount)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto border-t border-white/[0.05] pt-3 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500">
                        📅 {formatDateShort(g.deadline)}
                      </span>
                      <span className={`text-[10px] font-semibold ${
                        days < 0 ? 'text-red-400' : days <= 30 ? 'text-yellow-400' : 'text-zinc-500'
                      }`}>
                        {days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'Today!' : `${days}d left`}
                      </span>
                    </div>

                    {/* Contribute CTA */}
                    {!g.completed && (
                      <button
                        onClick={() => setContGoal(g)}
                        className="mt-3 w-full py-2 rounded-xl glass-medium border border-white/[0.07] text-xs font-semibold text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] transition-all"
                      >
                        + Add Contribution
                      </button>
                    )}
                  </GlassCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={modal} onClose={close} title={editing ? 'Edit Goal' : 'New Savings Goal'}>
        <div className="space-y-4">
          <Input label="Goal Name *" placeholder="e.g. Emergency Fund, Trip to Goa" value={form.name} onChange={set('name')} error={errs.name} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Target Amount (₹) *" type="number" min="1" placeholder="50000" value={form.targetAmount} onChange={set('targetAmount')} error={errs.targetAmount} />
            <Input label="Already Saved (₹)" type="number" min="0" placeholder="0" value={form.savedAmount} onChange={set('savedAmount')} />
          </div>
          <Input label="Deadline *" type="date" value={form.deadline} onChange={set('deadline')} error={errs.deadline} />
          <div>
            <label className={labelCls}>Description (optional)</label>
            <textarea
              rows={2}
              className={`${selectCls} resize-none`}
              placeholder="What are you saving for?"
              value={form.description}
              onChange={set('description')}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" onClick={close} className="flex-1">Cancel</Button>
            <Button onClick={submit} isLoading={saving} className="flex-1">{editing ? 'Save Changes' : 'Create Goal'}</Button>
          </div>
        </div>
      </Modal>

      {/* Contribute Modal */}
      <Modal
        isOpen={contGoal !== null}
        onClose={() => { setContGoal(null); setContAmt('') }}
        title={`Contribute to: ${contGoal?.name}`}
        size="sm"
      >
        <div className="space-y-4">
          <div className="glass-light rounded-2xl p-4 border border-white/[0.06] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Currently saved</span>
              <span className="text-white font-semibold tabular-nums">{formatCurrency(contGoal?.savedAmount ?? 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Still needed</span>
              <span className="text-emerald-400 font-semibold tabular-nums">{formatCurrency(contGoal?.remainingAmount ?? 0)}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{ width: `${Math.min(contGoal?.progressPercentage ?? 0, 100)}%` }}
              />
            </div>
          </div>
          <Input
            label="Contribution Amount (₹) *"
            type="number"
            min="0.01"
            placeholder="5000"
            value={contAmt}
            onChange={e => setContAmt(e.target.value)}
          />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => { setContGoal(null); setContAmt('') }} className="flex-1">Cancel</Button>
            <Button onClick={handleContribute} isLoading={contributing} className="flex-1">Add Contribution</Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal isOpen={delId !== null} onClose={() => setDelId(null)} title="Delete Goal" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Delete this savings goal?</p>
            <p className="text-xs text-zinc-500 mt-1">All progress data will be lost permanently.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setDelId(null)} className="flex-1">Cancel</Button>
            <Button onClick={() => delId && deleteMut.mutate(delId)} isLoading={deleteMut.isPending} variant="danger" className="flex-1">Delete</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}
