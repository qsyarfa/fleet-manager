import pool from '../db/index.js'
import { toCamel } from '../utils/camel.js'

export async function getAllVehicles(req, res) {
  try {
    const result = await pool.query(`
      SELECT v.*, d.name AS driver_name
      FROM vehicles v
      LEFT JOIN drivers d ON v.driver_id = d.id
      ORDER BY v.id
    `)
    res.json(result.rows.map(toCamel))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function getVehicleById(req, res) {
  try {
    const result = await pool.query(`
      SELECT v.*, d.name AS driver_name
      FROM vehicles v
      LEFT JOIN drivers d ON v.driver_id = d.id
      WHERE v.id = $1
    `, [req.params.id])
    if (!result.rows.length) return res.status(404).json({ error: 'Vehicle not found' })
    res.json(toCamel(result.rows[0]))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
