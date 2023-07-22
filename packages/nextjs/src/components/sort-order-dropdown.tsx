'use client'

import * as React from 'react'
import { ArrowUpAZ, ArrowDownZA, ChevronsUpDown } from 'lucide-react'
import { SortDirection } from 'database/pg/types.pg'
import { usePushQueryString, useGetSearchParams } from 'hooks/querystring-hook'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { useTranslateClient } from './translate/translate-client'

export interface SortOrderDropdownProps {
  name: string
  children: React.ReactNode
  isPending: boolean
  startTransition: React.TransitionStartFunction
}

export const SortOrderDropdown = <Schema extends Record<string, any>>({
  name,
  children,
  isPending,
  startTransition,
}: SortOrderDropdownProps) => {
  const pushQueryString = usePushQueryString<Schema>(startTransition)
  const t = useTranslateClient('ui.misc')

  const searchParams = useGetSearchParams()
  const item = searchParams?.orderBy?.find(([key]: string[]) => key === name)

  const handleOnClick = (orderDirection: SortDirection) => () => {
    let orderBy = searchParams?.orderBy || []

    if (!orderBy.length) {
      orderBy.push([name, orderDirection])
    } else {
      // @ts-ignore

      if (!item) {
        orderBy.push([name, orderDirection])
      } else if (item) {
        const [_, order] = item as any
        if (orderDirection === order) {
          // @ts-ignore
          orderBy = orderBy.filter(([column]) => {
            return column !== name
          })
        } else {
          // @ts-ignore
          orderBy = orderBy.map(([column, order]) =>
            column === name ? [name, orderDirection] : [column, order]
          )
        }
      }
    }

    pushQueryString({
      ...searchParams,
      orderBy,
    })
  }

  const [_, order] = item || []

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={order ? 'secondary' : 'outline'} className="text-base">
          {children} <ChevronsUpDown className="inline-flex h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-9999 border bg-background rounded pb-2">
        <DropdownMenuLabel className="px-4 py-2">Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-b mb-2" />
        <DropdownMenuItem>
          <Button
            variant={order === 'asc' ? 'secondary' : 'ghost'}
            className="w-full rounded-none justify-start"
            aria-pressed={order === 'asc'}
            onClick={handleOnClick('asc')}
            disabled={isPending}
          >
            <ArrowUpAZ className="inline-flex h-5 w-5 mr-1" />{' '}
            {t('sort.ascending')}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {' '}
          <Button
            variant={order === 'desc' ? 'secondary' : 'ghost'}
            className=" w-full rounded-none justify-start"
            aria-pressed={order === 'desc'}
            onClick={handleOnClick('desc')}
            disabled={isPending}
          >
            <ArrowDownZA className="inline-flex h-5 w-5 mr-2" />{' '}
            {t('sort.descending')}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
SortOrderDropdown.displayName = 'SortOrderDropdown'
