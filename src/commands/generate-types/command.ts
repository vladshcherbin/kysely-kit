import { Project } from 'ts-morph'
import cli from '../../modules/cli.js'
import database from '../../modules/database.js'
import generateDatabaseType from './generate-database-type.js'
import generateImports from './generate-imports.js'
import generateOverrides from './generate-overrides.js'
import generateTableTypes from './generate-table-types.js'
import prettify from './prettify.js'

cli
  .command('generate-types <output>', 'Generate types for your database')
  .example('generate-types types/database.d.ts')
  .action(async (output: string) => {
    try {
      const tables = await database.introspection.getTables()
      const publicTables = tables.filter((table) => table.schema === 'public')
      const project = new Project({ tsConfigFilePath: 'tsconfig.json' })
      const sourceFile = project.createSourceFile(
        output,
        { statements: generateTableTypes(publicTables) },
        { overwrite: true }
      )

      generateDatabaseType(sourceFile, publicTables)
      generateOverrides(project, sourceFile)
      generateImports(sourceFile)

      await prettify(sourceFile, output)
      await sourceFile.save()

      console.info(`Generated types for ${publicTables.length} tables in ${output}`)
    } catch (error) {
      console.error(error)
    } finally {
      await database.destroy()
    }
  })
