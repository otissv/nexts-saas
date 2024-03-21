import { SQL } from 'drizzle-orm'
import { PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core'

export interface Id {
  id: number
}

export type SortDirection = 'asc' | 'desc'

export type SelectProps<DataType, DBTables> = {
  columns?: (keyof DataType | ((tables: DBTables) => { [key: string]: any }))[]
  limit?: number
  orderBy?: [keyof DataType, SortDirection][]
  page?: PageInfo<DataType>['page']
  where?: SQL<DataType> | ((tables: DBTables) => SQL<DataType>)
  groupBy?: (keyof DataType | ((tables: DBTables) => PgColumn<any>))[]
}

export type PageInfo<DataType> = {
  limit?: number
  orderBy?: [keyof DataType, SortDirection][]
  page?: number
  where?: SQL<DataType>
}

export type ActionProps<DataType> = {
  pageId?: number
} & SelectProps<DataType, Record<string, PgTableWithColumns<any>>>

export type ActionPropsUserById<Schema, Table> = Id & ActionProps<Schema>

export type SuccessResponse<DataType> = {
  data: DataType[]
  error: unknown
  totalPages: number
}

export type ErrorResponse = {
  data: []
  error: unknown
  totalPages: number
}

export type SeverReturnType<DataType> =
  | Promise<SuccessResponse<Partial<DataType>>>
  | Promise<ErrorResponse>
