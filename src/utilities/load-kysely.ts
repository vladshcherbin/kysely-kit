import { findUp } from 'find-up-simple'
import { Kysely } from 'kysely'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { loadEnvFile } from 'node:process'
import { pathToFileURL } from 'node:url'

export default async function loadKysely() {
  const configFilePath = await findUp('kysely.config.ts')

  if (!configFilePath) {
    throw new Error('Unable to find "kysely.config.ts"')
  }

  const envFilePath = join(dirname(configFilePath), '.env')

  if (existsSync(envFilePath)) {
    loadEnvFile(envFilePath)
  }

  const { default: kysely } = await import(pathToFileURL(configFilePath).href) as { default: Kysely<unknown> }

  return kysely
}
