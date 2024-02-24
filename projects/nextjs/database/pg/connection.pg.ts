import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from 'env/build'
import { DrizzleConfig } from 'drizzle-orm'

// @ts-ignore
export interface PostgresDatabase extends PostgresJsDatabase {
  end: (options?: { timeout?: number | undefined }) => Promise<void>
  json: (
    value: postgres.JSONValue
  ) => postgres.Parameter<postgres.SerializableParameter<never>>
}

const {
  user,
  password,
  database,
  host,
  port,
  maxConnections,
  maxLifetime,
  idleTimeout,
} = env().database

export const connection = (
  config: DrizzleConfig<Record<string, never>> | undefined = {}
) => {
  const pg = postgres(
    `postgres://${user}:${password}${host}:${port}/${database}`,
    {
      max_lifetime: Number(maxLifetime),
      max: Number(maxConnections),
      idle_timeout: Number(idleTimeout),
    }
  )
  const db: PostgresDatabase = drizzle(pg, config) as any

  db.end = pg.end
  db.json = pg.json

  return db
}
