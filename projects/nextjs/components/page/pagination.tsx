'use client'

import * as React from 'react'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import {
  Pagination as UiPagination,
  PaginationContent as UiPaginationContent,
  PaginationEllipsis as UiPaginationEllipsis,
  PaginationItem as UiPaginationItem,
  PaginationLink as UiPaginationLink,
  PaginationNext as UiPaginationNext,
  PaginationPrevious as UiPaginationPrevious,
  PaginationFirstPage as UiPaginationFirstPage,
  PaginationLastPage as UiPaginationLastPage,
} from '@/components/ui/pagination'

import { usePushQueryString } from '@/hooks/querystring-hook'
import { PageInfo } from '@/database/pg/types.pg'
import { env } from 'env'
import { cn } from '@/lib/utils'

const { pageLimit } = env()

export interface PaginationInterface<DataType>
  extends React.HTMLAttributes<HTMLDivElement> {
  limit: number
  orderBy?: PageInfo<DataType>['orderBy']
  page?: PageInfo<DataType>['page']
  siblingCount?: number
  total: number
  where?: PageInfo<DataType>['where']
}

export function usePagination({
  page = 1,
  total = 0,
  limit = pageLimit,
  siblingCount = 1,
}) {
  const [isPending, startTransition] = React.useTransition()
  const pushQueryString = usePushQueryString(startTransition)

  const currentPage = page
  const pageCount = Math.floor(total / limit)

  const paginationRange = React.useMemo(() => {
    const delta =
      siblingCount + (currentPage === 1 || currentPage === total ? 3 : 1)

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

    return range
  }, [pageCount, page, siblingCount])

  return {
    isPending,
    pushQueryString,
    paginationRange,
    currentPage,
    limit,
    pageCount,
    total,
  }
}

export const Pagination = <Schema extends any>({
  limit,
  orderBy,
  page = 1,
  siblingCount = 1,
  where,
  isPending,
  pushQueryString,
  paginationRange,
  currentPage,
  pageCount,
}: PaginationInterface<Schema>) => {
  return (
    <UiPagination>
      <UiPaginationContent>
        <UiPaginationItem>
          <UiPaginationPrevious
            href="#"
            size="sm"
            className="w-auto p-4"
            disabled={Number(currentPage) === 1 || isPending}
            onClick={() =>
              pushQueryString({
                page: `${Number(currentPage) - 1}`,
                limit,
                where,
                orderBy,
              })
            }
          >
            Previous
          </UiPaginationPrevious>
        </UiPaginationItem>

        {paginationRange.map((pageNumber: number, i: number) => {
          return `${pageNumber}` === '...' ? (
            <UiPaginationItem key={i}>
              <UiPaginationEllipsis>...</UiPaginationEllipsis>
            </UiPaginationItem>
          ) : (
            <UiPaginationItem
              key={i}
              className={cn(Number(pageNumber) === pageCount && 'hidden')}
            >
              <UiPaginationLink
                href="#"
                size="sm"
                aria-label={`Page ${pageNumber}`}
                isActive={Number(currentPage) === pageNumber}
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
              </UiPaginationLink>
            </UiPaginationItem>
          )
        })}

        <UiPaginationItem>
          <UiPaginationLink
            href="#"
            size="sm"
            aria-label={`Page ${pageCount}`}
            isActive={Number(currentPage) === pageCount}
            onClick={() =>
              pushQueryString({
                page: pageCount as any,
                limit,
                where,
                orderBy,
              })
            }
            disabled={isPending}
          >
            {pageCount}
          </UiPaginationLink>
        </UiPaginationItem>

        <UiPaginationItem>
          <UiPaginationNext
            href="#"
            size="sm"
            className="w-auto p-4"
            disabled={
              pageCount === 1 ||
              Number(currentPage) === (limit ?? 10) ||
              isPending
            }
            onClick={() =>
              pushQueryString({
                page: `${Number(currentPage) + 1}`,
                limit,
                where,
                orderBy,
              })
            }
          >
            Next
          </UiPaginationNext>
        </UiPaginationItem>
      </UiPaginationContent>
    </UiPagination>
  )
}

Pagination.displayName = 'Pagination'
