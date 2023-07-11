import 'server-only'

import { getServerSession } from 'next-auth/next'
import bcrypt from 'bcrypt'
import { revalidatePath as revalidateCachePath } from 'next/cache'

import { errorResponse } from '@/database/utils.db'
import { ErrorResponse, SuccessResponse } from '@/database/pg/types.pg'

export function authorize(fn: (...args: any[]) => Promise<any>) {
  return async (...args: any[]) => {
    try {
      const session = await getServerSession()

      if (!session?.user) {
        throw new Error('User not logged in')
      }

      const revalidatePath: string = args.slice(args.length)[0]
      revalidatePath && revalidateCachePath(revalidatePath)

      const props = args.slice(0, args.length - 1)

      return await fn(...props)
    } catch (error) {
      return errorResponse(403)(error as Error)
    }
  }
}
export function authorized(fn: Function) {
  return async (revalidatePath?: string) => {
    try {
      const session = await getServerSession()

      if (!session?.user) {
        throw new Error('User not logged in')
      }

      revalidatePath && revalidateCachePath(revalidatePath)
      return fn()
    } catch (error) {
      return errorResponse(403)(error as Error)
    }
  }
}

export function checkResultHasData<Data>(message: string) {
  return (result: SuccessResponse<Data> | ErrorResponse) => {
    try {
      if ((result as ErrorResponse).error) return result

      if (result.data.length === 0) {
        throw new Error(message)
      }

      return result
    } catch (error) {
      return errorResponse(422)(error as Error)
    }
  }
}

export function checkHasTenantId(tenantId: string) {
  return <DbAction extends Function>(dbAction: DbAction) =>
    typeof tenantId !== 'string' || tenantId.trim() === ''
      ? () =>
          Promise.resolve(errorResponse(422)(new Error('tenantId is required')))
      : dbAction
}

export function comparePassword<Type extends { password?: string }>(
  password: string,
  message: string
) {
  return async (result: SuccessResponse<Type>) => {
    try {
      if (!result.data.length) return result

      const [user] = result.data
      if (
        !password ||
        !user.password ||
        (await bcrypt.compare(
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

export function doesUserExist<Type, Data>(
  { data }: { data: Data },
  message: string
) {
  return (result: SuccessResponse<Type>) => {
    if (result.data.length) throw new Error(message)
    return { data }
  }
}

export function hashPassword<Data>({ data }: { data: Data }) {
  return bcrypt
    .hash((data as any).password as string, 10)
    .then((hashPassword) => ({
      data: {
        ...data,
        password: hashPassword,
      },
    }))
}
