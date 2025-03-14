import { Migrator } from 'kysely'
import database from './database.js'
import FileMigrationProvider from './FileMigrationProvider.js'

const migrator = new Migrator({
  db: database,
  provider: new FileMigrationProvider({
    migrationFolder: 'migrations'
  })
})

export default migrator
