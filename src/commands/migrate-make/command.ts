import { copyFile, mkdir } from 'node:fs/promises'
import cli from '../../modules/cli.js'

cli
  .command('migrate make <name>', 'Create a new migration file with the given name')
  .example('migrate make create-users-table')
  .action(async (name: string) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '')
    const directory = `${process.cwd()}/migrations`
    const filename = `${timestamp}-${name}.ts`

    try {
      await mkdir(directory, { recursive: true })
      await copyFile(new URL('./template.ts', import.meta.url), `${directory}/${filename}`)

      console.info(`Migration ${filename} created successfully`)
    } catch (error) {
      console.error(`Failed to create migration ${filename}`)
      console.error(error)
    }
  })
