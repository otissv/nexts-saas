import { PostgresDatabase } from '@/database/pg/connection.pg'
import { users as usersSchema } from '@/schema/app.schema'
import { dbController } from '@/database/pg/db-controller.pg'

import {
  userInsertValidate,
  userUpdateValidate,
} from '@/features/app-users/users.validators'

export function usersDb(db: PostgresDatabase) {
  const users = dbController(db)({
    schema: usersSchema,
    insertValidate: userInsertValidate,
    updateValidate: userUpdateValidate,
  })
  return users
}
