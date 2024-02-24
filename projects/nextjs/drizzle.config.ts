import type { Config } from 'drizzle-kit'
import * as dotenv from 'dotenv'
dotenv.config()

import { env } from 'env'

const { user, password, host, port, database } = env().database

export default {
  schema: './schema/.generated/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: `postgres://${user}:${password}${host}:${port}/${database}`,
  },
} satisfies Config
