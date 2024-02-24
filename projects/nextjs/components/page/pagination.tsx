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
  total,
  limit = pageLimit,
  siblingCount = 1,
}) {
  const [isPending, startTransition] = React.useTransition()
  const pushQueryString = usePushQueryString(startTransition)

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

  return {
    isPending,
    pushQueryString,
    paginationRange,
    currentPage,
    limit,
    pageCount,
  }
}

export const Pagination = <Schema extends any>({
  limit,
  orderBy,
  page = 1,
  siblingCount = 1,
  total,
  where,
  isPending,
  pushQueryString,
  paginationRange,
  currentPage,
  pageCount,
}: PaginationInterface<Schema>) => {
  // const { isPending, pushQueryString, paginationRange, currentPage } =
  //   usePagination<Schema>({
  //     page,
  //     total,
  //     limit,
  //     siblingCount,
  //   })

  return (
    <UiPagination>
      <UiPaginationContent>
        <UiPaginationItem>
          <UiPaginationFirstPage
            href="#"
            size="sm"
            disabled={Number(currentPage) === 1 || isPending}
            onClick={() =>
              pushQueryString({ page: '1', limit, where, orderBy })
            }
          />
        </UiPaginationItem>

        <UiPaginationItem>
          <UiPaginationPrevious
            href="#"
            size="sm"
            disabled={Number(currentPage) === 1 || isPending}
            onClick={() =>
              pushQueryString({
                page: `${Number(currentPage) - 1}`,
                limit,
                where,
                orderBy,
              })
            }
          />
        </UiPaginationItem>

        {paginationRange.map((pageNumber, i) => {
          return pageNumber === '...' ? (
            <UiPaginationItem>
              <UiPaginationEllipsis key={i}>...</UiPaginationEllipsis>
            </UiPaginationItem>
          ) : (
            <UiPaginationItem key={i}>
              <UiPaginationLink
                href="#"
                size="sm"
                aria-label={`Page ${pageNumber}`}
                key={i}
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
          <UiPaginationNext
            href="#"
            size="sm"
            disabled={
              total === 1 || Number(currentPage) === (limit ?? 10) || isPending
            }
            onClick={() =>
              pushQueryString({
                page: `${Number(currentPage) + 1}`,
                limit,
                where,
                orderBy,
              })
            }
          />
        </UiPaginationItem>

        <UiPaginationItem>
          <UiPaginationLastPage
            href="#"
            size="sm"
            disabled={
              total === 1 || Number(currentPage) === (limit ?? 10) || isPending
            }
            onClick={() => {
              pushQueryString({
                page: `${pageCount}`,
                limit,
                where,
                orderBy,
              })
            }}
          />
        </UiPaginationItem>
      </UiPaginationContent>
      <UiPaginationItem className="text-muted-foreground ml-4">
        Page {currentPage} of {total}
      </UiPaginationItem>
    </UiPagination>
  )
  //   return (
  //     <div className="grid gap-2" {...props}>
  //       <div
  //         className={cn(
  //           'mt-6 flex flex-wrap items-center justify-center gap-2',
  //           className
  //         )}
  //       >
  //         <Button
  //           variant="outline"
  //           className={cn(
  //             'h-4 w-10 px-0',
  //             Number(currentPage) !== 1 && 'text-accent-foreground'
  //           )}
  //           disabled={Number(currentPage) === 1 || isPending}
  //           onClick={() => pushQueryString({ page: '1', limit, where, orderBy })}
  //         >
  //           <ChevronFirst className="h-5 w-5" aria-hidden="true" />
  //           <span className="sr-only">First page</span>
  //         </Button>

  //         <Button
  //           variant="outline"
  //           className={cn(
  //             'h-10 w-10 px-0 text-sm',
  //             Number(currentPage) !== 1 && 'text-accent-foreground'
  //           )}
  //           disabled={Number(currentPage) === 1 || isPending}
  //           onClick={() =>
  //             pushQueryString({
  //               page: `${Number(currentPage) - 1}`,
  //               limit,
  //               where,
  //               orderBy,
  //             })
  //           }
  //         >
  //           <ChevronLeft className="h-5 w-5" aria-hidden="true" />
  //           <span className="sr-only">Previous page</span>
  //         </Button>

  //         {paginationRange.map((pageNumber, i) =>
  //           pageNumber === '...' ? (
  //             <Button
  //               aria-label="Page separator"
  //               key={i}
  //               variant="outline"
  //               className="h-10 w-10 px-0 text-sm"
  //               disabled
  //             >
  //               ...
  //             </Button>
  //           ) : (
  //             <Button
  //               aria-label={`Page ${pageNumber}`}
  //               key={i}
  //               variant={
  //                 Number(currentPage) === pageNumber ? 'default' : 'outline'
  //               }
  //               className="h-10 w-10 px-0 text-sm background-accent-foreground bg-gray-900 text-accent-foreground font-medium border hover:bg-accent hover:text-accent-foreground"
  //               onClick={() =>
  //                 pushQueryString({
  //                   page: pageNumber as any,
  //                   limit,
  //                   where,
  //                   orderBy,
  //                 })
  //               }
  //               disabled={isPending}
  //             >
  //               {pageNumber}
  //             </Button>
  //           )
  //         )}

  //         <Button
  //           variant="outline"
  //           className={cn(
  //             'h-10 w-10 px-0 text-sm ',
  //             Number(currentPage) !== (limit ?? 10) && 'text-accent-foreground'
  //           )}
  //           disabled={Number(currentPage) === (limit ?? 10) || isPending}
  //           onClick={() =>
  //             pushQueryString({
  //               page: `${Number(currentPage) + 1}`,
  //               limit,
  //               where,
  //               orderBy,
  //             })
  //           }
  //         >
  //           <ChevronRight className="h-5 w-5" aria-hidden="true" />
  //           <span className="sr-only">Next page</span>
  //         </Button>

  //         <Button
  //           variant="outline"
  //           className={
  //             cn(
  //               'h-10 w-10 px-0 text-sm',
  //               Number(currentPage) !== (limit ?? 10)
  //             ) && 'text-accent-foreground'
  //           }
  //           disabled={Number(currentPage) === (limit ?? 10) || isPending}
  //           onClick={() => {
  //             pushQueryString({
  //               page: `${pageCount}`,
  //               limit,
  //               where,
  //               orderBy,
  //             })
  //           }}
  //         >
  //           <ChevronLast className="h-5 w-5 text-sm" aria-hidden="true" />
  //           <span className="sr-only">Last page</span>
  //         </Button>
  //       </div>
  //     </div>
  //   )
}

Pagination.displayName = 'Pagination'
