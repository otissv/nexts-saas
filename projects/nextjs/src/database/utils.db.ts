import { isDev } from 'c-ufunc/libs/isDev'
import { isEmpty } from 'c-ufunc/libs/isEmpty'
import { AnyPgTable } from 'drizzle-orm/pg-core'
import { omit } from 'c-ufunc/libs/omit'
import { SuccessResponse } from './pg/types.pg'

export interface ResponseErrorProps {
  message: string
  name: string
  code?: number
  issues?: Record<string, any>[]
  stack?: string
}

export function createErrorResponse({
  message,
  name,
  code,
  issues,
  stack,
}: ResponseErrorProps) {
  return {
    message: message,
    name: name || 'ResponseError',
    code: code || 422,
    issues: issues || [],
    stack: stack,
  }
}

export function errorResponse(code: number, message?: string) {
  return (error: Error) => {
    //TODO: send error to sentry

    if (isDev()) {
      console.dir(error)
    }

    return {
      data: [],
      totalPages: 0,
      error: createErrorResponse({
        name: error.name,
        message: message || error.message,
        code: code,
        stack: error.stack,
        // @ts-ignore
        issues: error.issues,
      }),
    }
  }
}

export function omitPassword<Type extends Record<string, any>>(
  result: SuccessResponse<Type>
) {
  return {
    ...result,
    data: result.data.map((item) => omit(['password'])(item)),
  }
}

export function selectColumns<Schema extends AnyPgTable<{}>, Type>({
  schema,
  columns,
}: {
  schema: Schema
  columns?: (keyof Type)[]
}) {
  return !isEmpty(columns) && !isEmpty(schema)
    ? (columns || []).reduce(
        (acc, column) => ({
          ...acc,
          [column]: (schema as any)[column],
        }),
        {}
      )
    : (undefined as any)
}

export function serverResponse<Data>(data: Data[]) {
  return {
    data: data || [],
    error: undefined,
    totalPages: data.length ? 1 : 0,
  }
}
