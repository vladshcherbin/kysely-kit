import camelcase from 'camelcase'
import type { Project, SourceFile } from 'ts-morph'

export default function generateOverrides(project: Project, sourceFile: SourceFile) {
  const config = project.addSourceFileAtPathIfExists('kysely.config.ts')

  if (config) {
    const overrides = config.getInterface('Overrides')

    if (overrides) {
      for (const property of overrides.getProperties()) {
        const propertyName = property.getName()
        const typeName = property.getTypeNodeOrThrow().getText()
        const [table, column] = propertyName.replace(/^'(?<property>.*)'$/, '$<property>').split('.')

        if (!table || !column) {
          throw new Error(`Invalid property format: ${propertyName}`)
        }

        if (table === '*') {
          for (const sourceFileInterface of sourceFile.getInterfaces()) {
            for (const sourceFileProperty of sourceFileInterface.getProperties()) {
              if (sourceFileProperty.getName() === camelcase(column)) {
                sourceFileProperty.setType(typeName)
              }
            }
          }
        } else {
          sourceFile
            .getInterfaceOrThrow(camelcase(`${table}Table`, { pascalCase: true }))
            .getPropertyOrThrow(camelcase(column))
            .setType(typeName)
        }
      }
    }
  }
}
