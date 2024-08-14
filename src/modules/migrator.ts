import fs from 'node:fs/promises'
import path from 'node:path'
import { FileMigrationProvider, Migrator } from 'kysely'
import database from './database.js'

const migrator = new Migrator({
  db: database,
  provider: new FileMigrationProvider({
    fs,
    migrationFolder: `${process.cwd()}/migrations`,
    path
  })
})

export default migrator
