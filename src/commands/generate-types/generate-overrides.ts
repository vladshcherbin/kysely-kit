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

      if (tableName === '*') {
        sourceFile.getInterfaces().forEach((interface_) => {
          interface_.getProperties().forEach((property) => {
            if (property.getName() === camelcase(columnName)) {
              property.setType(type)
            }
          })
        })
      } else {
        sourceFile
          .getInterfaceOrThrow(camelcase(`${tableName}Table`, { pascalCase: true }))
          .getPropertyOrThrow(camelcase(columnName))
          .setType(type)
      }
    })
  }
}
