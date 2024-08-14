import { readdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import type { Migration, MigrationProvider } from 'kysely'
import { tsImport } from 'tsx/esm/api'
import isMigration from './is-migration.js'

interface FileMigrationProviderProps {
  migrationFolder: string
}

export default class FileMigrationProvider implements MigrationProvider {
  readonly migrationFolder: string

  constructor(props: FileMigrationProviderProps) {
    this.migrationFolder = props.migrationFolder
  }

  async getMigrations(): Promise<Record<string, Migration>> {
    const migrations: Record<string, Migration> = {}
    const files = await readdir(this.migrationFolder)

    // eslint-disable-next-line no-restricted-syntax
    for (const fileName of files) {
      const filePath = join(process.cwd(), this.migrationFolder, fileName)
      // eslint-disable-next-line no-await-in-loop
      const migration = await tsImport(filePath, { parentURL: import.meta.url })
      const migrationKey = basename(fileName, extname(fileName))

      if (isMigration(migration?.default)) {
        migrations[migrationKey] = migration.default
      } else if (isMigration(migration)) {
        migrations[migrationKey] = migration
      } else {
        console.warn(`"${fileName}" is not a migration`)
      }
    }

    return migrations
  }
}
