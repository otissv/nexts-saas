import { PostgresDatabase } from 'database/pg/connection.pg'
import { SQL, eq } from 'drizzle-orm'
import {
  comparePassword,
  doesUserExist,
  hashPassword,
} from 'utils/utils-server-only'
import { checkResultHasData } from 'utils/utils-server-only'
import { errorResponse } from 'database/utils.db'
import { SeverReturnType } from 'database/pg/types.pg'

import { User } from '@/features/app-users/users.types'
import { SignIn, Signup } from '@/features/app-auth/auth.types'
import { signInValidate, signupValidate } from './auth.validators'
import { usersService } from '@/features/app-users/users.service'

export function authService(db: PostgresDatabase) {
  const users = usersService(db)

  return {
    /* Queries */

    signIn: ({ username, password }: SignIn) => {
      return signInValidate({ username, password })
        .then(() =>
          users
            .select({
              where: eq(users.schema.username, username) as SQL<User>,
            })
            .then(checkResultHasData('Invalid username or password'))
            .then(comparePassword(password, 'Invalid username or password'))
            .catch(errorResponse(422))
        )
        .catch(errorResponse(422)) as SeverReturnType<User>
    },

    /* Mutations */

    signup: ({ data }: { data: Signup }) =>
      signupValidate(data).then(
        () =>
          users
            .select({
              columns: ['id', 'username'],
              where: eq(users.schema.username, data.username) as SQL<User>,
            })
            .then(doesUserExist('Username already exists'))
            .then(hashPassword(data))
            .then(users.insert)
            .catch(errorResponse(422)) as SeverReturnType<User>
      ),
  }
}
