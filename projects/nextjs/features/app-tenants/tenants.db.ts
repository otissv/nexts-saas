import { SQL, eq } from 'drizzle-orm'

import { PostgresDatabase } from '@/database/pg/connection.pg'
import {
  ErrorResponse,
  SelectProps,
  SuccessResponse,
} from '@/database/pg/types.pg'
import { Tenant } from './tenants.types'
import { users as usersSchema } from 'schema/orm/app.schema'
import { User } from '@/features/app-users/users.types'
import { tenants as tenantsSchema } from '@/schema/orm/app.schema'
import { dbController } from '@/database/pg/db-controller.pg'
import {
  userInsertValidate,
  userUpdateValidate,
} from '@/features/app-users/users.validators'
import {
  tenantInsertValidate,
  tenantUpdateValidate,
} from '@/features/app-tenants/tenants.validator'
import { errorResponse } from '@/database/utils.db'

export function tenantsDb(db: PostgresDatabase) {
  const tenants = dbController(db)<Tenant, typeof tenantsSchema>({
    schema: tenantsSchema,
    insertValidate: tenantInsertValidate,
    updateValidate: tenantUpdateValidate,
  })
  const users = dbController(db)<User, typeof usersSchema>({
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
          // columns: ['tenant_id'],
          where: eq(usersSchema.email, email) as SQL<User>,
        })
        .catch(errorResponse(422))

      const tenantId = userResult.data[0]?.tenantId

      if (!tenantId) return errorResponse(422, 'Tenant not found')

      return tenants
        .select({
          columns,
          where: eq(tenantsSchema.id, tenantId) as SQL<Tenant>,
        })
        .catch(errorResponse(422)) as Promise<
        SuccessResponse<Partial<Tenant> | ErrorResponse>
      >
    },
  }
}
