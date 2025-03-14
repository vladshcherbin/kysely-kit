import cli from '../../modules/cli.js'
import database from '../../modules/database.js'
import migrator from '../../modules/migrator.js'

cli
  .command('migrate reset', 'Rollback all migrations')
  .action(async () => {
    try {
      const migrations = await migrator.getMigrations()
      const executedMigrations = migrations.filter((migration) => migration.executedAt)

      if (executedMigrations.length) {
        for (const { name } of executedMigrations) {
          // eslint-disable-next-line no-await-in-loop
          await migrator.migrateDown()

          console.info(`Migration ${name} rolled back`)
        }
      }

      console.info('All migrations rolled back successfully')
    } catch (error) {
      console.error('Failed to rollback all migrations')
      console.error(error)
    } finally {
      await database.destroy()
    }
  })
