import { PageInfo } from '@/database/pg/types.pg'

export function createQueryString<Schema>(params: {
  page?: PageInfo<Schema>['page'] | string
  limit?: PageInfo<Schema>['limit']
  where?: PageInfo<Schema>['where']
  orderBy?: PageInfo<Schema>['orderBy']
}) {
  const searchParams = new URLSearchParams()
  for (let [name, value] of Object.entries(params)) {
    if (typeof value !== 'undefined') {
      searchParams.set(name, stringify(value))
    }
  }

  console.log(searchParams.toString())

  return searchParams.toString()
}

function parseIfJson(value: any) {
  try {
    return JSON.parse(value)
  } catch (_) {
    return value
  }
}

function stringify(value: any) {
  return typeof value !== 'string' ? JSON.stringify(value) : value
}

export function decodeSearchParams(searchParams: Record<string, any> = {}) {
  let params: Record<string, any> = {}

  for (let [name, value] of Object.entries(searchParams)) {
    params[name] = parseIfJson(value)
  }
  return params
}
