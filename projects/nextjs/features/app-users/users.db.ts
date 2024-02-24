import { SQL, eq } from 'drizzle-orm'

import { PostgresDatabase } from '@/database/pg/connection.pg'
import { users as usersSchema } from '@/schema/orm/app.schema'
import { dbController } from '@/database/pg/db-controller.pg'
import { SelectProps } from '@/database/pg/types.pg'
import {
  userInsertValidate,
  userUpdateValidate,
} from '@/features/app-users/users.validators'
import { User } from '@/features/app-users/users.types'
import { errorResponse } from '@/database/utils.db'

export function usersDb(db: PostgresDatabase) {
  const users = dbController(db)({
    schema: usersSchema,
    insertValidate: userInsertValidate,
    updateValidate: userUpdateValidate,
  })
  return {
    ...users,

    selectByEmail: ({
      email,
      columns,
    }: {
      email: User['email']
      columns?: SelectProps<User>['columns']
    }) => {
      return users
        .select({
          where: eq(usersSchema.email, email) as SQL<User>,
        })
        .catch(errorResponse(422))
    },
  }
}
