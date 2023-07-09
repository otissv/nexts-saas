'use client'

import React from 'react'

import { Input } from '@/components/ui/input'
import { usePushQueryString } from '@/hooks/querystring-hook'
import { decodeSearchParams } from '@/lib/querystring'

export interface SearchProps extends React.HTMLAttributes<HTMLInputElement> {
  value?: string
  columns: string[]
  searchParams: {
    [key: string]: string | undefined
  }
}

//TODO: Add loading indicator
export const Search = ({
  columns,
  searchParams,
  value = '',
  ...props
}: SearchProps) => {
  const [state, setState] = React.useState(value)
  const { limit } = decodeSearchParams(searchParams)
  const startTransition = React.useTransition()[1]
  const pushQueryString = usePushQueryString<any>(startTransition)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      pushQueryString({
        where: state.trim() !== '' ? state.trim() : undefined,
        page: 1,
        limit,
      })
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  return (
    <Input
      className="h-10"
      value={state}
      onKeyDown={handleKeyDown}
      onChange={handleOnChange}
      {...props}
      placeholder="Filter users"
    />
  )
}
Search.displayName = Search
