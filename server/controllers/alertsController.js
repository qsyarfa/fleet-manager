import pool from '../db/index.js'
import { toCamel } from '../utils/camel.js'

export async function getAllAlerts(req, res) {
  try {
    const result = await pool.query(`
      SELECT * FROM alerts
      ORDER BY time DESC
    `)
    res.json(result.rows.map(toCamel))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
