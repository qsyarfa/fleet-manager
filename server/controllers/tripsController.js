import pool from '../db/index.js'
import { toCamel } from '../utils/camel.js'

export async function getAllTrips(req, res) {
  try {
    const result = await pool.query(`
      SELECT t.*, d.name AS driver_name, v.name AS vehicle_name
      FROM trips t
      LEFT JOIN drivers d  ON t.driver_id  = d.id
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      ORDER BY t.start_time DESC
    `)
    res.json(result.rows.map(toCamel))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getTripById(req, res) {
  try {
    const result = await pool.query(`
      SELECT t.*, d.name AS driver_name, v.name AS vehicle_name
      FROM trips t
      LEFT JOIN drivers d  ON t.driver_id  = d.id
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      WHERE t.id = $1
    `, [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Trip not found' })
    res.json(toCamel(result.rows[0]))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
