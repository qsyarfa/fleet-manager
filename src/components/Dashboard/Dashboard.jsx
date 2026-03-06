import {
  Truck, Users, MapPin, AlertTriangle,
  TrendingUp, Fuel, Activity, Clock, CheckCircle, XCircle,
} from 'lucide-react'
import {
  vehicles, drivers, trips, alerts, statusCounts, fleetStats, getDriver,
} from '../../data/mockData'

const STATUS_COLOR = {
  active:      'bg-green-400',
  enroute:     'bg-cyan-400',
  idle:        'bg-yellow-400',
  maintenance: 'bg-orange-400',
  offline:     'bg-red-400',
}

const SEVERITY_CLASS = {
  critical: 'border-red-500/40 bg-red-500/10',
  high:     'border-orange-500/40 bg-orange-500/10',
  medium:   'border-yellow-500/40 bg-yellow-500/10',
  low:      'border-fleet-border bg-fleet-surface',
}
const SEVERITY_TEXT = {
  critical: 'text-red-600',
  high:     'text-orange-600',
  medium:   'text-yellow-700',
  low:      'text-fleet-subtext',
}

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon size={16} className="text-black" />
        </div>
        <TrendingUp size={13} className="text-green-600 opacity-60" />
      </div>
      <div>
        <div className="text-2xl font-bold text-fleet-text font-mono">{value}</div>
        <div className="text-xs text-fleet-subtext mt-0.5">{label}</div>
        {sub && <div className="text-xs text-fleet-amber font-mono mt-1">{sub}</div>}
      </div>
    </div>
  )
}

function FuelBar({ vehicle }) {
  const pct = vehicle.fuelLevel
  const color = pct < 20 ? 'bg-red-500' : pct < 40 ? 'bg-yellow-500' : 'bg-green-500'
  return (
    <div className="flex items-center gap-3 py-2 border-b border-fleet-border last:border-0">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_COLOR[vehicle.status]}`} />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-fleet-text truncate font-mono">{vehicle.id}</div>
        <div className="text-xs text-fleet-subtext truncate">{vehicle.name}</div>
      </div>
      <div className="w-24 flex items-center gap-2">
        <div className="progress-bar flex-1">
          <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
        </div>
        <span className={`text-xs font-mono w-8 text-right ${pct < 20 ? 'text-red-600' : 'text-fleet-subtext'}`}>
          {pct}%
        </span>
      </div>
    </div>
  )
}

function ActiveTripRow({ trip }) {
  const driver = getDriver(trip.driverId)
  const vehicle = vehicles.find(v => v.id === trip.vehicleId)
  const start = new Date(trip.startTime)
  const elapsed = Math.round((Date.now() - start) / 60000)

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-fleet-border last:border-0">
      <div className="dot-live flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-fleet-text font-medium truncate">
          {trip.origin} → {trip.destination}
        </div>
        <div className="text-xs text-fleet-subtext font-mono">
          {vehicle?.id} · {driver?.name}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-xs text-fleet-amber font-mono">{trip.distance} mi</div>
        <div className="text-xs text-fleet-subtext font-mono">{elapsed}m elapsed</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const activeTrips = trips.filter(t => t.status === 'in-progress')
  const avgFuel = Math.round(vehicles.reduce((a, v) => a + v.fuelLevel, 0) / vehicles.length)

  return (
    <div className="p-6 space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Truck}
          label="Total Vehicles"
          value={statusCounts.total}
          sub={`${statusCounts.active + statusCounts.enroute} deployed`}
          accent="bg-fleet-amber"
        />
        <StatCard
          icon={Activity}
          label="Active Now"
          value={statusCounts.active + statusCounts.enroute}
          sub={`${statusCounts.idle} idle`}
          accent="bg-green-500"
        />
        <StatCard
          icon={Users}
          label="On-Duty Drivers"
          value={fleetStats.activeDrivers}
          sub={`${drivers.length} total drivers`}
          accent="bg-cyan-500"
        />
        <StatCard
          icon={AlertTriangle}
          label="Critical Alerts"
          value={fleetStats.criticalAlerts}
          sub="Require immediate action"
          accent="bg-red-500"
        />
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="section-header">Fleet Avg Fuel</div>
          <div className="text-3xl font-bold font-mono text-fleet-text">{avgFuel}<span className="text-lg text-fleet-subtext">%</span></div>
          <div className="progress-bar mt-2">
            <div
              className={`h-full rounded-full ${avgFuel < 30 ? 'bg-red-500' : avgFuel < 50 ? 'bg-yellow-500' : 'bg-fleet-amber'}`}
              style={{ width: `${avgFuel}%` }}
            />
          </div>
        </div>
        <div className="stat-card">
          <div className="section-header">Trips Today</div>
          <div className="text-3xl font-bold font-mono text-fleet-text">{activeTrips.length}</div>
          <div className="text-xs text-fleet-subtext mt-1 font-mono">in progress</div>
        </div>
        <div className="stat-card">
          <div className="section-header">Completed Trips</div>
          <div className="text-3xl font-bold font-mono text-fleet-text">{fleetStats.totalTrips}</div>
          <div className="text-xs text-fleet-subtext mt-1 font-mono">all time</div>
        </div>
        <div className="stat-card">
          <div className="section-header">Total Fleet Miles</div>
          <div className="text-3xl font-bold font-mono text-fleet-text">
            {(fleetStats.totalMiles / 1000).toFixed(0)}<span className="text-lg text-fleet-subtext">k</span>
          </div>
          <div className="text-xs text-fleet-subtext mt-1 font-mono">combined driver miles</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Vehicle Status Grid */}
        <div className="lg:col-span-2 bg-fleet-card border border-fleet-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="section-header">Vehicle Status Overview</div>
            <div className="flex gap-3 text-xs font-mono">
              {Object.entries(STATUS_COLOR).map(([s, cls]) => (
                <span key={s} className="flex items-center gap-1 text-fleet-subtext capitalize">
                  <span className={`w-2 h-2 rounded-full ${cls}`} />
                  {statusCounts[s] ?? 0}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {vehicles.map(v => (
              <div
                key={v.id}
                className="bg-fleet-surface border border-fleet-border rounded-lg p-3 flex flex-col gap-1.5 hover:border-fleet-muted transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-fleet-subtext">{v.id}</span>
                  <span className={`w-2 h-2 rounded-full ${STATUS_COLOR[v.status]}`} />
                </div>
                <div className="text-xs text-fleet-text font-medium leading-tight truncate">{v.name.split(' ')[0]}</div>
                <div className="text-xs text-fleet-subtext capitalize">{v.status}</div>
                <div className="progress-bar">
                  <div
                    className={`h-full rounded-full ${v.fuelLevel < 20 ? 'bg-red-500' : v.fuelLevel < 40 ? 'bg-yellow-500' : 'bg-fleet-amber'}`}
                    style={{ width: `${v.fuelLevel}%` }}
                  />
                </div>
                <div className="text-xs font-mono text-fleet-subtext">{v.fuelLevel}% fuel</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-fleet-card border border-fleet-border rounded-lg p-5">
          <div className="section-header mb-4">Active Alerts</div>
          <div className="space-y-2">
            {alerts.map(alert => (
              <div
                key={alert.id}
                className={`rounded-lg border p-3 ${SEVERITY_CLASS[alert.severity]}`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle size={12} className={`mt-0.5 flex-shrink-0 ${SEVERITY_TEXT[alert.severity]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-mono font-bold uppercase ${SEVERITY_TEXT[alert.severity]}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs text-fleet-subtext font-mono">{alert.vehicleId}</span>
                    </div>
                    <p className="text-xs text-fleet-text leading-relaxed">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Trips */}
        <div className="bg-fleet-card border border-fleet-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="section-header">Live Trips</div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-green-600">
              <span className="dot-live" />
              {activeTrips.length} active
            </div>
          </div>
          <div>
            {activeTrips.map(trip => (
              <ActiveTripRow key={trip.id} trip={trip} />
            ))}
          </div>
        </div>

        {/* Fuel Levels */}
        <div className="bg-fleet-card border border-fleet-border rounded-lg p-5">
          <div className="section-header mb-4">Fuel Levels</div>
          <div>
            {vehicles
              .slice()
              .sort((a, b) => a.fuelLevel - b.fuelLevel)
              .map(v => <FuelBar key={v.id} vehicle={v} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
