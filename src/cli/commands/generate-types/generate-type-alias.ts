import { SourceFile } from 'ts-morph'
import type loadConfig from './load-config.js'

export default function generateTypeAlias(
  sourceFile: SourceFile,
  config: Awaited<ReturnType<typeof loadConfig>>
) {
  if (config?.types?.length) {
    config.types.forEach(({ name, type }) => {
      sourceFile.addTypeAlias({ name, type }).setOrder(0)
    })
  }
}
