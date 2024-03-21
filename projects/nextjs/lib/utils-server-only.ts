import 'server-only'

import { getServerSession } from 'next-auth'

import bcrypt from 'bcrypt'
import { revalidatePath as revalidateCachePath } from 'next/cache'

import { errorResponse } from '@/database/utils.db'
import { SuccessResponse } from '@/database/pg/types.pg'

export function authorize(fn: (...args: any[]) => Promise<any>) {
  return async (...args: any[]) => {
    try {
      const session = await getServerSession()

      if (!session?.user) {
        throw new Error('User not logged in')
      }

      //TODO: ADD ACL Check HERE

      const revalidatePath: string = args.slice(args.length)[0]
      revalidatePath && revalidateCachePath(revalidatePath)

      const props = args.slice(0, args.length - 1)

      return await fn(...props)
    } catch (error) {
      return errorResponse(403)(error as Error)
    }
  }
}

export function checkResultHasData<Data>(message: string) {
  return (result: SuccessResponse<Data>) => {
    try {
      if (result.error) return result

      if (result.data.length === 0) {
        throw new Error(message)
      }

      return result
    } catch (error) {
      return errorResponse(422)(error as Error)
    }
  }
}

export function checkHasTenantId(tenantId: number) {
  return <DbAction extends Function>(dbAction: DbAction) =>
    typeof tenantId !== 'number' || tenantId > 1
      ? () =>
          Promise.resolve(errorResponse(422)(new Error('tenantId is required')))
      : dbAction
}

export function comparePassword<Type extends { password?: string }>(
  password: string,
  message: string
) {
  return async (result: SuccessResponse<Type>) => {
    if (result.error) return result
    const [user] = result.data

    try {
      if (
        !password ||
        !user.password ||
        !(await bcrypt.compare(
          password, // password to be compared
          user.password // hash password
        ))
      ) {
        throw new Error(message)
      }

      return result
    } catch (error) {
      return errorResponse(422)(error as Error)
    }
  }
}

export function doesUserExist<Type>(message: string) {
  return (result: SuccessResponse<Type>) => {
    if (result.data.length) throw new Error(message)
    return result
  }
}

export function hashPassword<Data>(data: Data) {
  return <Type>(result: SuccessResponse<Type>) => {
    if (result.error) throw result.error

    return bcrypt
      .hash((data as any).password as string, 10)
      .then((hashedPassword) => ({
        ...result,
        data: {
          ...data,
          password: hashedPassword,
        },
      }))
  }
}

export function maybeDeleteMutation(tenantId: number) {
  return (query: any) => {
    return async (props: any) => {
      return checkHasTenantId(tenantId)(query)(props)
    }
  }
}

export function maybeInsertMutation(tenantId: number) {
  return (userId: number) => (query: any) => {
    return async <Data, Props extends { data: Data }>(props: Props) => {
      return checkHasTenantId(tenantId)(query)({
        ...props,
        data: {
          ...props.data,
          createdAt: new Date(),
          createdBy: userId,
          updatedAt: new Date(),
          updatedBy: userId,
        },
      })
    }
  }
}

export function maybeUpdateMutation(tenantId: number) {
  return (userId: number) => (query: any) => {
    return async <Data>(props: { data: Data; [key: string]: any }) => {
      return checkHasTenantId(tenantId)(query)({
        ...props,
        data: {
          ...props.data,
          updatedAt: new Date(),
          updatedBy: userId,
        },
      })
    }
  }
}
