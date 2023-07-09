/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import util from 'util'
import childProcess from 'child_process'
import fs from 'fs'

export const exec = util.promisify(childProcess.exec)

export const fsOverWriteFile =
  (path: string, content: string, options?: Record<string, any>) => () =>
    fs.promises.writeFile(path, content, {
      encoding: 'utf8',
      flag: 'w',
      ...options,
    })

export const withSideEffectsFirst =
  (promise: () => Promise<void>) =>
  <Data>(data: Data) =>
    promise()
      .then(() => data)
      .catch((error) => error)

export const createPackageJSON = (pkg: Record<string, any>) => () =>
  JSON.stringify({
    ...pkg,
    name: pkg.name,
    version: pkg.version,
    license: pkg.license,
    main: './build/index.js',
    typings: './build/index.d.ts',
    author: pkg.author,
    module: pkg.module,
    publishConfig: {
      access: 'public',
    },
    ...(pkg.peerDependencies ? { peerDependencies: pkg.peerDependencies } : {}),
    ...(pkg.dependencies ? { dependencies: pkg.dependencies } : {}),
    ...(pkg.devDependencies ? { devDependencies: pkg.devDependencies } : {}),
  })

export const getOneValueFromPairs =
  (selected: string) => (list: { readonly [key: string]: string }) =>
    list[selected]

export const getValuesFromPairs =
  (selected: string) => (list: { readonly [key: string]: readonly string[] }) =>
    list[selected]

export const input = <Value>(value: Value): Promise<Value> =>
  Promise.resolve(value)

export const install = () => {
  console.log('Installing dependencies...')
  return exec(`pnpm install`)
}

export const logDone = () => console.log(`Finished building`)

export const logErrors = ({
  stderr,
  stdout,
}: {
  readonly stderr: string
  readonly stdout: string
}) => {
  // eslint-disable-next-line functional/no-conditional-statement
  if (stderr) {
    console.log(stderr)
    return Promise.reject(stderr)
  } else {
    console.log(stdout)
    return Promise.resolve(stdout)
  }
}
