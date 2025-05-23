import cli from '../../modules/cli.js'
import database from '../../modules/database.js'
import migrator from '../../modules/migrator.js'

cli
  .command('migrate up', 'Execute the next migration')
  .action(async () => {
    try {
      const { error, results } = await migrator.migrateUp()

      if (results?.length) {
        results.forEach(({ migrationName, status }) => {
          if (status === 'Success') {
            console.info(`Migration ${migrationName} executed successfully`)
          } else if (status === 'Error') {
            console.error(`Failed to execute ${migrationName}`)
          }
        })
      } else {
        console.log('Migrations are up to date')
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
