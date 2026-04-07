<div align="center">

# FleetOps

### Fleet Management System

A real-time fleet monitoring and management dashboard for commercial vehicle operations.
Built with a dark industrial UI for dispatchers and fleet administrators.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-6.22-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![License](https://img.shields.io/badge/License-MIT-f59e0b?style=flat-square)](LICENSE)

</div>

---

## Features

- **Live Dashboard** — Fleet-wide KPIs, per-vehicle status grid, fuel levels, active trip feed, and critical alerts at a glance
- **Vehicle Fleet** — Searchable and filterable vehicle table with telemetry data (speed, fuel, engine temp, odometer) and a detail modal per vehicle
- **Trip Logs** — Full trip history with expandable rows showing cargo, weight, fuel consumed, and elapsed time for active trips
- **Driver Management** — Driver roster with duty status, CDL license compliance tracking, performance ratings, and expiry alerts
- **Maintenance Tracker** — Priority-sorted maintenance cards (critical → low) with overdue detection, parts lists, technician assignment, and cost tracking

---

## Screenshots

> _Screenshots coming soon._

| Dashboard | Vehicles |
|-----------|----------|
| ![Dashboard](https://placehold.co/600x340/0c0d10/f59e0b?text=Dashboard) | ![Vehicles](https://placehold.co/600x340/0c0d10/06b6d4?text=Vehicles) |

| Drivers | Maintenance |
|---------|-------------|
| ![Drivers](https://placehold.co/600x340/0c0d10/22c55e?text=Drivers) | ![Maintenance](https://placehold.co/600x340/0c0d10/ef4444?text=Maintenance) |

---

## Tech Stack

| Purpose        | Technology               |
|----------------|--------------------------|
| UI Framework   | React 18                 |
| Build Tool     | Vite 5                   |
| Styling        | Tailwind CSS 3           |
| Routing        | React Router v6          |
| Icons          | Lucide React             |
| Fonts          | Inter + JetBrains Mono   |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/qsyarfa/fleet-manager.git

# Navigate into the project
cd fleet-manager

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output is written to `dist/`. Preview the production build with:

```bash
npm run preview
```

---

## Project Structure

```
fleet-manager/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx                              # Route definitions + layout shell
│   ├── main.jsx                             # Entry point
│   ├── index.css                            # Tailwind directives + design system classes
│   ├── data/
│   │   └── mockData.js                      # Mock vehicles, drivers, trips, maintenance
│   └── components/
│       ├── Layout/
│       │   ├── Sidebar.jsx                  # Navigation sidebar
│       │   └── Header.jsx                   # Top bar with search and notifications
│       ├── Dashboard/
│       │   └── Dashboard.jsx                # Live overview page
│       ├── Vehicles/
│       │   └── Vehicles.jsx                 # Vehicle list + detail modal
│       ├── Trips/
│       │   └── Trips.jsx                    # Trip log with filters
│       ├── Drivers/
│       │   └── Drivers.jsx                  # Driver cards + compliance flags
│       └── Maintenance/
│           └── Maintenance.jsx              # Maintenance tracker
├── .claude/
│   └── settings.json                        # Claude Code permission rules
├── CLAUDE.md                                # AI assistant context and conventions
├── tailwind.config.js
├── vite.config.js
├── postcss.config.js
└── package.json
```

---

## Mock Data

The app ships with realistic mock data covering a Midwest US fleet operation:

| Dataset      | Records | Details                                              |
|--------------|---------|------------------------------------------------------|
| Vehicles     | 10      | Heavy trucks and cargo vans with live telemetry      |
| Drivers      | 8       | CDL-A/B drivers with ratings and compliance status   |
| Trips        | 15      | Active, completed, and cancelled trips               |
| Maintenance  | 12      | Pending, in-progress, scheduled, and completed jobs  |
| Alerts       | 6       | Critical and warning-level fleet alerts              |

All data lives in `src/data/mockData.js` and is structured for straightforward replacement with a REST API or WebSocket feed.

---

## Contributing

### Commit Format

```
type: short description
```

| Type | When to use |
|------|-------------|
| `feat` | New feature or page |
| `fix` | Bug fix |
| `style` | UI/CSS changes only |
| `chore` | Config, deps, tooling |
| `docs` | Documentation only |
| `refactor` | Code restructure, no behavior change |

Example: `feat: add fuel alert threshold to dashboard`

### Claude Code

This project includes a `CLAUDE.md` with conventions for AI-assisted development.
Custom slash command available in Claude Code:

- `/new-feature <name>` — scaffolds a new page, route, and nav link

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with React + Vite + Tailwind CSS</sub>
</div>
