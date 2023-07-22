import {
  SQL,
  asc,
  desc,
  sql,
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  isNull,
  isNotNull,
  inArray,
  notInArray,
  exists,
  notExists,
  like,
  ilike,
  notIlike,
  and,
  or,
} from 'drizzle-orm'
import { AnyPgTable, SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { ErrorResponse, SelectProps, SuccessResponse } from './types.pg'
import { serverResponse, errorResponse, selectColumns } from '../utils.db'
import { PostgresDatabase } from './connection.pg'
import { env } from 'env'

interface Type {
  id: number
}

const { pageLimit } = env()

export function getOperator(
  operator: string,
  [column, value]: [column: any, value: any]
) {
  switch (operator) {
    //TODO between, notBetween, not
    //     case 'between': return between(column, ...value)
    // case 'notBetween': return notBetween(column, ...value)
    // case 'not': return not(column, value)

    case 'eq':
      return eq(column, value)
    case 'ne':
      return ne(column, value)
    case 'gt':
      return gt(column, value)
    case 'gte':
      return gte(column, value)
    case 'lt':
      return lt(column, value)
    case 'lte':
      return lte(column, value)
    case 'isNull':
      return isNull(column)
    case 'isNotNull':
      return isNotNull(column)
    case 'inArray':
      return inArray(column, value)
    case 'notInArray':
      return notInArray(column, value)
    case 'exists':
      return exists(column)
    case 'notExists':
      return notExists(column)
    case 'like':
      return like(column, `%${value}%`)
    case 'ilike':
      return ilike(column, `%${value}%`)
    case 'notIlike':
      return notIlike(column, `%${value}%`)
    case 'and':
      return and(column, value)
    case 'or':
      return or(column, value)
    default:
      return undefined
  }
}

export const buildWhere = <Schema extends AnyPgTable<{}>>(
  schema: Schema,
  conditions: any = {}
): any => {
  const operator = Object.keys(conditions)[0]
  const values = conditions[operator]

  if (operator === 'and') {
    const transformedConditions = values.map((condition: any) =>
      buildWhere(schema, condition)
    )
    return and(...transformedConditions)
  }

  if (operator === 'or') {
    const transformedConditions = values.map((condition: any) =>
      buildWhere(schema, condition)
    )
    return or(...transformedConditions)
  }

  return getOperator(operator, [(schema as any)[values[0]], values[1]])
}

export function buildOrderBy<Schema extends AnyPgTable<{}>>(
  schema: Schema,
  orderBy: SelectProps<Schema>['orderBy']
) {
  return orderBy?.[0]
    ? ((orderBy || []).map(([column, order]: any) =>
        order === 'asc'
          ? asc((schema as any)[column])
          : desc((schema as any)[column])
      ) as SQL<Type>[])
    : [asc((schema as any).id)]
}

// TODO: omit password

export function dbController(db: PostgresDatabase) {
  return <DataType extends Type, Schema extends AnyPgTable<{}>>({
    schema,
    insertValidate,
    updateValidate,
  }: {
    schema: Schema
    insertValidate: (data: any) => Promise<any>
    updateValidate: (data: any) => Promise<any>
  }) => {
    return {
      schema,

      /* Queries */

      count: (props?: SelectProps<DataType>) =>
        db
          .select({ count: sql<number>`count(*)` })
          .from(schema)
          .where(props?.where as any)
          .then(serverResponse)
          // .then(omitPassword)

          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,

      select: async (props: any) => {
        const select = selectColumns({ schema, columns: props?.columns })
        const orderBy = buildOrderBy(schema, props.orderBy)

        return (
          db
            .select(select)
            .from(schema)
            .where(props?.where)
            .limit(props?.limit)
            .orderBy(...orderBy)
            .groupBy()
            .then(serverResponse)
            // .then(omitPassword)

            .catch(errorResponse(422)) as Promise<
            SuccessResponse<Partial<DataType>> | ErrorResponse
          >
        )
      },

      paginate: async (props: any) => {
        const select = props?.columns
          ? selectColumns({ schema, columns: props.columns })
          : schema

        const page = props?.page || 1
        const limit = props?.limit ? props?.limit : Number(pageLimit)
        const orderBy = buildOrderBy(schema, props.orderBy)

        const sq = await db
          .select({
            id: (schema as any).id,
          })
          .from(schema)
          .orderBy(desc((schema as any).id))
          .limit(1)
          .offset((page - 1) * limit)

        let cursor = undefined

        if (page !== 1) {
          if (props?.orderBy?.[0][1] === 'desc') {
            cursor = lte((schema as any).id, sq[0].id)
          } else {
            cursor = gte((schema as any).id, page * limit)
          }
        }

        const where = props?.where
          ? and(cursor, buildWhere(schema, props.where))
          : cursor

        const total = await db
          .select({
            count: sql<number>`count(${(schema as any).id})`,
          })
          .from(schema)
          .where(props?.where)

        const result = await db
          .select(select)
          .from(schema)
          .where(where)
          .limit(limit)
          .orderBy(...orderBy)
          .groupBy(({ id }) => id)
          .then(serverResponse)
          .catch(errorResponse(422))

        return {
          ...result,
          totalPages: total[0]?.count ?? 0,
        }
      },

      selectById: async ({
        id,
        columns,
      }: {
        id: DataType['id']
        columns?: SelectProps<DataType>['columns']
      }) => {
        const select = columns
          ? selectColumns({ schema, columns: columns })
          : undefined

        const total = await db
          .select({
            count: sql<number>`count(${(schema as any).id})`,
          })
          .from(schema)
          .where(eq((schema as any).id, id) as SQL<Type>)

        const result = await db
          .select(select)
          .from(schema)
          .where(eq((schema as any).id, id) as SQL<Type>)
          .then(serverResponse)
          .catch(errorResponse(422))

        return {
          ...result,
          totalPages: total[0]?.count ?? 0,
        }
      },

      /* Mutations */

      delete: ({
        where,
        returning,
      }: {
        returning?: SelectedFieldsFlat
        where: SelectProps<Type>['where']
      }) =>
        db
          .delete(schema)
          .where(where as any)
          .returning(returning as any)
          .then(serverResponse)
          // .then(omitPassword)
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,

      deleteById: ({
        id,
        returning,
      }: {
        id: DataType['id']
        returning?: SelectedFieldsFlat
      }) =>
        db
          .delete(schema)
          .where(eq((schema as any).id, id) as SQL<DataType>)
          .returning(returning as any)
          .then(serverResponse)
          // .then(omitPassword)
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,

      insert: async <Insert>({
        data,
        returning,
      }: {
        data: Insert
        returning?: SelectedFieldsFlat
      }) =>
        insertValidate(data)
          .then(() => {
            return (
              db
                .insert(schema)
                .values({
                  ...data,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                } as any)
                .returning(returning as any)
                .then(serverResponse)
                // .then(omitPassword)
                .catch(errorResponse(422))
            )
          })
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,

      update: <Update>({
        data,
        where,
        returning,
      }: {
        data: Update
        returning?: SelectedFieldsFlat
        where?: SelectProps<Type>['where']
      }) =>
        updateValidate(data)
          .then(() =>
            db
              .update(schema)
              .set(data as any)
              .where(where as any)
              .returning(returning as any)
              .then(serverResponse)
              // .then(omitPassword)
              .catch(errorResponse(422))
          )
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,

      updateById: <Update>({
        id,
        data,
        returning,
      }: {
        id: DataType['id']
        data: Update
        returning?: SelectedFieldsFlat
      }) =>
        updateValidate(data)
          .then(() =>
            db
              .update(schema)
              .set(data as any)
              .where(eq((schema as any).id, id) as SQL<DataType>)
              .returning(returning as any)
              .then(serverResponse)
              // .then(omitPassword)
              .catch(errorResponse(422))
          )
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,
    }
  }
}
