#!/usr/bin/env node
import { argv } from 'node:process'
import sade from 'sade'
import packageJson from '../package.json' with { type: 'json' }
import generateTypes from './utilities/generate-types.ts'

sade('kysely-kit <path>', true)
  .version(packageJson.version)
  .describe('Generate database types')
  .example('types/database.d.ts')
  .action(generateTypes)
  .parse(argv)
