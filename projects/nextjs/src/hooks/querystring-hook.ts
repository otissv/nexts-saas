'use client'

import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { PageInfo } from '@/types'
import { createQueryString, decodeSearchParams } from '@/lib/querystring'

export function useGetSearchParams() {
  const searchParams = useSearchParams()

  let params: Record<string, any> = {}
  let entries = searchParams.entries()
  for (let entry = entries.next(); !entry.done; entry = entries.next()) {
    params[entry.value[0]] = entry.value[1]
  }

  return decodeSearchParams(params)
}

export function useCreateQueryString() {
  return <Schema>(params: PageInfo<Schema>) => createQueryString(params)
}

export function usePushQueryString<Schema>(
  startTransition: React.TransitionStartFunction
) {
  const pathname = usePathname()
  const createQueryString = useCreateQueryString()
  const router = useRouter()

  return (params: PageInfo<Schema>) => {
    console.log(params)
    startTransition(() => {
      router.push(`${pathname}?${createQueryString<Schema>(params)}`)
    })
  }
}
