import childProcess from 'child_process'
import utils from 'util'
import fs from 'fs'

export const input = <Value>(value?: Value) => Promise.resolve(value)
export const errorHandler = (error: Error) => {
  console.error(error)
}
export const ignoreSchemas = ['public', 'drizzle', 'test']

export const __exec = utils.promisify(childProcess.exec)
export const exec = (command: string) =>
  __exec(command)
    .then(({ stdout, stderr }) => {
      if (stderr) throw stderr
      return stdout
    })
    .catch(errorHandler)

export const done = (db?: any) => () => {
  console.log('Done.')
  db && db.end()
}

export const fsExists = (path: string) =>
  !fs.existsSync(path) ? exec(`mkdir -p ${path}`) : Promise.resolve()
