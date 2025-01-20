/* eslint-disable no-await-in-loop, no-restricted-syntax */
import { readdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import type { Migration, MigrationProvider } from 'kysely'
import { isWindows } from 'environment'
import { tsImport } from 'tsx/esm/api'

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

    for (const fileName of files) {
      const filePath = join(process.cwd(), this.migrationFolder, fileName)
      const migration = await tsImport(
        isWindows && !filePath.startsWith('file://') ? `file://${filePath}` : filePath,
        { parentURL: import.meta.url }
      )
      const migrationKey = basename(fileName, extname(fileName))

      migrations[migrationKey] = migration
    }

    return migrations
  }
}
