import type { Migration, MigrationProvider } from 'kysely'
import { readdir } from 'node:fs/promises'
import { join } from 'pathe'
import { filename } from 'pathe/utils'
import jiti from './jiti.js'

interface FileMigrationProviderProps {
  migrationFolder: string
}

export default class FileMigrationProvider implements MigrationProvider {
  readonly migrationFolder: string

  constructor(props: FileMigrationProviderProps) {
    this.migrationFolder = props.migrationFolder
  }

  async getMigrations() {
    const migrations: Record<string, Migration> = {}
    const files = await readdir(this.migrationFolder)

    for (const file of files) {
      // eslint-disable-next-line no-await-in-loop
      const migration = await jiti.import<Migration>(
        join(process.cwd(), this.migrationFolder, file)
      )
      const migrationKey = filename(file)

      if (!migrationKey) {
        throw new Error(`Could not determine migration key from file: ${file}`)
      }

      migrations[migrationKey] = migration
    }

    return migrations
  }
}
