import { ESLint } from 'eslint'
import type { SourceFile } from 'ts-morph'

export default async function prettify(sourceFile: SourceFile, path: string) {
  const eslint = new ESLint({ fix: true })
  const sourceText = sourceFile.getFullText()
  const [result] = await eslint.lintText(sourceText, { filePath: path })

  if (result?.errorCount) {
    console.error(result.messages[0])

    throw new Error('Failed to prettify')
  }

  sourceFile.replaceWithText(result?.output ?? sourceText)
}
