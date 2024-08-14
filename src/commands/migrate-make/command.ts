import { mkdir, writeFile } from 'fs/promises'
import cli from '../../modules/cli.js'
import template from './template.js'

cli
  .command('migrate make <name>', 'Create a new migration file with the given name')
  .example('migrate make create-users-table')
  .action(async (name) => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '')
    const directory = `${process.cwd()}/migrations`
    const filename = `${timestamp}-${name}.ts`

    try {
      await mkdir(directory, { recursive: true })
      await writeFile(`${directory}/${filename}`, template)

      console.info(`Migration ${filename} created successfully`)
    } catch (error) {
      console.error(`Failed to create migration ${filename}`)
      console.error(error)
    }
  })
