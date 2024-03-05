import type { SourceFile } from 'ts-morph'

function hasType(sourceFile: SourceFile, type: string) {
  return sourceFile.getInterfaces().some((tableInterface) => (
    tableInterface.getProperties().some((tableProperty) => (
      tableProperty.getText().includes(type)
    ))
  ))
}

export default function generateKyselyImports(sourceFile: SourceFile) {
  const namedImports: string[] = [];

  ['ColumnType', 'GeneratedAlways', 'JSONColumnType'].forEach((exportName) => {
    if (hasType(sourceFile, exportName)) {
      namedImports.push(exportName)
    }
  })

  if (namedImports.length) {
    sourceFile.addImportDeclaration({
      isTypeOnly: true,
      moduleSpecifier: 'kysely',
      namedImports
    })
  }
}
