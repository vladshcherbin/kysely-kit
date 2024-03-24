import prettier from 'prettier'
import type { SourceFile } from 'ts-morph'

export default async function prettify(sourceFile: SourceFile) {
  sourceFile.replaceWithText(
    await prettier.format(sourceFile.getFullText(), {
      parser: 'typescript',
      printWidth: 120,
      semi: false,
      singleQuote: true
    })
  )
}
