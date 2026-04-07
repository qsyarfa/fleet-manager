import { useState } from 'react'
import { Search, Star, Phone, Mail, Truck, Shield, AlertTriangle } from 'lucide-react'
import { drivers as allDrivers, getVehicle } from '../../data/mockData'

const DUTY_BADGE = {
  'on-duty':  'badge-active',
  'off-duty': 'badge-offline',
  'standby':  'badge-idle',
}

const AVATAR_COLORS = [
  'bg-fleet-amber text-black',
  'bg-fleet-cyan text-black',
  'bg-purple-500 text-white',
  'bg-fleet-green text-black',
  'bg-pink-500 text-white',
  'bg-indigo-500 text-white',
  'bg-teal-500 text-black',
  'bg-rose-500 text-white',
]

const STATUSES = ['all', 'on-duty', 'off-duty', 'standby']

function isExpired(dateStr) {
  return new Date(dateStr) < new Date()
}

function isExpiringSoon(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  const months3 = new Date()
  months3.setMonth(months3.getMonth() + 3)
  return d > now && d <= months3
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={11}
          className={i <= Math.round(rating) ? 'text-fleet-amber fill-fleet-amber' : 'text-fleet-border'}
        />
      ))}
      <span className="text-xs font-mono text-fleet-subtext ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

function DriverCard({ driver, colorIndex }) {
  const licenseExpired  = isExpired(driver.licenseExpiry)
  const licenseExpiring = isExpiringSoon(driver.licenseExpiry)
  const avatarColor     = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]

  return (
    <div className="bg-fleet-card border border-fleet-border rounded-lg p-5 hover:border-fleet-muted transition-colors">
      {/* Top row */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold flex-shrink-0 ${avatarColor}`}>
          {driver.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-fleet-text">{driver.name}</span>
            <span className={DUTY_BADGE[driver.status]}>{driver.status}</span>
          </div>
          <div className="text-xs text-fleet-subtext font-mono mt-0.5">{driver.id}</div>
          <StarRating rating={driver.rating} />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: 'Trips',      value: driver.totalTrips },
          { label: 'Miles',      value: `${(driver.totalMiles / 1000).toFixed(0)}k` },
          { label: 'Violations', value: driver.violations },
        ].map(({ label, value }) => (
          <div key={label} className="bg-fleet-surface rounded-lg p-2 text-center">
            <div className={`text-lg font-bold font-mono ${label === 'Violations' && driver.violations > 0 ? 'text-fleet-red' : 'text-fleet-text'}`}>
              {value}
            </div>
            <div className="text-xs text-fleet-subtext">{label}</div>
          </div>
        ))}
      </div>

      {/* Info rows */}
      <div className="space-y-1.5 text-xs">
        <div className="flex items-center gap-2 text-fleet-subtext">
          <Shield size={11} className={licenseExpired ? 'text-fleet-red' : licenseExpiring ? 'text-fleet-yellow' : 'text-fleet-amber'} />
          <span className="font-mono">{driver.license}</span>
          <span className={`ml-auto font-mono ${licenseExpired ? 'text-fleet-red font-bold' : licenseExpiring ? 'text-fleet-yellow' : 'text-fleet-subtext'}`}>
            {licenseExpired ? 'EXPIRED' : licenseExpiring ? 'Exp. soon' : driver.licenseExpiry}
          </span>
        </div>
        <div className="flex items-center gap-2 text-fleet-subtext">
          <Truck size={11} />
          <span>{getVehicle(driver.vehicleId)?.name ?? <span className="italic">No vehicle assigned</span>}</span>
          {driver.vehicleId && <span className="ml-auto font-mono text-fleet-amber">{driver.vehicleId}</span>}
        </div>
        <div className="flex items-center gap-2 text-fleet-subtext">
          <Phone size={11} />
          <span className="font-mono">{driver.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-fleet-subtext">
          <Mail size={11} />
          <span className="truncate">{driver.email}</span>
        </div>
      </div>

      {/* Alerts */}
      {(licenseExpired || licenseExpiring) && (
        <div className={`mt-3 flex items-center gap-2 p-2 rounded ${licenseExpired ? 'bg-red-500/10 border border-red-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
          <AlertTriangle size={11} className={licenseExpired ? 'text-fleet-red' : 'text-fleet-yellow'} />
          <span className={`text-xs font-mono ${licenseExpired ? 'text-fleet-red' : 'text-fleet-yellow'}`}>
            {licenseExpired ? 'License EXPIRED — grounded' : 'License expiring within 90 days'}
          </span>
        </div>
      )}
    </div>
  )
}

export default function Drivers() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = allDrivers.filter(d => {
    const q = search.toLowerCase()
    const matchSearch = d.name.toLowerCase().includes(q)
      || d.id.toLowerCase().includes(q)
      || d.license.toLowerCase().includes(q)
    const matchStatus = status === 'all' || d.status === status
    return matchSearch && matchStatus
  })

  const stats = {
    total:     allDrivers.length,
    onDuty:    allDrivers.filter(d => d.status === 'on-duty').length,
    offDuty:   allDrivers.filter(d => d.status === 'off-duty').length,
    expired:   allDrivers.filter(d => isExpired(d.licenseExpiry)).length,
    avgRating: allDrivers.length
      ? (allDrivers.reduce((a, d) => a + parseFloat(d.rating), 0) / allDrivers.length).toFixed(1)
      : '0.0',
  }

  return (
    <div className="p-6 space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Drivers', value: stats.total,              color: 'text-fleet-text' },
          { label: 'On Duty',       value: stats.onDuty,             color: 'text-fleet-green' },
          { label: 'Off Duty',      value: stats.offDuty,            color: 'text-fleet-subtext' },
          { label: 'Avg Rating',    value: `${stats.avgRating} ★`,   color: 'text-fleet-amber' },
        ].map(({ label, value, color }) => (
          <div key={label} className="stat-card">
            <div className="section-header">{label}</div>
            <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* License alert banner */}
      {stats.expired > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-center gap-3">
          <AlertTriangle size={16} className="text-fleet-red flex-shrink-0" />
          <span className="text-sm text-fleet-red">
            <strong>{stats.expired} driver(s)</strong> have expired licenses and must be grounded until renewed.
          </span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fleet-subtext" />
          <input
            type="text"
            placeholder="Search drivers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-8 w-56 h-9 text-sm"
          />
        </div>
        <div className="flex gap-1">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded text-xs font-mono capitalize transition-colors ${
                status === s
                  ? 'bg-fleet-amber text-black font-bold'
                  : 'bg-fleet-surface border border-fleet-border text-fleet-subtext hover:text-fleet-text'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="ml-auto text-xs font-mono text-fleet-subtext">
          {filtered.length} drivers
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(d => (
          <DriverCard
            key={d.id}
            driver={d}
            colorIndex={allDrivers.findIndex(x => x.id === d.id)}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-fleet-subtext text-sm font-mono">
            No drivers match the current filters
          </div>
        )}
      </div>
    </div>
  )
}
