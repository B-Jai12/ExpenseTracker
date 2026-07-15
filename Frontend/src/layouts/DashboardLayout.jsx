import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import {
  LayoutDashboard, Receipt, PieChart, CreditCard,
  PiggyBank, TrendingUp, LogOut, ChevronLeft, ChevronRight,
  Menu, X, Bell, User as UserIcon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getGreeting } from '@/utils'

/* ── Navigation items ─────────────────────────────────────────── */
const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/expenses',  icon: Receipt,         label: 'Transactions' },
  { to: '/budgets',   icon: PieChart,        label: 'Budgets' },
  { to: '/bills',     icon: CreditCard,      label: 'Bills' },
  { to: '/savings',   icon: PiggyBank,       label: 'Savings' },
]

/* Page titles for topbar */
const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/expenses':  'Transactions',
  '/budgets':   'Budgets',
  '/bills':     'Bills',
  '/savings':   'Savings Goals',
  '/profile':   'Profile',
}

/* ── NavItem ─────────────────────────────────────────────────── */
function NavItem({ to, icon: Icon, label, collapsed, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 border group relative',
          isActive
            ? 'bg-blue-500/12 text-white border-blue-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
            : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] border-transparent',
          collapsed ? 'justify-center px-2' : '',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={[
              'w-[18px] h-[18px] shrink-0 transition-colors',
              isActive ? 'text-blue-400' : 'text-current',
            ].join(' ')}
          />
          {!collapsed && <span className="truncate">{label}</span>}
          {/* Active indicator */}
          {isActive && !collapsed && (
            <span className="ml-auto w-1 h-1 rounded-full bg-blue-400 shrink-0" />
          )}
          {/* Tooltip when collapsed */}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-elevated">
              {label}
            </div>
          )}
        </>
      )}
    </NavLink>
  )
}

/* ── SidebarContent ──────────────────────────────────────────── */
function SidebarContent({ collapsed = false, onNavClick, user, onLogout }) {
  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : '?'

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div
        className={[
          'flex items-center gap-3 px-4 py-5 border-b border-white/[0.05] shrink-0',
          collapsed ? 'justify-center px-3' : '',
        ].join(' ')}
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center shrink-0 shadow-glow-blue">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-[15px] font-bold text-white font-display tracking-tight leading-none">
              FinFlow
            </span>
            <span className="block text-[9px] text-blue-400 font-semibold tracking-widest uppercase">
              Finance
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav
        className={['flex-1 py-3 space-y-0.5 overflow-y-auto', collapsed ? 'px-1.5' : 'px-2'].join(' ')}
        aria-label="Main navigation"
      >
        {!collapsed && (
          <p className="px-3 mb-2 text-[9px] font-bold text-zinc-600 uppercase tracking-widest">
            Navigation
          </p>
        )}
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <NavItem
            key={to}
            to={to}
            icon={icon}
            label={label}
            collapsed={collapsed}
            onClick={onNavClick}
          />
        ))}
      </nav>

      {/* Profile + Logout */}
      <div className="border-t border-white/[0.05] p-2 space-y-0.5 shrink-0">
        <NavLink
          to="/profile"
          onClick={onNavClick}
          className={({ isActive }) =>
            [
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all border group relative',
              isActive
                ? 'bg-blue-500/12 text-white border-blue-500/20'
                : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04] border-transparent',
              collapsed ? 'justify-center px-2' : '',
            ].join(' ')
          }
        >
          <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <span className="truncate text-sm">
              {user?.firstName} {user?.lastName}
            </span>
          )}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-elevated">
              Profile
            </div>
          )}
        </NavLink>

        <button
          onClick={onLogout}
          className={[
            'w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium',
            'text-zinc-500 hover:text-red-400 hover:bg-red-500/[0.06] transition-all border border-transparent',
            collapsed ? 'justify-center px-2' : '',
          ].join(' ')}
          aria-label="Logout"
        >
          <LogOut className="w-[17px] h-[17px] shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )
}

/* ── DashboardLayout (exported) ──────────────────────────────── */
export function DashboardLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const initials = user
    ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase()
    : '?'

  const pageTitle = PAGE_TITLES[location.pathname] || 'FinFlow'

  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <div className="flex h-screen bg-surface overflow-hidden relative">
      {/* Ambient background blobs for iOS glass refraction */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Desktop Sidebar ── */}
      <aside
        className={[
          'hidden lg:flex flex-col glass border-r border-white/[0.05]',
          'shrink-0 sticky top-0 h-screen overflow-hidden',
          'transition-all duration-300',
          collapsed ? 'w-[60px]' : 'w-[220px]',
        ].join(' ')}
      >
        <SidebarContent
          collapsed={collapsed}
          user={user}
          onLogout={handleLogout}
        />

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="flex items-center justify-center p-2 mx-2 mb-2.5 rounded-xl text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-all"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <ChevronLeft className="w-4 h-4" />
          }
        </button>
      </aside>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-[220px] z-50 lg:hidden glass border-r border-white/[0.05]"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-3 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-white/10 transition-colors z-10"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
              <SidebarContent
                user={user}
                onLogout={handleLogout}
                onNavClick={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Desktop Topbar ── */}
        <header className="hidden lg:flex items-center justify-between px-6 py-3.5 glass border-b border-white/[0.05] sticky top-0 z-30">
          <div>
            <h1 className="text-sm font-bold text-white font-display">{pageTitle}</h1>
            <p className="text-[11px] text-zinc-600 mt-0.5">
              {getGreeting()}, {user?.firstName} 👋
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification placeholder */}
            <button className="w-8 h-8 rounded-xl glass-light border border-white/[0.07] flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/8 transition-all relative">
              <Bell className="w-3.5 h-3.5" />
            </button>

            {/* User avatar → Profile */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-blue-500/10 border-blue-500/20'
                    : 'glass-light border-white/[0.07] hover:bg-white/8'
                }`
              }
            >
              <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                {initials}
              </div>
              <span className="text-xs font-semibold text-zinc-300">
                {user?.firstName}
              </span>
            </NavLink>
          </div>
        </header>

        {/* ── Mobile Topbar ── */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3.5 glass border-b border-white/[0.05] sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white text-sm font-display">FinFlow</span>
          </div>

          <NavLink to="/profile">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center text-[10px] font-bold text-white">
              {initials}
            </div>
          </NavLink>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
