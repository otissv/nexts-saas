import { SQL, eq } from 'drizzle-orm'

import {
  selectTenantCmsCollectionsByIdAction,
  updateTenantCmsCollectionByIdAction,
} from '@/features/tenant-cms-collections/cms-collections.actions'
import { CollectionDataTable } from '@/components/data-table/collection-table'
import { cmsCollections as cmsCollectionsSchema } from '@/schema/orm/tenant.schema'
import { TenantCmsCollection } from '@/features/tenant-cms-collections/cms-collections.tenant.types'
import { decodeSearchParams } from '@/lib/querystring'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/features/app-auth/auth.options'
import { VisibilityState } from '@tanstack/react-table'

export type Document = {
  id: string
  title: string
  service: string
  description: string
  content: string
  _order: number
}

export default async function Collection({ params, searchParams }) {
  const { datasetId } = params
  const queryParams = decodeSearchParams(searchParams)

  const collections = await selectTenantCmsCollectionsByIdAction({
    where: eq(
      cmsCollectionsSchema.datasetId,
      datasetId
    ) as SQL<TenantCmsCollection>,
    // orderBy: ['services', 'ASC'],
  })

  const update = async (data: { visibility: VisibilityState }) => {
    'use server'

    console.log(data)

    // const { data } = updateTenantCmsCollectionByIdAction({
    //   id: datasetId,
    // })
    // return await selectTenantCmsCollectionsByIdAction({
    //   where: eq(
    //     cmsCollectionsSchema.datasetId,
    //     datasetId
    //   ) as SQL<TenantCmsCollection>,
    //   // orderBy: ['services', 'ASC'],
    // })
  }

  const {
    columns,
    data,
    displayName: collectionName,
    id: collectionId,
    type,
    columnFilters,
    columnOrder,
    columnSort,
    columnVisibility,
  } = collections?.data[0] || {}

  if (!columns || !collectionId || !collectionName || !data?.[0]) {
    return <>Collection not Found</>
  }

  return (
    <div className="p-10">
      <h1 className="text-xl">{collectionName}</h1>
      <CollectionDataTable
        update={update}
        type={type}
        columns={columns}
        data={data as any}
        collectionName={collectionName}
        filters={columnFilters as any}
        order={columnOrder}
        sortBy={columnSort as any}
        visibility={columnVisibility as any}
        queryParams={queryParams}
        totalPages={collections?.totalPages}
      />
    </div>
  )
}
