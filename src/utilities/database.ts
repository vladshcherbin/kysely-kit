import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

const connectionString = process.env.DATABASE_CONNECTION_STRING

if (!connectionString) {
  throw new Error('DATABASE_CONNECTION_STRING is not set')
}

const database = new Kysely({
  dialect: new PostgresDialect({
    pool: new pg.Pool({ connectionString, max: 1, min: 1 })
  })
})

export default database
