import { Project } from 'ts-morph'
import database from './database.js'
import generateDatabaseType from './generate-database-type.js'
import generateImports from './generate-imports.js'
import generateKyselyImports from './generate-kysely-imports.js'
import generateOverrides from './generate-overrides.js'
import generateTableTypes from './generate-table-types.js'
import generateTypeAlias from './generate-type-alias.js'
import loadConfig from './load-config.js'
import prettify from './prettify.js'

export default async function generateTypes(output: string) {
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
}
