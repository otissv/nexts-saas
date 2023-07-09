import { PostgresDatabase } from '@/database/connection'
import { users as usersSchema } from '@/schema/app.schema'
import { dbController } from '@/database/db.module'

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
