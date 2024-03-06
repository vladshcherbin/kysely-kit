import { SourceFile } from 'ts-morph'
import type loadConfig from './load-config.js'

export default function generateImports(
  sourceFile: SourceFile,
  config: Awaited<ReturnType<typeof loadConfig>>
) {
  if (config?.imports?.length) {
    config.imports.forEach(({ defaultImport, moduleSpecifier }) => {
      sourceFile.addImportDeclaration({
        defaultImport,
        isTypeOnly: true,
        moduleSpecifier
      })
    })
  }
}
