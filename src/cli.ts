import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import generateTypes from './utilities/generate-types.js'

yargs(hideBin(process.argv))
  .command('generate-types', 'Generate database types', {
    output: {
      alias: 'o',
      demandOption: true,
      describe: 'The output file for the generated types'
    }
  }, ({ output }) => generateTypes(output as string))
  .demandCommand(1)
  .parse()
