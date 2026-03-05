import { Bell, Search, RefreshCw } from 'lucide-react'
import { alerts } from '../../data/mockData'
import { useState } from 'react'

const unread = alerts.filter(a => a.severity === 'critical').length

export default function Header({ title, subtitle }) {
  const [refreshing, setRefreshing] = useState(false)

  function handleRefresh() {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-fleet-border bg-fleet-surface/50 backdrop-blur-sm flex-shrink-0">
      <div>
        <h1 className="text-fleet-text font-semibold text-lg leading-tight">{title}</h1>
        {subtitle && <p className="text-fleet-subtext text-xs font-mono">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fleet-subtext" />
          <input
            type="text"
            placeholder="Search fleet..."
            className="input-field pl-8 w-48 text-xs h-8"
          />
        </div>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          className="w-8 h-8 flex items-center justify-center rounded border border-fleet-border text-fleet-subtext hover:text-fleet-amber hover:border-fleet-amber transition-colors"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
        </button>

        {/* Notifications */}
        <button className="relative w-8 h-8 flex items-center justify-center rounded border border-fleet-border text-fleet-subtext hover:text-fleet-amber hover:border-fleet-amber transition-colors">
          <Bell size={14} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
              {unread}
            </span>
          )}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-fleet-border">
          <div className="w-8 h-8 rounded-full bg-fleet-amber/20 border border-fleet-amber/40 flex items-center justify-center text-fleet-amber font-bold text-xs">
            FO
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-medium text-fleet-text leading-none">Fleet Admin</div>
            <div className="text-xs text-fleet-subtext font-mono">admin@fleetops.com</div>
          </div>
        </div>
      </div>
    </header>
  )
}
