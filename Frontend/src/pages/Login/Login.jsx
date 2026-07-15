import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Mail, Lock, Eye, EyeOff, TrendingUp,
  ShieldCheck, BarChart3, PiggyBank,
} from 'lucide-react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const FEATURES = [
  { icon: BarChart3,  color: 'text-blue-400',   bg: 'bg-blue-500/10',   title: 'Smart Analytics',    desc: 'AI-powered insights on your spending' },
  { icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Bank-Level Security', desc: 'JWT auth with encrypted passwords' },
  { icon: PiggyBank,   color: 'text-purple-400',  bg: 'bg-purple-500/10',  title: 'Savings Goals',      desc: 'Track goals with visual progress' },
]

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})

  const validate = () => {
    const e = {}
    if (!email.trim())              e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email'
    if (!password)                  e.password = 'Password is required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await login({ email: email.toLowerCase().trim(), password })
      toast.success('Welcome back to FinFlow! 🎉')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const status = err.response?.status
      const msg    = err.response?.data?.message
      if (status === 401) toast.error('Invalid email or password')
      else if (msg)       toast.error(msg)
      else                toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start lg:items-center w-full">
      {/* Left — Feature highlights (desktop only) */}
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
            Take control of your{' '}
            <span className="gradient-text">financial future</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-3 leading-relaxed max-w-sm">
            Track every rupee, manage budgets, plan savings goals, and get AI-powered insights — all in one beautiful dashboard.
          </p>
        </div>

        <div className="space-y-3">
          {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} className="flex items-center gap-4 p-4 glass rounded-2xl border border-white/[0.05]">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-4.5 h-4.5 ${color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-[11px] text-zinc-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right — Login form */}
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
            <h2 className="text-xl font-bold text-white font-display">Welcome back</h2>
            <p className="text-sm text-zinc-500 mt-1">Sign in to your FinFlow account</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })) }}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Password"
              type={showPwd ? 'text' : 'password'}
              placeholder="••••••••"
              icon={<Lock className="w-4 h-4" />}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })) }}
              error={errors.password}
              autoComplete="current-password"
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
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center border-t border-white/[0.05] pt-5">
            <p className="text-sm text-zinc-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                Create account →
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
