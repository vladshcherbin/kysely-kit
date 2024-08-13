import { cosmiconfig } from 'cosmiconfig'
import { array, object, optional, parse, record, string } from 'valibot'

const schema = object({
  imports: optional(array(object({
    defaultImport: string(),
    moduleSpecifier: string()
  }))),
  overrides: optional(record(string(), string())),
  types: optional(array(object({
    name: string(),
    type: string()
  })))
})

export default async function loadConfig() {
  const explorer = cosmiconfig('kysely')
  const configuration = await explorer.search()

  return configuration
    ? parse(schema, configuration.config)
    : null
}
