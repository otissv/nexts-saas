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
import {
  AnyPgTable,
  PgTableWithColumns,
  SelectedFieldsFlat,
} from 'drizzle-orm/pg-core'

import {
  ErrorResponse,
  SelectProps,
  SuccessResponse,
} from '@/database/pg/types.pg'
import {
  serverResponse,
  errorResponse,
  selectColumns,
  groupByColumns,
} from '@/database/utils.db'
import { PostgresDatabase } from '@/database/pg/connection.pg'
import { env } from 'env/build'

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

export function buildOrderBy<Schema extends AnyPgTable<{}>, DBTables>(
  schema: Schema,
  orderBy: SelectProps<Schema, DBTables>['orderBy'],
  defaultValue = [asc((schema as any).id)]
) {
  return Boolean(orderBy?.[0])
    ? ((orderBy || []).map(([column, order]: any) =>
        order === 'asc'
          ? asc((schema as any)[column])
          : desc((schema as any)[column])
      ) as SQL<Type>[])
    : defaultValue
}

export function dbController(db: PostgresDatabase) {
  return <
    DataType extends Type,
    Schema extends AnyPgTable<{}>,
    DBTables extends Record<string, PgTableWithColumns<any>>,
  >({
    schema,
    insertValidate,
    updateValidate,
    tables,
  }: {
    schema: Schema
    insertValidate: (data: any) => Promise<any>
    updateValidate: (data: any) => Promise<any>
    tables: DBTables
  }) => {
    return {
      schema,

      /* Queries */

      count: (props?: SelectProps<DataType, DBTables>) =>
        db
          .select({ count: sql<number>`count(*)` })
          .from(schema)
          .where(props?.where as any)
          .then(serverResponse)

          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,

      select: async (props?: SelectProps<DataType, DBTables>) => {
        const select = props?.columns
          ? selectColumns({ schema, columns: props.columns as any, tables })
          : schema

        const groupBy = groupByColumns<Schema, DBTables>({
          schema,
          tables,
          columns: props?.groupBy as any,
        })

        const page = props?.page || 1
        const limit = props?.limit ? props?.limit : Number(pageLimit)
        const orderBy = buildOrderBy(schema, props.orderBy)

        const sq = await db
          .select({
            id: (schema as any).id,
          })
          .from(schema)
          .orderBy(desc((schema as any).id))
          .limit(limit)
          .offset((page - 1) * limit)

        let cursor = undefined

        if (page !== 1) {
          if (props?.orderBy?.[0][1] === 'desc') {
            cursor = lte((schema as any).id, sq[0].id)
          } else {
            cursor = gte((schema as any).id, page * limit)
          }
        }

        let where = props?.where
          ? and(cursor, buildWhere(schema, props.where))
          : cursor

        const total = await db
          .select({
            count: sql<number>`count(${(schema as any).id})`,
          })
          .from(schema)
          .where(props?.where)

        const result = await db
          .select(select as any)
          .from(schema)
          .where(where)
          .limit(limit)
          .orderBy(...orderBy)
          .groupBy(...groupBy)
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
        columns?: SelectProps<DataType, DBTables>['columns']
      }) => {
        const select = columns
          ? selectColumns({
              schema,
              columns: columns as any,
              tables,
            })
          : undefined

        const total = await db
          .select({
            count: sql<number>`count(${(schema as any).id})`,
          })
          .from(schema)
          .where(eq((schema as any).id, id) as SQL<Type>)

        const result = await db
          .select(select as any)
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
        where: SelectProps<Type, DBTables>['where']
      }) =>
        db
          .delete(schema)
          .where(where as any)
          .returning(returning as any)
          .then(serverResponse)
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
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,

      insert: async <Insert>({
        data,
        columns,
      }: {
        data: Insert
        columns?: SelectProps<Insert, DBTables>['columns']
      }) =>
        insertValidate(data)
          .then(() => {
            const returning = columns
              ? selectColumns({
                  schema,
                  columns: columns as any,
                  tables,
                }) || schema
              : schema
            return db
              .insert(schema)
              .values({
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
              } as any)
              .returning(returning as any)
              .then(serverResponse)
              .catch(errorResponse(422))
          })
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >,

      update: <Update>({
        data,
        where,
        columns,
      }: {
        data: Update
        columns?: SelectProps<Update, DBTables>['columns']
        where?: SelectProps<Update, DBTables>['where']
      }) => {
        return updateValidate(data)
          .then(() => {
            const returning = columns
              ? selectColumns({
                  schema,
                  columns: columns as any,
                  tables,
                }) || schema
              : schema

            return db
              .update(schema)
              .set(data as any)
              .where(where as any)
              .returning(returning as any)
              .then(serverResponse)
              .catch(errorResponse(422))
          })
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >
      },

      updateById: <Update>({
        id,
        data,
        columns,
      }: {
        id: DataType['id']
        data: Update
        columns?: SelectProps<Update, DBTables>['columns']
      }) => {
        return updateValidate(data)
          .then(() => {
            const returning = columns
              ? selectColumns({
                  schema,
                  columns: columns as any,
                  tables,
                }) || schema
              : schema

            return db
              .update(schema)
              .set(data as any)
              .where(eq((schema as any).id, id) as SQL<DataType>)
              .returning(returning)
              .then(serverResponse)
              .catch(errorResponse(422))
          })
          .catch(errorResponse(422)) as Promise<
          SuccessResponse<Partial<DataType>> | ErrorResponse
        >
      },
    }
  }
}
