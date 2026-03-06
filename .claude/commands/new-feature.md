Add a new page feature called **$ARGUMENTS** to the FleetOps Fleet Manager app.

Follow every step below in order. Do not skip any step.

---

## Step 1 — Derive naming conventions

From the feature name `$ARGUMENTS`, derive:

- **PascalCase** — for the component name and folder (e.g. `FuelReports`)
- **kebab-case** — for the route path (e.g. `fuel-reports`)
- **Title Case** — for the nav label and page title (e.g. `Fuel Reports`)
- **camelCase** — for mock data variable names (e.g. `fuelReports`)

Use these consistently across all files touched below.

---

## Step 2 — Create the page component

Create `src/components/{PascalCase}/{PascalCase}.jsx`.

The file must follow the exact conventions of existing pages in this project:

- Use a named `function` export (not an arrow function assignment)
- Import only from `lucide-react` and `../../data/mockData`
- Start with a summary stats row using `.stat-card` divs
- Include a search `<input>` using the `.input-field` class
- Include filter toggle buttons styled with `bg-fleet-amber text-black` for active, `bg-fleet-surface border border-fleet-border` for inactive
- Display data in either a `.table-row` / `.table-cell` table or a card grid — choose whichever suits the data shape
- Use `fleet-*` Tailwind color tokens only — no hardcoded hex values
- Use `font-mono` for all IDs, numbers, timestamps, and codes
- Use `.section-header` for all section labels
- Use `.badge-active`, `.badge-idle`, `.badge-offline`, `.badge-maintenance`, `.badge-enroute` for status badges
- Empty state: render a centered `font-mono text-fleet-subtext` message when filtered results are empty

Scaffold the component with realistic placeholder content that fits the fleet management domain.
If the feature clearly requires data that doesn't exist yet, proceed to Step 3 first, then return here.

---

## Step 3 — Add mock data (if needed)

Open `src/data/mockData.js` and read its existing structure before editing.

Only add data if the new feature requires records that don't already exist. If existing
collections (vehicles, drivers, trips, maintenanceRecords, alerts) are sufficient, skip this step.

When adding new data:
- Follow the exact same field naming style as existing collections (camelCase fields, string IDs)
- Use ID format `{PREFIX}-###` consistent with the feature (e.g. `RPT-001`, `GEO-001`)
- Export the new array and any helper functions at the bottom of the file alongside existing exports
- Do not modify or rename any existing exports — only append

---

## Step 4 — Register the route in App.jsx

Read `src/App.jsx` before editing.

Make two additions:

1. Add the import at the top, grouped with the other page imports:
   ```js
   import {PascalCase} from './components/{PascalCase}/{PascalCase}'
   ```

2. Add an entry to the `PAGE_META` object:
   ```js
   '/{kebab-case}': { title: '{Title Case}', subtitle: '<one-line description of the page>' },
   ```

3. Add the route inside `<Routes>`:
   ```jsx
   <Route path="/{kebab-case}" element={<{PascalCase} />} />
   ```

Keep the same alignment and formatting as the existing routes.

---

## Step 5 — Add the nav link in Sidebar.jsx

Read `src/components/Layout/Sidebar.jsx` before editing.

Make two additions:

1. Import the appropriate icon from `lucide-react`. Choose an icon that fits the feature
   semantically. Check existing imports first and pick a different icon from the ones already used:
   - Already used: `LayoutDashboard`, `Truck`, `MapPin`, `Users`, `Wrench`, `ChevronRight`, `Radio`, `AlertTriangle`

2. Add an entry to the `navItems` array, following the same format:
   ```js
   { to: '/{kebab-case}', icon: {ChosenIcon}, label: '{Title Case}' },
   ```
   Place it in a logical position relative to the existing nav items.

---

## Step 6 — Verify

After completing all steps, confirm:

- [ ] `src/components/{PascalCase}/{PascalCase}.jsx` exists and has a valid default export
- [ ] `src/data/mockData.js` has any required new data appended (or was intentionally unchanged)
- [ ] `src/App.jsx` has the new import, `PAGE_META` entry, and `<Route>`
- [ ] `src/components/Layout/Sidebar.jsx` has the new icon import and `navItems` entry
- [ ] No existing exports, routes, or nav items were removed or renamed
- [ ] All new code uses `fleet-*` color tokens and follows the `.stat-card` / `.badge-*` / `.input-field` patterns from `src/index.css`

Then run:
```bash
npm run build
```

If the build fails, fix all errors before finishing. Do not leave the project in a broken state.
