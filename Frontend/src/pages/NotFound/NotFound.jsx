import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 24, stiffness: 280 }}
        className="text-center relative z-10"
      >
        {/* Giant 404 */}
        <p className="text-[140px] font-black text-white/[0.04] leading-none font-display select-none">
          404
        </p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="-mt-8 mb-8"
        >
          <p className="text-5xl mb-4">🗺️</p>
          <h1 className="text-2xl font-bold text-white font-display">Page not found</h1>
          <p className="text-sm text-zinc-500 mt-2 max-w-xs mx-auto">
            This page doesn't exist. It might have moved or the URL might be wrong.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-3">
          <Button
            as={Link}
            to="/dashboard"
            leftIcon={<Home className="w-3.5 h-3.5" />}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
          >
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
