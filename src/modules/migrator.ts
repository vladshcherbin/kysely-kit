import { Migrator } from 'kysely'
import FileMigrationProvider from './FileMigrationProvider.js'
import database from './database.js'

const migrator = new Migrator({
  db: database,
  provider: new FileMigrationProvider({
    migrationFolder: 'migrations'
  })
})

export default migrator
