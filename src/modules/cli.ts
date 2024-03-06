import { readPackageUp } from 'read-package-up'
import sade from 'sade'

const packageJsonFile = await readPackageUp({ cwd: import.meta.url })
const cli = sade('kysely')

if (packageJsonFile) {
  const { description, version } = packageJsonFile.packageJson

  cli.version(version)

  if (description) {
    cli.describe(description)
  }
}

export default cli
