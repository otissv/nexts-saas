'use server'

import { serverContext } from '@/app/context-server-only'
import { UserSchema } from '@/schema/app.schema'
import { authorize } from '@/lib/utils-server-only'
import { ActionProps, SeverReturnType } from '@/database/pg/types.pg'
import { User, UserInsert, UserUpdate } from './users.types'
import { errorResponse } from '@/database/utils.db'

const { usersService } = serverContext()

/* Queries */

export async function paginateUsersAction(
  props: Omit<ActionProps<UserSchema>, 'orderBy'> & { orderBy?: string[][] },
  revalidatePath?: string
) {
  const where = props.where && {
    or: [
      { like: ['email', props.where] },
      { like: ['firstName', props.where] },
      { like: ['lastName', props.where] },
    ],
  }

  let orderBy = undefined
  // Replace 'name' to sort by last then first name
  if (props.orderBy) {
    const orderByName = props.orderBy?.find(([key]: string[]) => key === 'name')

    const nameOrder = orderByName?.[1]
    if (nameOrder) {
      orderBy = props.orderBy
        .filter(([key]) => key !== 'name')
        .concat([
          ['lastName', nameOrder],
          ['firstName', nameOrder],
        ])
    } else {
      orderBy = props.orderBy
    }
  }

  return authorize(usersService.paginate)(
    { ...props, where, orderBy },
    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<User>
}

export async function selectUsersAction(
  props: ActionProps<UserSchema>,
  revalidatePath?: string
) {
  return authorize(usersService.select)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<User>
}

export async function selectUserByIdAction(
  {
    id,
    select,
  }: {
    id: User['id']
    select?: ActionProps<UserSchema>
  },
  revalidatePath?: string
) {
  return authorize(usersService.selectById)(
    { id, select },
    revalidatePath
  ).catch(errorResponse(422)) as SeverReturnType<User>
}

/* Mutations */

export async function deleteUserByIdAction(
  id: User['id'],
  revalidatePath?: string
) {
  return authorize(usersService.deleteById)({ id }, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<User>
}

export async function insertUserAction(
  props: { data: UserInsert },
  revalidatePath?: string
) {
  return authorize(usersService.insert)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<User>
}

export async function updateUsersAction<UserUpdate>(
  props: { data: UserUpdate; where: ActionProps<UserSchema>['where'] },
  revalidatePath?: string
) {
  return authorize(usersService.update)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<User>
}

export async function updateUsersByIdAction(
  props: {
    id: User['id']
    data: UserUpdate
  },
  revalidatePath?: string
) {
  return authorize(usersService.updateById)(props, revalidatePath).catch(
    errorResponse(422)
  ) as SeverReturnType<User>
}
