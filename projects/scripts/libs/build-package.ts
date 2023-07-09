/* eslint-disable functional/no-expression-statement */

import { exec, createPackageJSON, logDone, logErrors } from './utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require(`${process.cwd()}/package.json` as any)

const removeTestFile = () => exec(`rimraf  build/**/*.test.*`)

console.log(`Building ${pkg.name} package...`)

exec('tsc --project tsconfig.json && touch build/package.json')
  .then(removeTestFile)
  .then(createPackageJSON(pkg))
  .then((npmPkg) => exec(`echo '${npmPkg}' > build/package.json`))
  .then(logDone)
  .catch(logErrors)
