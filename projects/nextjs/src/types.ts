import { SQL } from 'drizzle-orm'

export interface Id {
  id: number
}

export type SortDirection = 'asc' | 'desc'

export type PageInfo<DataType> = {
  where?: string
  limit?: number
  orderBy?: [keyof DataType, SortDirection][]
  page?: number
}

export type SelectProps<DataType> = {
  page?: number
  columns?: (keyof DataType)[]
  where?: SQL<DataType>
  limit?: number
  orderBy?: [keyof DataType, SortDirection][]
}

export type ActionProps<DataType> = {
  pageId?: number
  columns?: (keyof DataType)[]
} & PageInfo<DataType>

export type ActionPropsUserById<Schema> = Id & ActionProps<Schema>

export type SuccessResponse<DataType> = {
  data: DataType[]
  error: unknown
}

export type ErrorResponse = {
  data: []
  error: unknown
  pageInfo: unknown
}

export type SeverReturnType<DataType> =
  | Promise<SuccessResponse<Partial<DataType>>>
  | Promise<ErrorResponse>

export type UserSession = {
  id?: string | null
  name?: string | null
  email?: string | null
  image?: string | null
  tenantId?: string
  accessToken?: string
}

export type PageParams = {
  locale: string
}
