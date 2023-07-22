'use client'

import * as React from 'react'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { usePushQueryString } from 'hooks/querystring-hook'
import { PageInfo } from 'database/pg/types.pg'

import { Button } from '../ui/button'
import { cn } from '../lib/utils'

export interface PaginationInterface<DataType>
  extends React.HTMLAttributes<HTMLDivElement> {
  limit: number
  orderBy?: PageInfo<DataType>['orderBy']
  page?: PageInfo<DataType>['page']
  siblingCount?: number
  total: number
  where?: PageInfo<DataType>['where']
}

export const Pagination = <Schema extends any>({
  className,
  limit,
  orderBy,
  page = 1,
  siblingCount = 1,
  total,
  where,
  ...props
}: PaginationInterface<Schema>) => {
  const [isPending, startTransition] = React.useTransition()
  const pushQueryString = usePushQueryString<Schema>(startTransition)

  const currentPage = page
  const pageCount = Math.floor(total / limit)

  const paginationRange = React.useMemo(() => {
    const delta = siblingCount + 2

    const range = []
    for (
      let i = Math.max(2, Number(page) - delta);
      i <= Math.min(pageCount, Number(page) + delta);
      i++
    ) {
      range.push(i)
    }

    if (Number(page) - delta > 2) {
      range.unshift('...')
    }
    if (Number(page) + delta < pageCount - 1) {
      range.push('...')
    }

    range.unshift(1)
    // if (pageCount !== 1) {
    //   range.push(pageCount)
    // }

    return range
  }, [pageCount, page, siblingCount])

  return (
    <div className="grid gap-2" {...props}>
      <div
        className={cn(
          'mt-6 flex flex-wrap items-center justify-center gap-2',
          className
        )}
      >
        <Button
          variant="outline"
          className="h-10 w-10 px-0"
          disabled={Number(currentPage) === 1 || isPending}
          onClick={() => pushQueryString({ page: 1, limit, where, orderBy })}
        >
          <ChevronFirst className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">First page</span>
        </Button>

        <Button
          variant="outline"
          className="h-10 w-10 px-0"
          disabled={Number(currentPage) === 1 || isPending}
          onClick={() =>
            pushQueryString({
              page: Number(currentPage) - 1,
              limit,
              where,
              orderBy,
            })
          }
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Previous page</span>
        </Button>

        {paginationRange.map((pageNumber, i) =>
          pageNumber === '...' ? (
            <Button
              aria-label="Page separator"
              key={i}
              variant="outline"
              className="h-10 w-10 px-0"
              disabled
            >
              ...
            </Button>
          ) : (
            <Button
              aria-label={`Page ${pageNumber}`}
              key={i}
              variant={
                Number(currentPage) === pageNumber ? 'default' : 'outline'
              }
              className="h-10 w-10 px-0"
              onClick={() =>
                pushQueryString({
                  page: pageNumber as any,
                  limit,
                  where,
                  orderBy,
                })
              }
              disabled={isPending}
            >
              {pageNumber}
            </Button>
          )
        )}

        <Button
          variant="outline"
          className="h-10 w-10 px-0"
          disabled={Number(currentPage) === (limit ?? 10) || isPending}
          onClick={() =>
            pushQueryString({
              page: Number(currentPage) + 1,
              limit,
              where,
              orderBy,
            })
          }
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Next page</span>
        </Button>

        <Button
          variant="outline"
          className="h-10 w-10 px-0"
          disabled={Number(currentPage) === (limit ?? 10) || isPending}
          onClick={() => {
            pushQueryString({
              page: pageCount,
              limit,
              where,
              orderBy,
            })
          }}
        >
          <ChevronLast className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  )
}

Pagination.displayName = 'Pagination'
