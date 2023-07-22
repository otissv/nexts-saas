import 'server-only'

import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'
import { SQL, eq } from 'drizzle-orm'

import { PostgresDatabase } from 'database/pg/connection.pg'
import { errorResponse } from 'database/utils.db'
import { SeverReturnType, SelectProps } from 'database/pg/types.pg'

import { users as usersSchema } from '@/schema/app.schema'
import { User, UserInsert, UserUpdate } from '@/features/app-users/users.types'
import { usersDb } from '@/features/app-users/users.db'

export function usersService(db: PostgresDatabase) {
  const users = usersDb(db)

  return {
    schema: usersSchema,

    /* Queries */

    paginate: (props: SelectProps<User>) =>
      users.paginate(props).catch(errorResponse(422)) as SeverReturnType<User>,

    select: (props: SelectProps<User>) =>
      users.select(props).catch(errorResponse(422)) as SeverReturnType<User>,

    selectById: (props: {
      id: User['id']
      select?: Omit<SelectProps<User>, 'where'>
    }) =>
      users
        .selectById(props)
        .catch(errorResponse(422)) as SeverReturnType<User>,

    /* Mutations */

    // TODO: implement
    changePassword: ({ password, newPassword }: any) => {
      return { data: [], error: new Error('Not implemented') }
    },

    // TODO: change to transaction
    deleteById: ({
      id,
      returning,
    }: {
      id: User['id']
      returning?: SelectedFieldsFlat
    }) =>
      users
        .delete({
          returning,
          where: eq(users.schema.id, id) as SQL<User>,
        })
        .catch(errorResponse(422)) as SeverReturnType<User>,

    insert: (props: { data: UserInsert; returning?: SelectedFieldsFlat }) =>
      users.insert(props).catch(errorResponse(422)) as SeverReturnType<User>,

    update: (props: {
      data: UserUpdate
      returning?: SelectedFieldsFlat
      where?: SelectProps<User>['where']
    }) =>
      users.update(props).catch(errorResponse(422)) as SeverReturnType<User>,

    updateById: (props: {
      id: User['id']
      data: UserUpdate
      returning?: SelectedFieldsFlat
    }) =>
      users
        .updateById(props)
        .catch(errorResponse(422)) as SeverReturnType<User>,
  }
}

export type UsersService = typeof usersService
