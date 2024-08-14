#!/usr/bin/env node
import './commands/generate-types/command.js'
import './commands/migrate-make/command.js'
import './commands/migrate-up/command.js'
import './commands/migrate-down/command.js'
import './commands/migrate-latest/command.js'
import './commands/migrate-reset/command.js'
import cli from './modules/cli.js'

cli.parse(process.argv)
