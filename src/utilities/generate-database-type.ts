import camelcase from 'camelcase'
import type { TableMetadata } from 'kysely'
import type { SourceFile } from 'ts-morph'

export default function generateDatabaseType(sourceFile: SourceFile, tables: TableMetadata[]) {
  sourceFile.addInterface({
    isExported: true,
    name: 'Database',
    properties: tables.map((table) => ({
      name: camelcase(table.name),
      type: camelcase(`${table.name}Table`, { pascalCase: true })
    }))
  })
}
