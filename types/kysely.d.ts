export interface Config {
  imports?: {
    defaultImport: string
    moduleSpecifier: string
  }[]
  overrides?: Record<string, string>
  types?: {
    name: string
    type: string
  }[]
}
