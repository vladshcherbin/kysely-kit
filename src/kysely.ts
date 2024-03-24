#!/usr/bin/env node
import addGenerateTypesCommand from './commands/generate-types.js'
import cli from './modules/cli.js'

addGenerateTypesCommand()

cli.parse(process.argv)
