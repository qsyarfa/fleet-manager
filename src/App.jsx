import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Dashboard from './components/Dashboard/Dashboard'
import Vehicles from './components/Vehicles/Vehicles'
import Trips from './components/Trips/Trips'
import Drivers from './components/Drivers/Drivers'
import Maintenance from './components/Maintenance/Maintenance'

const PAGE_META = {
  '/':            { title: 'Live Dashboard',     subtitle: 'Real-time fleet overview · Midwest US' },
  '/vehicles':    { title: 'Vehicle Fleet',      subtitle: 'Manage and monitor all vehicles' },
  '/trips':       { title: 'Trip Logs',          subtitle: 'Active and historical trip records' },
  '/drivers':     { title: 'Driver Management',  subtitle: 'Driver roster, status, and compliance' },
  '/maintenance': { title: 'Maintenance Tracker',subtitle: 'Scheduled and overdue maintenance records' },
}

export default function App() {
  const location = useLocation()
  const meta = PAGE_META[location.pathname] ?? PAGE_META['/']

  return (
    <div className="flex h-screen overflow-hidden bg-fleet-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/"            element={<Dashboard />} />
            <Route path="/vehicles"    element={<Vehicles />} />
            <Route path="/trips"       element={<Trips />} />
            <Route path="/drivers"     element={<Drivers />} />
            <Route path="/maintenance" element={<Maintenance />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
