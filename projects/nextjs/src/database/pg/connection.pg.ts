import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '@/config/env'
import { DrizzleConfig } from 'drizzle-orm'

// @ts-ignore
export interface PostgresDatabase extends PostgresJsDatabase {
  end: () => void
}

const { databaseUser, databasePassword, database } = env()

export const connection = (
  config: DrizzleConfig<Record<string, never>> | undefined = {}
) => {
  const pg = postgres(
    `postgres://${databaseUser}:${databasePassword}@0.0.0.0:5432/${database}`
  )
  const db: PostgresDatabase = drizzle(pg, config) as any

  db.end = pg.end

  return db
}
