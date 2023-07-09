import { SQL, eq } from 'drizzle-orm'

import { PostgresDatabase } from '@/database/connection'
import { errorResponse } from '@/lib/utils-server-only'
import { ErrorResponse, SelectProps, SuccessResponse } from '@/types'
import { Tenant } from './tenants.types'
import { users as usersSchema } from 'migrations/schema/app.schema'
import { User } from '@/features/app-users/users.types'
import { tenants as tenantsSchema } from '@/schema/app.schema'
import { dbController } from '@/database/db.module'
import {
  userInsertValidate,
  userUpdateValidate,
} from '@/features/app-users/users.validators'
import {
  tenantInsertValidate,
  tenantUpdateValidate,
} from '@/features/app-tenants/tenants.validator'

export function tenantsDb(db: PostgresDatabase) {
  const tenants = dbController(db)({
    schema: tenantsSchema,
    insertValidate: tenantInsertValidate,
    updateValidate: tenantUpdateValidate,
  })
  const users = dbController(db)({
    schema: usersSchema,
    insertValidate: userInsertValidate,
    updateValidate: userUpdateValidate,
  })

  return {
    schema: tenantsSchema,

    /* Queries */
    select: tenants.select,

    selectByEmail: async ({
      email,
      columns,
    }: {
      email: User['email']
      columns?: SelectProps<Tenant>['columns']
    }) => {
      const userResult = await users
        .select({
          where: eq(usersSchema.email, email) as SQL<User>,
        })
        .catch(errorResponse(422))

      if (!userResult.data.length) return userResult

      const userId = userResult.data[0]?.id as number

      return tenants
        .select({
          columns,
          where: eq(tenantsSchema.ownerId, userId) as SQL<Tenant>,
        })
        .catch(errorResponse(422)) as Promise<
        SuccessResponse<Partial<Tenant> | ErrorResponse>
      >
    },
  }
}
