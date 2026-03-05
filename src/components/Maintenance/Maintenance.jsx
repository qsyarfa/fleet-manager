import { useState } from 'react'
import { Search, Wrench, Calendar, DollarSign, AlertTriangle, Clock } from 'lucide-react'
import { maintenanceRecords, getVehicle } from '../../data/mockData'

const STATUS_BADGE = {
  'in-progress': 'badge-enroute',
  'scheduled':   'badge-idle',
  'pending':     'badge-maintenance',
  'completed':   'badge-active',
}

const PRIORITY_CONFIG = {
  critical: { cls: 'bg-red-500/10 border-red-500/30 text-red-400',    dot: 'bg-red-500',    label: 'CRITICAL' },
  high:     { cls: 'bg-orange-500/10 border-orange-500/30 text-orange-400', dot: 'bg-orange-500', label: 'HIGH' },
  medium:   { cls: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400', dot: 'bg-yellow-500', label: 'MEDIUM' },
  low:      { cls: 'bg-fleet-border/50 border-fleet-border text-fleet-subtext', dot: 'bg-fleet-muted', label: 'LOW' },
}

const STATUSES = ['all', 'pending', 'in-progress', 'scheduled', 'completed']
const PRIORITIES = ['all', 'critical', 'high', 'medium', 'low']

function isOverdue(record) {
  return record.status !== 'completed' && new Date(record.scheduledDate) < new Date()
}

function MaintenanceCard({ record }) {
  const vehicle = getVehicle(record.vehicleId)
  const priority = PRIORITY_CONFIG[record.priority]
  const overdue = isOverdue(record)

  return (
    <div className={`bg-fleet-card rounded-lg border p-5 hover:border-fleet-muted transition-colors ${overdue ? 'border-red-500/40' : 'border-fleet-border'}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-fleet-text">{record.type}</span>
            {overdue && (
              <span className="badge bg-red-500/20 border border-red-500/40 text-red-400">
                <AlertTriangle size={9} /> OVERDUE
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs font-mono text-fleet-subtext">
            <span>{record.id}</span>
            <span>·</span>
            <span>{record.vehicleId}</span>
          </div>
        </div>
        <span className={`badge border ${priority.cls}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>
      </div>

      <p className="text-sm text-fleet-subtext mb-4 leading-relaxed">{record.description}</p>

      {/* Detail grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-fleet-surface rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Wrench size={11} className="text-fleet-amber" />
            <span className="text-xs text-fleet-subtext font-mono">Vehicle</span>
          </div>
          <div className="text-xs text-fleet-text truncate">{vehicle?.name ?? '—'}</div>
        </div>
        <div className="bg-fleet-surface rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Calendar size={11} className="text-fleet-amber" />
            <span className="text-xs text-fleet-subtext font-mono">
              {record.status === 'completed' ? 'Completed' : 'Scheduled'}
            </span>
          </div>
          <div className={`text-xs font-mono ${overdue ? 'text-red-400' : 'text-fleet-text'}`}>
            {record.status === 'completed' ? record.completedDate : record.scheduledDate}
          </div>
        </div>
        <div className="bg-fleet-surface rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <DollarSign size={11} className="text-fleet-amber" />
            <span className="text-xs text-fleet-subtext font-mono">Est. Cost</span>
          </div>
          <div className="text-xs text-fleet-text font-mono">${record.cost.toLocaleString()}</div>
        </div>
        <div className="bg-fleet-surface rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Clock size={11} className="text-fleet-amber" />
            <span className="text-xs text-fleet-subtext font-mono">Status</span>
          </div>
          <span className={STATUS_BADGE[record.status]}>{record.status}</span>
        </div>
      </div>

      {/* Technician & Shop */}
      <div className="border-t border-fleet-border pt-3 flex items-center justify-between text-xs text-fleet-subtext font-mono">
        <span>Tech: <span className="text-fleet-text">{record.technicianName}</span></span>
        <span className="text-right truncate max-w-[150px]">{record.shop}</span>
      </div>

      {/* Parts */}
      {record.partsRequired.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {record.partsRequired.map(p => (
            <span key={p} className="text-xs bg-fleet-surface border border-fleet-border rounded px-2 py-0.5 text-fleet-subtext font-mono">
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Maintenance() {
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('all')
  const [priority, setPriority] = useState('all')

  const filtered = maintenanceRecords.filter(r => {
    const vehicle = getVehicle(r.vehicleId)
    const q = search.toLowerCase()
    const matchSearch = r.id.toLowerCase().includes(q)
      || r.type.toLowerCase().includes(q)
      || r.vehicleId.toLowerCase().includes(q)
      || r.technicianName.toLowerCase().includes(q)
      || vehicle?.name.toLowerCase().includes(q)
    const matchStatus   = status === 'all' || r.status === status
    const matchPriority = priority === 'all' || r.priority === priority
    return matchSearch && matchStatus && matchPriority
  })

  const sortedFiltered = [...filtered].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    if (isOverdue(a) !== isOverdue(b)) return isOverdue(a) ? -1 : 1
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  const stats = {
    total:       maintenanceRecords.length,
    active:      maintenanceRecords.filter(r => r.status === 'in-progress').length,
    scheduled:   maintenanceRecords.filter(r => r.status === 'scheduled').length,
    overdue:     maintenanceRecords.filter(r => isOverdue(r)).length,
    completed:   maintenanceRecords.filter(r => r.status === 'completed').length,
    totalCost:   maintenanceRecords.filter(r => r.status === 'completed').reduce((a, r) => a + r.cost, 0),
  }

  return (
    <div className="p-6 space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'In Progress', value: stats.active,    color: 'text-cyan-400' },
          { label: 'Overdue',     value: stats.overdue,   color: stats.overdue > 0 ? 'text-red-400' : 'text-fleet-text' },
          { label: 'Scheduled',   value: stats.scheduled, color: 'text-yellow-400' },
          { label: 'Total Cost (YTD)', value: `$${stats.totalCost.toLocaleString()}`, color: 'text-fleet-amber' },
        ].map(({ label, value, color }) => (
          <div key={label} className="stat-card">
            <div className="section-header">{label}</div>
            <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Overdue banner */}
      {stats.overdue > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 flex items-center gap-3">
          <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
          <span className="text-sm text-red-300">
            <strong>{stats.overdue} maintenance item(s)</strong> are overdue and require immediate attention.
          </span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fleet-subtext" />
          <input
            type="text"
            placeholder="Search maintenance..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-8 w-56 h-9 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-1">
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
        <div className="flex flex-wrap gap-1">
          {PRIORITIES.map(p => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-3 py-1.5 rounded text-xs font-mono capitalize transition-colors ${
                priority === p
                  ? 'bg-fleet-amber text-black font-bold'
                  : 'bg-fleet-surface border border-fleet-border text-fleet-subtext hover:text-fleet-text'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="ml-auto text-xs font-mono text-fleet-subtext">
          {sortedFiltered.length} records
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedFiltered.map(r => <MaintenanceCard key={r.id} record={r} />)}
        {sortedFiltered.length === 0 && (
          <div className="col-span-full py-16 text-center text-fleet-subtext text-sm font-mono">
            No maintenance records match the current filters
          </div>
        )}
      </div>
    </div>
  )
}
