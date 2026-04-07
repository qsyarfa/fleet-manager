import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '../.env') })

const { Pool, types } = pg

// Return DATE columns as 'YYYY-MM-DD' strings, not Date objects
types.setTypeParser(1082, val => val)
// Return TIMESTAMP and TIMESTAMPTZ as ISO strings
types.setTypeParser(1114, val => val)
types.setTypeParser(1184, val => val)

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'fleetops',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD,
})

export default pool
