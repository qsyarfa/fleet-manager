import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

import vehiclesRouter    from './routes/vehicles.js'
import driversRouter     from './routes/drivers.js'
import tripsRouter       from './routes/trips.js'
import maintenanceRouter from './routes/maintenance.js'
import alertsRouter      from './routes/alerts.js'
import statsRouter       from './routes/stats.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/vehicles',    vehiclesRouter)
app.use('/api/drivers',     driversRouter)
app.use('/api/trips',       tripsRouter)
app.use('/api/maintenance', maintenanceRouter)
app.use('/api/alerts',      alertsRouter)
app.use('/api/stats',       statsRouter)

app.listen(PORT, () => {
  console.log(`FleetOps server running on http://localhost:${PORT}`)
})
