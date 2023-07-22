import { SQL, eq } from 'drizzle-orm'

import { PostgresDatabase } from 'database/pg/connection.pg'
import {
  ErrorResponse,
  SelectProps,
  SuccessResponse,
} from 'database/pg/types.pg'
import { dbController } from 'database/pg/db-controller.pg'
import { errorResponse } from 'database/utils.db'
import { users as usersSchema } from 'migrations/schema/app.schema'

import { Tenant } from '@/features/app-tenants/tenants.types'
import { User } from '@/features/app-users/users.types'
import { tenants as tenantsSchema } from '@/schema/app.schema'
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
