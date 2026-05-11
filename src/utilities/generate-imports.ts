import type { SourceFile } from 'ts-morph'

export default function generateImports(sourceFile: SourceFile) {
  sourceFile.fixMissingImports({}, { preferTypeOnlyAutoImports: true })
}
