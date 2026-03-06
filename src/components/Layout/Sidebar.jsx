import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Truck, MapPin, Users, Wrench,
  ChevronRight, Radio, AlertTriangle,
} from 'lucide-react'
import { alerts } from '../../data/mockData'

const criticalCount = alerts.filter(a => a.severity === 'critical').length

const navItems = [
  { to: '/',            icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/vehicles',   icon: Truck,            label: 'Vehicles' },
  { to: '/trips',      icon: MapPin,           label: 'Trip Logs' },
  { to: '/drivers',    icon: Users,            label: 'Drivers' },
  { to: '/maintenance',icon: Wrench,           label: 'Maintenance' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-fleet-surface border-r border-fleet-border flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-fleet-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-fleet-amber flex items-center justify-center">
            <Truck size={18} className="text-black" />
          </div>
          <div>
            <div className="text-fleet-text font-bold text-base leading-none">FleetOps</div>
            <div className="text-fleet-subtext text-xs mt-0.5 font-mono">v2.4.1</div>
          </div>
        </div>
      </div>

      {/* Live indicator */}
      <div className="px-5 py-3 border-b border-fleet-border">
        <div className="flex items-center gap-2 text-xs font-mono text-fleet-subtext">
          <span className="dot-live" />
          <span>LIVE TELEMETRY</span>
          <Radio size={11} className="ml-auto text-green-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <div className="section-header px-3 mb-3">Navigation</div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
          >
            <Icon size={16} />
            <span className="flex-1">{label}</span>
            {label === 'Dashboard' && criticalCount > 0 && (
              <span className="flex items-center gap-1 bg-red-500/20 text-red-700 text-xs px-1.5 py-0.5 rounded font-mono border border-red-500/30">
                <AlertTriangle size={9} />
                {criticalCount}
              </span>
            )}
            <ChevronRight size={14} className="opacity-30" />
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-fleet-border">
        <div className="text-xs text-fleet-subtext font-mono">
          <div className="flex justify-between mb-1">
            <span>Fleet ID</span>
            <span className="text-fleet-amber">FLT-KUL-001</span>
          </div>
          <div className="flex justify-between">
            <span>Region</span>
            <span className="text-fleet-text">Malaysia</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
