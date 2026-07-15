import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Mail, Lock, User, Phone, Eye, EyeOff, TrendingUp, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const PERKS = [
  'Track income & expenses with smart categorization',
  'Set monthly budgets and get overspend alerts',
  'Save towards goals with animated progress rings',
  'AI-powered financial health score',
]

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]     = useState({ firstName: '', lastName: '', email: '', password: '', phone: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }))
    setErrors(p => { const n = { ...p }; delete n[field]; return n })
  }

  const validate = () => {
    const e = {}
    if (!form.firstName.trim())                e.firstName = 'First name is required'
    if (!form.lastName.trim())                 e.lastName  = 'Last name is required'
    if (!form.email.trim())                    e.email     = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email     = 'Enter a valid email'
    if (!form.password)                        e.password  = 'Password is required'
    else if (form.password.length < 6)         e.password  = 'Minimum 6 characters'
    if (form.phone && form.phone.length > 20)  e.phone     = 'Max 20 characters'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await register({
        firstName: form.firstName.trim(),
        lastName:  form.lastName.trim(),
        email:     form.email.toLowerCase().trim(),
        password:  form.password,
        phone:     form.phone.trim() || undefined,
      })
      toast.success('Account created! Welcome to FinFlow 🎉')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const status = err.response?.status
      const msg    = err.response?.data?.message
      if (status === 409) toast.error('An account with this email already exists.')
      else if (msg)       toast.error(msg)
      else                toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
      {/* Left — Perks (desktop only) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="hidden lg:block space-y-8"
      >
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center shadow-glow-blue">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white font-display">FinFlow</h1>
              <p className="text-[10px] text-blue-400 font-semibold uppercase tracking-widest">Personal Finance</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white font-display leading-tight">
            Your money,{' '}
            <span className="gradient-text">fully in view</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed max-w-sm">
            Join thousands managing their finances smarter. Free forever, no credit card required.
          </p>
        </div>

        <div className="space-y-3">
          {PERKS.map(perk => (
            <div key={perk} className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <p className="text-sm text-zinc-300">{perk}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-4 border border-white/[0.06]">
          <p className="text-xs text-zinc-500 italic">
            "FinFlow completely changed how I manage my money. The AI insights alone saved me ₹8,000 in one month."
          </p>
          <p className="text-[10px] text-zinc-600 mt-2 font-semibold">— Priya M., Product Designer</p>
        </div>
      </motion.div>

      {/* Right — Register form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="glass rounded-3xl p-8 border border-white/[0.07] shadow-elevated">
          {/* Mobile brand */}
          <div className="flex items-center gap-2 justify-center mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-bold text-white font-display">FinFlow</span>
          </div>

          <div className="text-center mb-7">
            <h2 className="text-xl font-bold text-white font-display">Create account</h2>
            <p className="text-sm text-zinc-500 mt-1">Start your financial journey today</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name *"
                placeholder="Jai"
                icon={<User className="w-4 h-4" />}
                value={form.firstName}
                onChange={set('firstName')}
                error={errors.firstName}
                autoComplete="given-name"
              />
              <Input
                label="Last Name *"
                placeholder="Singh"
                icon={<User className="w-4 h-4" />}
                value={form.lastName}
                onChange={set('lastName')}
                error={errors.lastName}
                autoComplete="family-name"
              />
            </div>

            <Input
              label="Email Address *"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Phone (optional)"
              type="tel"
              placeholder="9876543210"
              icon={<Phone className="w-4 h-4" />}
              value={form.phone}
              onChange={set('phone')}
              error={errors.phone}
              autoComplete="tel"
            />

            <Input
              label="Password * (min 6 chars)"
              type={showPwd ? 'text' : 'password'}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              value={form.password}
              onChange={set('password')}
              error={errors.password}
              autoComplete="new-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="text-zinc-500 hover:text-white transition-colors p-0.5"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <Button type="submit" className="w-full mt-2" size="lg" isLoading={loading}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-white/[0.05] pt-5">
            <p className="text-sm text-zinc-500">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
