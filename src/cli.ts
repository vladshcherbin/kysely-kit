#!/usr/bin/env node
import sade from 'sade'
import { description, version } from '../package.json'
import generateTypes from './utilities/generate-types.js'

const cli = sade('kysely')

cli
  .version(version)
  .describe(description)
  // Generate types
  .command('generate-types <filename>', 'Generate types for your database')
  .example('generate-types types/database.d.ts')
  .action((filename: string) => generateTypes(filename))

cli.parse(process.argv)
