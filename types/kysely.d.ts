import type { LogEvent } from 'kysely'

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

export default function highlightQuery(event: LogEvent): string
