import pool from '../db/index.js'
import { toCamel } from '../utils/camel.js'

export async function getAllMaintenance(req, res) {
  try {
    const result = await pool.query(`
      SELECT m.*, v.name AS vehicle_name
      FROM maintenance_records m
      LEFT JOIN vehicles v ON m.vehicle_id = v.id
      ORDER BY m.id
    `)
    res.json(result.rows.map(toCamel))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
