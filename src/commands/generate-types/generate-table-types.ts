import camelcase from 'camelcase'
import type { TableMetadata } from 'kysely'
import { StatementStructures, StructureKind } from 'ts-morph'
import mapDataType from './map-data-type.js'

export default function generateTableTypes(tables: TableMetadata[]): StatementStructures[] {
  return tables.map((table) => ({
    isExported: true,
    kind: StructureKind.Interface,
    name: camelcase(`${table.name}Table`, { pascalCase: true }),
    properties: table.columns.map((column) => {
      const name = camelcase(column.name)
      let type = mapDataType(column.dataType)

      if (name === 'createdAt' && type === 'Date' && column.hasDefaultValue) {
        type = 'GeneratedAlways<Date>'
      } else if (name === 'updatedAt' && type === 'Date' && column.isNullable) {
        type = 'ColumnType<Date | null, never, Date>'
      } else {
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
