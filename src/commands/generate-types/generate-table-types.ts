import camelcase from 'camelcase'
import type { TableMetadata } from 'kysely'
import { StatementStructures, StructureKind } from 'ts-morph'
import mapDataType from './map-data-type.js'

export default function generateTableTypes(tables: TableMetadata[]): StatementStructures[] {
  return tables
    .filter((table) => table.schema === 'public')
    .map((table) => ({
      isExported: true,
      kind: StructureKind.Interface,
      name: camelcase(`${table.name}Table`, { pascalCase: true }),
      properties: table.columns.map((column) => {
        const name = camelcase(column.name)
        const isArray = column.dataType.startsWith('_')
        let type = mapDataType(isArray ? column.dataType.slice(1) : column.dataType)

        if (name === 'createdAt' && type === 'Date' && column.hasDefaultValue) {
          type = 'GeneratedAlways<Date>'
        } else if (name === 'updatedAt' && type === 'Date' && column.isNullable) {
          type = 'ColumnType<Date | null, never, Date>'
        } else {
          if (isArray) {
            type = `${type}[]`
          }

          if (column.isAutoIncrementing) {
            type = `GeneratedAlways<${type}>`
          }

          if (column.isNullable) {
            type = `${type} | null`
          }
        }

        return {
          name,
          type
        }
      })
    }))
}
