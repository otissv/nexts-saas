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

import {
  ErrorResponse,
  SelectProps,
  SuccessResponse,
} from '@/database/pg/types.pg'
import {
  serverResponse,
  errorResponse,
  selectColumns,
} from '@/lib/utils-server-only'
import { PostgresDatabase } from '@/database/pg/connection.pg'
import { env } from '@/config/env'

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
  return Boolean(orderBy?.[0])
    ? ((orderBy || []).map(([column, order]: any) =>
        order === 'asc'
          ? asc((schema as any)[column])
          : desc((schema as any)[column])
      ) as SQL<Type>[])
    : [asc((schema as any).id)]
}

export function sqlRowEstimate<Schema extends AnyPgTable<{}>>(schema: Schema) {
  return sql`
    SELECT reltuples::bigint AS estimate
    FROM   pg_class
    WHERE  oid = to_regclass('${schema}');
  `
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
          ? {
              ...selectColumns({ schema, columns: props.columns }),
              rowCount: sql<number>`count(*)`,
            }
          : { ...schema, rowCount: sql<number>`count(*)` }

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
            cursor = gte((schema as any).id, page + limit)
          }
        }

        let where = props?.where
          ? and(cursor, buildWhere(schema, props.where))
          : cursor

        return db
          .select(select)
          .from(schema)
          .where(where)
          .limit(limit)
          .orderBy(...orderBy)
          .groupBy(({ id }) => id)
          .then(serverResponse)
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >
      },

      selectById: ({
        id,
        columns,
      }: {
        id: DataType['id']
        columns?: SelectProps<DataType>['columns']
      }) => {
        const select = columns
          ? selectColumns({ schema, columns: columns })
          : undefined

        return db
          .select(select)
          .from(schema)
          .where(eq((schema as any).id, id) as SQL<Type>)
          .then(serverResponse)
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >
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

      insert: <Insert>({
        data,
        returning,
      }: {
        data: Insert
        returning?: SelectedFieldsFlat
      }) =>
        insertValidate(data)
          .then(() =>
            db
              .insert(schema)
              .values(data as any)
              .returning(returning as any)
              .then(serverResponse)
              // .then(omitPassword)
              .catch(errorResponse(422))
          )
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
