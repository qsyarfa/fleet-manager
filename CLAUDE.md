# FleetOps — CLAUDE.md

## Project Purpose

FleetOps is a Fleet Management System for monitoring and managing a commercial vehicle fleet.
It provides real-time vehicle status, trip tracking, driver compliance, and maintenance scheduling
for a Midwest US trucking operation. All data is currently mocked — the app is structured for a
future REST API or WebSocket integration.

---

## Tech Stack

| Layer       | Technology                              | Version  |
|-------------|------------------------------------------|----------|
| Framework   | React                                    | 18.3     |
| Build tool  | Vite                                     | 5.2      |
| Styling     | Tailwind CSS                             | 3.4      |
| Routing     | react-router-dom (BrowserRouter)         | 6.22     |
| Icons       | lucide-react                             | 0.344    |
| CSS post    | PostCSS + Autoprefixer                   | —        |
| Language    | JavaScript (JSX) — no TypeScript         | —        |

No test framework, no state management library, no charting library. Keep it that way unless
a new feature makes one genuinely necessary.

---

## Commands

```bash
npm run dev       # start local dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

---

## Project Structure

```
fleet-manager/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                        # entry — mounts BrowserRouter + App
    ├── App.jsx                         # route definitions + layout shell
    ├── index.css                       # Tailwind directives + component classes
    ├── data/
    │   └── mockData.js                 # all mock data + helper functions
    └── components/
        ├── Layout/
        │   ├── Sidebar.jsx             # persistent nav with live telemetry indicator
        │   └── Header.jsx              # top bar with search, notifications, user
        ├── Dashboard/
        │   └── Dashboard.jsx           # KPI cards, vehicle grid, alerts, live trips
        ├── Vehicles/
        │   └── Vehicles.jsx            # filterable vehicle table + detail modal
        ├── Trips/
        │   └── Trips.jsx               # trip log table with expandable rows
        ├── Drivers/
        │   └── Drivers.jsx             # driver cards with license compliance flags
        └── Maintenance/
            └── Maintenance.jsx         # maintenance cards sorted by priority/overdue
```

---

## Routes

| Path           | Component     | Purpose                              |
|----------------|---------------|--------------------------------------|
| `/`            | Dashboard     | Live fleet overview                  |
| `/vehicles`    | Vehicles      | Vehicle list, status, telemetry      |
| `/trips`       | Trips         | Trip log with filters                |
| `/drivers`     | Drivers       | Driver roster and compliance         |
| `/maintenance` | Maintenance   | Scheduled and overdue service items  |

Page titles/subtitles are managed in the `PAGE_META` object in `App.jsx`.

---

## Mock Data (`src/data/mockData.js`)

All application data lives here until a real API exists.

**Exported collections:**
- `vehicles` — 10 vehicles with telemetry fields (status, fuelLevel, speed, engineTemp, odometer, etc.)
- `drivers` — 8 drivers with license, rating, duty status, totalMiles, violations
- `trips` — 15 trips (in-progress, completed, cancelled) with cargo and route data
- `maintenanceRecords` — 12 records (pending, in-progress, scheduled, completed)
- `alerts` — 6 fleet alerts with severity levels

**Exported helpers:**
```js
getDriver(driverId)   // → driver object or undefined
getVehicle(vehicleId) // → vehicle object or undefined
statusCounts          // → { active, enroute, idle, maintenance, offline, total }
fleetStats            // → { totalMiles, totalTrips, activeDrivers, criticalAlerts }
```

**Valid enum values:**
- Vehicle status: `active` | `enroute` | `idle` | `maintenance` | `offline`
- Driver status: `on-duty` | `off-duty` | `standby`
- Trip status: `in-progress` | `completed` | `cancelled`
- Maintenance status: `pending` | `in-progress` | `scheduled` | `completed`
- Maintenance priority: `critical` | `high` | `medium` | `low`
- Alert severity: `critical` | `high` | `medium` | `low`

---

## Design System

- Dark industrial theme — use `fleet-*` Tailwind tokens only, never hardcode hex values
- Font: Inter for UI text, JetBrains Mono for all data/IDs/timestamps (`font-mono`)
- Use `.stat-card`, `.badge-*`, `.btn-primary` classes from `index.css` — don't reinvent them
- Status → badge mapping: always use the `STATUS_BADGE` object pattern, not conditional strings

---

## Git Conventions

Commit format: `type: short description`

Types: `feat` | `fix` | `style` | `chore` | `docs` | `refactor`

Example: `feat: add fuel alert threshold to dashboard`

---

## Custom Commands

- `/new-feature <name>` — scaffolds a new page component, route, and nav link for the given feature name

---

## Coding Conventions

### Components
- One component per file. File name matches the default export name.
- Co-locate small sub-components (e.g. `FuelBar`, `StatCard`) inside the same file as the
  page component that owns them. Only extract to a separate file if reused across pages.
- No prop-types or TypeScript — rely on JSDoc comments for complex prop shapes if needed.
- Use named functions for components (`function MyComponent()`) not arrow function assignments.

### State
- Local `useState` only. No global state library.
- Filtering, search, and expanded row state all live in the page component.
- Do not lift state higher than necessary.

### Styling
- Tailwind utility classes first. Use the `fleet-*` color tokens — do not hardcode hex values
  in className strings.
- For status-to-style mappings, define a plain object at the top of the file:
  ```js
  const STATUS_BADGE = { active: 'badge-active', idle: 'badge-idle', ... }
  ```
  Then apply as `className={STATUS_BADGE[status]}`. Do not write conditional class strings.
- Add new shared component classes to `index.css` — not to individual component files.
- Do not use `style={{}}` inline styles unless absolutely unavoidable (e.g. dynamic width for
  progress bars: `style={{ width: \`${pct}%\` }}`).

### Icons
- Use `lucide-react` exclusively. Import only what is used.
- The `Tool` icon does not exist in this version of lucide-react — use `Wrench` instead.
- Standard icon size in tables/badges: `size={11}` or `size={12}`.
- Standard icon size in cards/headers: `size={14}` to `size={16}`.

### Data & IDs
- ID formats: `VH-###` (vehicles), `DRV-###` (drivers), `TRP-####` (trips), `MNT-###` (maintenance), `ALT-###` (alerts).
- Always use `getDriver(id)` and `getVehicle(id)` helpers — never traverse arrays manually.
- When adding new mock data, maintain consistent field names with existing records.

### Routing
- All routes are flat (no nested routes). Add new routes in `App.jsx` and a corresponding
  entry in `PAGE_META`.
- Use `<NavLink>` in the sidebar (it provides `isActive`). Use `<Link>` everywhere else.

### File & Folder Naming
- Folders: PascalCase matching the feature (`Dashboard/`, `Vehicles/`)
- Files: PascalCase (`Dashboard.jsx`, `Sidebar.jsx`)
- Data / utilities: camelCase (`mockData.js`)

---

## What Not To Do

- Do not add a global state library (Redux, Zustand, etc.) unless state genuinely needs to
  cross more than 2 component levels and prop drilling becomes unmanageable.
- Do not install a charting library for simple stats — use CSS progress bars and numeric
  displays instead.
- Do not add TypeScript mid-project without converting all files at once.
- Do not hardcode `fleet-*` color hex values in JSX. Always use the Tailwind token.
- Do not create wrapper components just to name a `<div>`. Keep the component tree shallow.
- Do not add error boundaries, suspense, or lazy loading until the app has real async data.

---

## When Unsure

If a requirement is ambiguous, ask before writing code.
Do not assume — ask one clarifying question.
