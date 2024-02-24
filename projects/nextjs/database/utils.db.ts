import { isDev } from 'c-ufunc/libs/isDev'
import { isEmpty } from 'c-ufunc/libs/isEmpty'
import { AnyPgTable, PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core'
import { omit } from 'c-ufunc/libs/omit'
import { SelectProps, SuccessResponse } from './pg/types.pg'
import { SQL, TableAliasProxyHandler, sql } from 'drizzle-orm'

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

export function groupByColumns<Schema extends AnyPgTable<{}>, DBTables>({
  tables,
  schema,
  columns = [],
}: {
  tables: DBTables
  schema: Schema
  columns: SelectProps<Schema, DBTables>['groupBy']
}) {
  if (!columns[0] || !schema || !tables) return []

  return columns
    .map((column) => {
      switch (true) {
        case typeof column === 'string':
          return (schema as any)[column]
        case typeof column === 'function':
          return column(tables)
        default:
          return
      }
    }, [])
    .filter(Boolean)
}

export function omitPassword<Type extends Record<string, any>>(
  result: SuccessResponse<Type>
) {
  return {
    ...result,
    data: result.data.map((item) => omit(['password'])(item)),
  }
}

export function selectColumns<Schema extends AnyPgTable<{}>, DBTables>({
  tables,
  schema,
  columns = [],
}: {
  tables: DBTables
  schema: Schema
  columns?: SelectProps<Schema, DBTables>['columns']
}) {
  if (!columns[0] || !schema || !TableAliasProxyHandler) return

  return columns.reduce((acc, column) => {
    switch (true) {
      case typeof column === 'string':
        return {
          ...acc,
          [column]: (schema as any)[column],
        }

      case typeof column === 'function':
        return tables ? { ...acc, ...column(tables) } : acc

      default:
        return acc
    }
  }, {})
}

export function serverResponse<Data>(data: Data[]) {
  return {
    data: data || [],
    error: undefined,
    totalPages: data.length ? 1 : 0,
  }
}
