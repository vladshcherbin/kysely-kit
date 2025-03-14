import cli from '../../modules/cli.js'
import database from '../../modules/database.js'
import migrator from '../../modules/migrator.js'

cli
  .command('migrate down', 'Revert the last migration')
  .action(async () => {
    try {
      const { error, results } = await migrator.migrateDown()

      if (results?.length) {
        results.forEach(({ migrationName, status }) => {
          if (status === 'Success') {
            console.info(`Migration ${migrationName} rolled back successfully`)
          } else if (status === 'Error') {
            console.error(`Failed to rollback ${migrationName}`)
          }
        })
      } else {
        console.log('No migrations to rollback')
      }

      if (error) {
        console.error(error)
      }
    } catch (error) {
      console.error(error)
    } finally {
      await database.destroy()
    }
  })
