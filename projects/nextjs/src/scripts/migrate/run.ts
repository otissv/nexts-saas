import { migrate } from 'drizzle-orm/postgres-js/migrator'
import fs from 'fs'

import { connection } from '../../database/connection'

import { errorHandler, ignoreSchemas, input } from './utils'

const db = connection()

const getMigrationDirs = (): Promise<string[]> =>
  fs.promises.readdir('./migrations').catch(errorHandler) as any

const migrateSchema = (schemas: string[]): Promise<string[]> => {
  return Promise.all(
    schemas.map((schema) => {
      if (ignoreSchemas.includes(schema)) return Promise.resolve()

      return migrate(db, {
        migrationsFolder: `migrations/${schema}`,
      }).catch(errorHandler)
    })
  ).catch(errorHandler) as any
}

const run = async () => {
  input('Running migrations...')
    .then(console.log)
    .then(getMigrationDirs)
    .then(migrateSchema)
    .catch(errorHandler)
}

run()
