import { useState } from 'react'
import { Search, Filter, MapPin, Fuel, Gauge, Thermometer, User } from 'lucide-react'
import { vehicles, getDriver } from '../../data/mockData'

const STATUS_BADGE = {
  active:      'badge-active',
  enroute:     'badge-enroute',
  idle:        'badge-idle',
  maintenance: 'badge-maintenance',
  offline:     'badge-offline',
}

const STATUS_DOT = {
  active:      'bg-green-400',
  enroute:     'bg-cyan-400',
  idle:        'bg-yellow-400',
  maintenance: 'bg-orange-400',
  offline:     'bg-red-400',
}

const STATUSES = ['all', 'active', 'enroute', 'idle', 'maintenance', 'offline']
const TYPES    = ['all', 'Heavy Truck', 'Medium Truck', 'Cargo Van']

function FuelIndicator({ level }) {
  const color = level < 20 ? 'bg-red-500' : level < 40 ? 'bg-yellow-500' : 'bg-green-500'
  const textColor = level < 20 ? 'text-red-400' : level < 40 ? 'text-yellow-400' : 'text-fleet-subtext'
  return (
    <div className="flex items-center gap-2 w-28">
      <div className="progress-bar flex-1">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${level}%` }} />
      </div>
      <span className={`text-xs font-mono w-8 text-right ${textColor}`}>{level}%</span>
    </div>
  )
}

function VehicleDetailModal({ vehicle, onClose }) {
  const driver = getDriver(vehicle.driverId)
  const lastPing = new Date(vehicle.lastPing)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-fleet-card border border-fleet-border rounded-xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-fleet-border flex items-start justify-between">
          <div>
            <div className="text-xs font-mono text-fleet-subtext">{vehicle.id}</div>
            <div className="text-lg font-bold text-fleet-text mt-0.5">{vehicle.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={STATUS_BADGE[vehicle.status]}>{vehicle.status}</span>
              <span className="text-xs text-fleet-subtext font-mono">{vehicle.type} · {vehicle.year}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-fleet-subtext hover:text-fleet-text transition-colors text-xl leading-none">×</button>
        </div>

        <div className="p-6 space-y-4">
          {/* Telemetry */}
          <div>
            <div className="section-header mb-3">Live Telemetry</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-fleet-surface rounded-lg p-3 text-center">
                <Gauge size={14} className="mx-auto text-fleet-amber mb-1" />
                <div className="text-xl font-bold font-mono text-fleet-text">{vehicle.speed}</div>
                <div className="text-xs text-fleet-subtext">mph</div>
              </div>
              <div className="bg-fleet-surface rounded-lg p-3 text-center">
                <Fuel size={14} className={`mx-auto mb-1 ${vehicle.fuelLevel < 20 ? 'text-red-400' : 'text-fleet-amber'}`} />
                <div className={`text-xl font-bold font-mono ${vehicle.fuelLevel < 20 ? 'text-red-400' : 'text-fleet-text'}`}>{vehicle.fuelLevel}%</div>
                <div className="text-xs text-fleet-subtext">fuel</div>
              </div>
              <div className="bg-fleet-surface rounded-lg p-3 text-center">
                <Thermometer size={14} className="mx-auto text-cyan-400 mb-1" />
                <div className="text-xl font-bold font-mono text-fleet-text">{vehicle.engineTemp}°</div>
                <div className="text-xs text-fleet-subtext">engine °F</div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="section-header mb-3">Vehicle Details</div>
            <div className="space-y-2 font-mono text-sm">
              {[
                ['License Plate', vehicle.plate],
                ['Odometer', `${vehicle.odometer.toLocaleString()} mi`],
                ['Next Service', vehicle.nextService],
                ['Last Ping', lastPing.toLocaleString()],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between border-b border-fleet-border pb-2">
                  <span className="text-fleet-subtext text-xs">{label}</span>
                  <span className="text-fleet-text text-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Driver */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-fleet-surface rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={12} className="text-fleet-amber" />
                <span className="text-xs text-fleet-subtext font-mono">Location</span>
              </div>
              <div className="text-xs text-fleet-text">{vehicle.location}</div>
            </div>
            <div className="bg-fleet-surface rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <User size={12} className="text-fleet-amber" />
                <span className="text-xs text-fleet-subtext font-mono">Driver</span>
              </div>
              <div className="text-xs text-fleet-text">{driver ? driver.name : '— Unassigned'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Vehicles() {
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('all')
  const [type, setType]         = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = vehicles.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase())
      || v.id.toLowerCase().includes(search.toLowerCase())
      || v.plate.toLowerCase().includes(search.toLowerCase())
    const matchStatus = status === 'all' || v.status === status
    const matchType   = type === 'all' || v.type === type
    return matchSearch && matchStatus && matchType
  })

  return (
    <div className="p-6 space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-fleet-subtext" />
          <input
            type="text"
            placeholder="Search vehicles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-8 w-56 h-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-fleet-subtext" />
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="input-field h-9 text-sm pr-8 capitalize"
          >
            {STATUSES.map(s => <option key={s} value={s} className="bg-fleet-card capitalize">{s}</option>)}
          </select>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="input-field h-9 text-sm pr-8"
          >
            {TYPES.map(t => <option key={t} value={t} className="bg-fleet-card">{t}</option>)}
          </select>
        </div>
        <div className="ml-auto text-xs font-mono text-fleet-subtext">
          {filtered.length} / {vehicles.length} vehicles
        </div>
      </div>

      {/* Table */}
      <div className="bg-fleet-card border border-fleet-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-fleet-surface border-b border-fleet-border">
              <tr>
                {['Vehicle', 'Type', 'Status', 'Driver', 'Location', 'Fuel', 'Speed', 'Odometer', 'Next Service'].map(h => (
                  <th key={h} className="table-head whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => {
                const driver = getDriver(v.driverId)
                return (
                  <tr
                    key={v.id}
                    className="table-row cursor-pointer"
                    onClick={() => setSelected(v)}
                  >
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[v.status]}`} />
                        <div>
                          <div className="text-fleet-text font-medium text-sm">{v.name}</div>
                          <div className="text-fleet-subtext text-xs font-mono">{v.id} · {v.plate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="text-fleet-subtext text-xs">{v.type}</span>
                    </td>
                    <td className="table-cell">
                      <span className={STATUS_BADGE[v.status]}>{v.status}</span>
                    </td>
                    <td className="table-cell">
                      <span className="text-sm text-fleet-text">{driver ? driver.name : <span className="text-fleet-subtext italic">Unassigned</span>}</span>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1 max-w-[180px]">
                        <MapPin size={11} className="text-fleet-subtext flex-shrink-0" />
                        <span className="text-xs text-fleet-subtext truncate">{v.location}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <FuelIndicator level={v.fuelLevel} />
                    </td>
                    <td className="table-cell">
                      <span className="font-mono text-sm text-fleet-text">{v.speed} <span className="text-fleet-subtext text-xs">mph</span></span>
                    </td>
                    <td className="table-cell">
                      <span className="font-mono text-sm text-fleet-text">{v.odometer.toLocaleString()} <span className="text-fleet-subtext text-xs">mi</span></span>
                    </td>
                    <td className="table-cell">
                      <span className={`text-xs font-mono ${new Date(v.nextService) <= new Date() ? 'text-red-400' : 'text-fleet-subtext'}`}>
                        {v.nextService}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-fleet-subtext text-sm font-mono">
            No vehicles match the current filters
          </div>
        )}
      </div>

      {selected && <VehicleDetailModal vehicle={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
