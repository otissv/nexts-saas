import 'server-only'

import { SQL, eq } from 'drizzle-orm'

import { tenantsDb } from './tenants.db'
import { Tenant } from './tenants.types'
import { PostgresDatabase } from '@/database/connection'
import { errorResponse } from '@/lib/utils-server-only'
import { User } from '@/features/app-users/users.types'
import { tenants as tenantsSchema } from '@/schema/app.schema'
import { ErrorResponse, SuccessResponse } from '@/types'

export function tenantsService(db: PostgresDatabase) {
  const tenants = tenantsDb(db)

  return {
    schema: tenantsSchema,

    /* Queries */

    selectById: ({ id }: { id: Tenant['id'] }) =>
      tenants
        .select({
          where: eq(tenantsSchema.id, id) as SQL<Tenant>,
        })
        .catch(errorResponse(422)),

    selectByEmail: ({ email }: { email: User['email'] }) =>
      tenants.selectByEmail({ email }).catch(errorResponse(422)) as Promise<
        SuccessResponse<Partial<Tenant>> | ErrorResponse
      >,
  }
}
