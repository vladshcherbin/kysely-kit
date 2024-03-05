import { cosmiconfig } from 'cosmiconfig'

type Config = {
  imports?: {
    defaultImport: string
    moduleSpecifier: string
  }[]
  overrides?: {
    [key: string]: string
  }
  types?: {
    name: string
    type: string
  }[]
}

export default async function loadConfig() {
  const explorer = cosmiconfig('kysely-kit')
  const configuration = await explorer.search()

  if (!configuration) {
    return null
  }

  return configuration.config as Config
}
