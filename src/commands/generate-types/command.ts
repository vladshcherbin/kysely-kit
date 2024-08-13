import { Project } from 'ts-morph'
import cli from '../../modules/cli.js'
import database from '../../modules/database.js'
import generateDatabaseType from './generate-database-type.js'
import generateImports from './generate-imports.js'
import generateKyselyImports from './generate-kysely-imports.js'
import generateOverrides from './generate-overrides.js'
import generateTableTypes from './generate-table-types.js'
import generateTypeAlias from './generate-type-alias.js'
import loadConfig from './load-config.js'
import prettify from './prettify.js'

cli
  .command('generate-types <output>', 'Generate types for your database')
  .example('generate-types types/database.d.ts')
  .action(async (output: string) => {
    const tables = await database.introspection.getTables()
    const publicTables = tables.filter((table) => table.schema === 'public')
    const config = await loadConfig()
    const project = new Project()
    const sourceFile = project.createSourceFile(
      output,
      { statements: generateTableTypes(publicTables) },
      { overwrite: true }
    )

    generateTypeAlias(sourceFile, config)
    generateKyselyImports(sourceFile)
    generateImports(sourceFile, config)
    generateOverrides(sourceFile, config)
    generateDatabaseType(sourceFile, publicTables)

    await prettify(sourceFile)
    await sourceFile.save()
    await database.destroy()

    console.info(`Generated types for ${publicTables.length} tables in ${output}`)
  })
