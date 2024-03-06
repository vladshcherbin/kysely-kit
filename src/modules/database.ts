import 'dotenv/config'
import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'
import { parse, string } from 'valibot'

const database = new Kysely({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      connectionString: parse(string(), process.env.DATABASE_CONNECTION_STRING),
      max: 1,
      min: 1
    })
  })
})

export default database
