import { type Kysely, sql } from 'kysely'

export async function up(database: Kysely<any>) {
  await database.schema
    .createTable('')
    .addColumn('id', 'serial', (colummn) => colummn.primaryKey())
    .addColumn('created_at', 'timestamptz', (colummn) => colummn.notNull().defaultTo(sql`now()`))
    .addColumn('updated_at', 'timestamptz')
    .execute()
}

export async function down(database: Kysely<any>) {
  await database.schema
    .dropTable('')
    .execute()
}
