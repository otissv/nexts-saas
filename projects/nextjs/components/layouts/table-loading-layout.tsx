import * as React from 'react'

import { PageHeader } from '@/components/page/page-header'
import { Skeleton } from '@/components/ui/skeleton'

export const TableLoadingLayout = ({
  breadcrumbs,
  heading,
}: {
  breadcrumbs: { label: string; crumb?: string }[]
  heading: string
}) => {
  return (
    <>
      <PageHeader heading={heading} breadcrumbs={breadcrumbs} />

      <Skeleton className="h-10 w-full rounded-md mb-6" />
      <Skeleton className="h-10 w-full rounded-md mb-2" />

      <Skeleton className="h-16 w-full" />
    </>
  )
}
