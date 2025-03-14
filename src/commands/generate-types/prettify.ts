import { ESLint } from 'eslint'

export default async function prettify(path: string) {
  const eslint = new ESLint({ fix: true })
  const files = await eslint.lintFiles(path)

  await ESLint.outputFixes(files)
}
