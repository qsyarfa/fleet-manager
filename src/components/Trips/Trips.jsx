import React, { useState } from 'react'
import { Search, Package, MapPin } from 'lucide-react'
import { trips as allTrips, getDriver, getVehicle } from '../../data/mockData'

const STATUS_BADGE = {
  'in-progress': 'badge-enroute',
  'completed':   'badge-active',
  'cancelled':   'badge-offline',
}

const STATUSES = ['all', 'in-progress', 'completed', 'cancelled']

function formatDuration(minutes) {
  if (!minutes) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function ElapsedBadge({ startTime }) {
  const elapsed = Math.round((Date.now() - new Date(startTime)) / 60000)
  const h = Math.floor(elapsed / 60)
  const m = elapsed % 60
  return (
    <span className="text-xs font-mono text-fleet-cyan">
      {h > 0 ? `${h}h ${m}m` : `${m}m`} elapsed
    </span>
  )
}

export default function Trips() {
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('all')
  const [expanded, setExpanded] = useState(null)

  const filtered = allTrips.filter(t => {
    const q = search.toLowerCase()
    const matchSearch = t.id.toLowerCase().includes(q)
      || t.origin.toLowerCase().includes(q)
      || t.destination.toLowerCase().includes(q)
      || (getDriver(t.driverId)?.name.toLowerCase().includes(q))
      || (t.vehicleId?.toLowerCase().includes(q))
    const matchStatus = status === 'all' || t.status === status
    return matchSearch && matchStatus
  })

  const stats = {
    total:      allTrips.length,
    active:     allTrips.filter(t => t.status === 'in-progress').length,
    completed:  allTrips.filter(t => t.status === 'completed').length,
    cancelled:  allTrips.filter(t => t.status === 'cancelled').length,
    totalMiles: allTrips.filter(t => t.status === 'completed').reduce((a, t) => a + t.distance, 0),
  }

  return (
    <div className="p-6 space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Trips', value: stats.total,                         color: 'text-fleet-text' },
          { label: 'In Progress', value: stats.active,                        color: 'text-fleet-cyan' },
          { label: 'Completed',   value: stats.completed,                     color: 'text-fleet-green' },
          { label: 'Miles Logged',value: stats.totalMiles.toLocaleString(),   color: 'text-fleet-amber' },
        ].map(({ label, value, color }) => (
          <div key={label} className="stat-card">
            <div className="section-header">{label}</div>
            <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fleet-subtext" />
          <input
            type="text"
            placeholder="Search trips..."
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
          {filtered.length} trips
        </div>
      </div>

      {/* Table */}
      <div className="bg-fleet-card border border-fleet-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-fleet-surface border-b border-fleet-border">
              <tr>
                {['Trip ID', 'Route', 'Driver / Vehicle', 'Started', 'Status', 'Distance', 'Duration', 'Cargo'].map(h => (
                  <th key={h} className="table-head whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(trip => {
                const isExpanded = expanded === trip.id

                return (
                  <React.Fragment key={trip.id}>
                    <tr
                      className="table-row cursor-pointer"
                      onClick={() => setExpanded(isExpanded ? null : trip.id)}
                    >
                      <td className="table-cell">
                        <span className="font-mono text-fleet-amber text-sm">{trip.id}</span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={11} className="text-fleet-subtext flex-shrink-0" />
                          <div>
                            <div className="text-sm text-fleet-text font-medium">{trip.origin}</div>
                            <div className="text-xs text-fleet-subtext">→ {trip.destination}</div>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="text-sm text-fleet-text">{getDriver(trip.driverId)?.name ?? '—'}</div>
                        <div className="text-xs text-fleet-subtext font-mono">{trip.vehicleId ?? '—'}</div>
                      </td>
                      <td className="table-cell">
                        <div className="text-xs text-fleet-text font-mono">{formatDate(trip.startTime)}</div>
                        {trip.status === 'in-progress' && <ElapsedBadge startTime={trip.startTime} />}
                      </td>
                      <td className="table-cell">
                        <span className={STATUS_BADGE[trip.status]}>{trip.status}</span>
                      </td>
                      <td className="table-cell">
                        <span className="font-mono text-fleet-text">{trip.distance} <span className="text-fleet-subtext text-xs">mi</span></span>
                      </td>
                      <td className="table-cell">
                        <span className="font-mono text-fleet-subtext text-sm">
                          {trip.status === 'in-progress' ? '—' : formatDuration(trip.duration)}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center gap-1">
                          <Package size={11} className="text-fleet-subtext" />
                          <span className="text-xs text-fleet-subtext truncate max-w-[120px]">{trip.cargo}</span>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${trip.id}-expanded`} className="bg-fleet-surface/30">
                        <td colSpan={8} className="px-6 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-fleet-subtext text-xs font-mono mb-1">CARGO WEIGHT</div>
                              <div className="text-fleet-text">{trip.weight}</div>
                            </div>
                            <div>
                              <div className="text-fleet-subtext text-xs font-mono mb-1">VEHICLE</div>
                              <div className="text-fleet-text">{getVehicle(trip.vehicleId)?.name ?? '—'}</div>
                            </div>
                            <div>
                              <div className="text-fleet-subtext text-xs font-mono mb-1">FUEL USED</div>
                              <div className="text-fleet-text font-mono">
                                {trip.fuelUsed !== null ? `${trip.fuelUsed} gal` : '—'}
                              </div>
                            </div>
                            <div>
                              <div className="text-fleet-subtext text-xs font-mono mb-1">END TIME</div>
                              <div className="text-fleet-text font-mono">{formatDate(trip.endTime)}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-fleet-subtext text-sm font-mono">
            No trips match the current filters
          </div>
        )}
      </div>
    </div>
  )
}
