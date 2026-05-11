import { Project } from 'ts-morph'
import generateDatabaseType from './generate-database-type.ts'
import generateImports from './generate-imports.ts'
import generateOverrides from './generate-overrides.ts'
import generateTableTypes from './generate-table-types.ts'
import loadKysely from './load-kysely.ts'
import prettify from './prettify.ts'

export default async function generateTypes(path: string) {
  const database = await loadKysely()

  try {
    const tables = await database.introspection.getTables()
    const publicTables = tables.filter((table) => table.schema === 'public')
    const project = new Project({ tsConfigFilePath: 'tsconfig.json' })
    const sourceFile = project.createSourceFile(
      path,
      { statements: generateTableTypes(publicTables) },
      { overwrite: true }
    )

    generateDatabaseType(sourceFile, publicTables)
    generateOverrides(project, sourceFile)
    generateImports(sourceFile)

    await sourceFile.save()
    await prettify(path)

    console.info(`Generated table definitions: ${publicTables.length}`)
  } catch (error) {
    console.error(error)
  } finally {
    await database.destroy()
  }
}
