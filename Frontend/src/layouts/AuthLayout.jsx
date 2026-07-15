import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-blue-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        <Outlet />
      </div>

      <p className="mt-8 text-xs text-zinc-700">
        © {new Date().getFullYear()} FinFlow — Financial clarity for a better tomorrow.
      </p>
    </div>
  )
}
