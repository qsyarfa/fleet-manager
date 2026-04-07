import pool from '../db/index.js'

export async function getStats(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FILTER (WHERE status = 'active')      FROM vehicles) AS active,
        (SELECT COUNT(*) FILTER (WHERE status = 'enroute')     FROM vehicles) AS enroute,
        (SELECT COUNT(*) FILTER (WHERE status = 'idle')        FROM vehicles) AS idle,
        (SELECT COUNT(*) FILTER (WHERE status = 'maintenance') FROM vehicles) AS maintenance,
        (SELECT COUNT(*) FILTER (WHERE status = 'offline')     FROM vehicles) AS offline,
        (SELECT COUNT(*)                                        FROM vehicles) AS total,
        (SELECT COALESCE(SUM(total_miles), 0)                  FROM drivers)  AS total_miles,
        (SELECT COUNT(*) FROM trips    WHERE status = 'completed') AS total_trips,
        (SELECT COUNT(*) FROM drivers  WHERE status = 'on-duty')   AS active_drivers,
        (SELECT COUNT(*) FROM alerts   WHERE severity = 'critical') AS critical_alerts,
        (SELECT COUNT(*) FROM drivers)                              AS total_drivers
    `)

    const row = result.rows[0]
    res.json({
      statusCounts: {
        active:      parseInt(row.active),
        enroute:     parseInt(row.enroute),
        idle:        parseInt(row.idle),
        maintenance: parseInt(row.maintenance),
        offline:     parseInt(row.offline),
        total:       parseInt(row.total),
      },
      fleetStats: {
        totalMiles:    parseInt(row.total_miles),
        totalTrips:    parseInt(row.total_trips),
        activeDrivers: parseInt(row.active_drivers),
        criticalAlerts:parseInt(row.critical_alerts),
        totalDrivers:  parseInt(row.total_drivers),
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
