import fs from 'fs'

import { connection } from '../../database/pg/connection.pg'
import { sql } from 'drizzle-orm'

import { errorHandler, ignoreSchemas, input, exec, fsExists } from './utils'

const db = connection()

const ignore = ['app', ...ignoreSchemas]

const readASchema = (
  schema: string,
  tenant?: string
): Promise<{
  schema: string
  content: string
}> =>
  fs.promises
    .readFile(`./schema/orm/${tenant || schema}.schema.ts`, 'utf8')
    .then((content) => ({
      schema,
      content: content.replace(
        `const SCHEMA = 'tenant'`,
        `const SCHEMA = '${schema}'`
      ),
      // .replace(
      //   `'../config/database/pg/data-types.pg'`,
      //   `'../config/database/pg/data-types.pg'`
      // ),
    }))
    .catch(errorHandler) as any

const writeSchema = ({
  schema,
  content,
}: {
  schema: string
  content: string
}) =>
  fs.promises
    .writeFile(`./schema/.generated/${schema}.schema.ts`, content)
    .catch(errorHandler)

const mkMigrationsDirs = () =>
  fsExists('./migrations')
    .then(() => exec('rm -rf ./schema/.generated'))
    .then(() => exec('mkdir -p ./schema/.generated'))
    .catch(errorHandler)

const generateAppSchema = () =>
  readASchema('app')
    .then(writeSchema)
    .catch(errorHandler)
    .then(() => console.log('Finished generating app schema'))
    .catch(errorHandler) as any

const getTenants = (): Promise<string[]> =>
  db
    .execute(
      sql`
SELECT nspname
FROM pg_catalog.pg_namespace
WHERE nspname NOT LIKE 'pg_%' AND nspname != 'information_schema'AND nspname != 'drizzle' AND nspname != 'public' AND nspname != 'tenant'
ORDER BY nspname;`
    )
    .then((result) => result.map((row) => row.nspname as string))
    .catch(errorHandler) as any

const generateTenantSchema = (tenants: string[]): Promise<string[]> =>
  Promise.all(
    tenants.map((tenant) => {
      if (ignore.includes(tenant)) return Promise.resolve()
      return readASchema(tenant, 'tenant').then(writeSchema)
    })
  )
    .then(() => {
      console.log(`Finished generating tenants schema`)
      return tenants
    })
    .catch(errorHandler) as any

const generateMigrations = (tenants: string[]) => {
  return Promise.all(
    tenants.map((tenant) => {
      exec(
        `npx drizzle-kit generate:pg --out migrations/${tenant} --schema schema/.generated/${tenant}.schema.ts`
      ).catch(errorHandler)
    })
  ).catch(errorHandler)
}

export function generate() {
  input('Generating migrations...')
    .then(console.log)
    .then(mkMigrationsDirs)
    .then(generateAppSchema)
    .then(getTenants)
    .then(generateTenantSchema)
    .then((tenants) => generateMigrations(['app', ...tenants]))
    .then(() => db.end())
    .catch(errorHandler)
}

generate()
