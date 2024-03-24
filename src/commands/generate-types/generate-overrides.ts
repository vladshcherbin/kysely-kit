import camelcase from 'camelcase'
import type { SourceFile } from 'ts-morph'
import type loadConfig from './load-config.js'

export default function generateOverrides(
  sourceFile: SourceFile,
  config: Awaited<ReturnType<typeof loadConfig>>
) {
  if (config?.overrides && Object.keys(config.overrides).length) {
    Object.entries(config.overrides).forEach(([column, type]) => {
      const [tableName, columnName] = column.split('.')

      sourceFile
        .getInterfaceOrThrow(camelcase(`${tableName}Table`, { pascalCase: true }))
        .getPropertyOrThrow(camelcase(columnName))
        .setType(type)
    })
  }
}
