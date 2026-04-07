import pool from '../db/index.js'
import { toCamel } from '../utils/camel.js'

export async function getAllDrivers(req, res) {
  try {
    const result = await pool.query(`
      SELECT d.*, v.name AS vehicle_name
      FROM drivers d
      LEFT JOIN vehicles v ON d.vehicle_id = v.id
      ORDER BY d.id
    `)
    res.json(result.rows.map(toCamel))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getDriverById(req, res) {
  try {
    const result = await pool.query(`
      SELECT d.*, v.name AS vehicle_name
      FROM drivers d
      LEFT JOIN vehicles v ON d.vehicle_id = v.id
      WHERE d.id = $1
    `, [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Driver not found' })
    res.json(toCamel(result.rows[0]))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
