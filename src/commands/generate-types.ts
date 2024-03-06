import { Project } from 'ts-morph'
import cli from '../modules/cli.js'
import database from '../modules/database.js'
import generateDatabaseType from './generate-types/generate-database-type.js'
import generateImports from './generate-types/generate-imports.js'
import generateKyselyImports from './generate-types/generate-kysely-imports.js'
import generateOverrides from './generate-types/generate-overrides.js'
import generateTableTypes from './generate-types/generate-table-types.js'
import generateTypeAlias from './generate-types/generate-type-alias.js'
import loadConfig from './generate-types/load-config.js'
import prettify from './generate-types/prettify.js'

export default function addGenerateTypesCommand() {
  cli
    .command('generate-types <output>', 'Generate types for your database')
    .example('generate-types types/database.d.ts')
    .action(async (output: string) => {
      const tables = await database.introspection.getTables()
      const config = await loadConfig()
      const project = new Project()
      const sourceFile = project.createSourceFile(
        output,
        { statements: generateTableTypes(tables) },
        { overwrite: true }
      )

      generateTypeAlias(sourceFile, config)
      generateKyselyImports(sourceFile)
      generateImports(sourceFile, config)
      generateOverrides(sourceFile, config)
      generateDatabaseType(sourceFile, tables)

      await prettify(sourceFile)
      await sourceFile.save()
      await database.destroy()

      // eslint-disable-next-line no-console
      console.info(`Generated types for ${tables.length} tables in ${output}`)
    })
}
