import { PostgresDatabase } from '@/database/pg/connection.pg'
import { SQL, eq } from 'drizzle-orm'

import { checkResultHasData } from '@/lib/utils-server-only'
import { User, UserInsert } from '@/features/app-users/users.types'
import { SignIn, Signup } from '@/features/app-auth/auth.types'
import {
  comparePassword,
  doesUserExist,
  hashPassword,
} from '@/lib/utils-server-only'
import { signInValidate, signupValidate } from './auth.validators'
import { usersService } from '@/features/app-users/users.service'
import { errorResponse } from '@/database/utils.db'

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
            .then(
              comparePassword<Partial<User>>(
                password,
                'Invalid username or password'
              )
            )
            .catch(errorResponse(422))
        )
        .catch(errorResponse(422))
    },

    /* Mutations */

    signup: ({ data }: { data: Signup }) =>
      signupValidate(data).then(() =>
        users
          .select({
            columns: ['id', 'username'],
            where: eq(users.schema.username, data.username) as SQL<User>,
          })
          .then(
            doesUserExist<Partial<User>, Signup>(
              { data },
              'Username already exists'
            )
          )
          .then(hashPassword)
          .then(({ data }: { data: Signup }) =>
            users
              .insert({ data: data as any as UserInsert })
              .catch(errorResponse(422))
          )
          .catch(errorResponse(422))
      ),
  }
}
