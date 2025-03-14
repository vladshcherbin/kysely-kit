import type { SourceFile } from 'ts-morph'

export default function generateImports(sourceFile: SourceFile) {
  sourceFile.fixMissingImports({}, {
    importModuleSpecifierEnding: 'js',
    preferTypeOnlyAutoImports: true
  })
}
