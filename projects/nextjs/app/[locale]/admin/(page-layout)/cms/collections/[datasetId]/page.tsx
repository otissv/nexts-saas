import {
  insertCmsColumnAction,
  selectCmsCollectionsDocumentsByDatasetIdAction,
  updateCollectionByDatasetIdAction,
  UpdateColumnByDatasetIdAction,
} from '@/features/cms/cms.actions'
import { CollectionDataTable } from '@/features/cms/components/cms'
import { decodeSearchParams } from '@/lib/querystring'
import {
  CmsStateInsert,
  CmsStateUpdate,
  CmsStateUpdateCollection,
  CmsStateUpdateColumn,
} from '@/features/cms/cms.types'
import { PageHeader } from '@/components/page/page-header'

export type Document = {
  id: string
  title: string
  service: string
  description: string
  content: string
  _order: number
}

export default async function Collection({
  params,
  searchParams,
}: {
  params: { datasetId: string }
  searchParams: {
    limit?: number
    page?: number
  }
}) {
  const datasetId = params.datasetId

  const queryParams = decodeSearchParams(searchParams)

  const collections = await selectCmsCollectionsDocumentsByDatasetIdAction({
    datasetId,
  })

  const update = async (props: CmsStateUpdate): Promise<any> => {
    'use server'
    try {
      if ((props as CmsStateUpdateCollection).columnOrder) {
        return updateCollectionByDatasetIdAction({
          datasetId,
          columns: ['columnOrder'],
          data: props as CmsStateUpdateCollection,
        })
      } else {
        const { fieldId, ...data } = props as CmsStateUpdateColumn
        return UpdateColumnByDatasetIdAction({
          fieldId,
          datasetId,
          data,
          columns: Object.keys(props) as any,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const insert = async (column: CmsStateInsert) => {
    'use server'

    return insertCmsColumnAction({
      data: {
        datasetId,
        ...column,
      },
    })
  }

  const { columnOrder, columns, data, collectionName, type } =
    collections?.data[0] || {}

  if (!columns || !collectionName) {
    return <>Collection not Found</>
  }

  // ?.[0]
  //   ? documents
  //   : columns.map(({ columnName }) => ({
  //       datasetId,
  //       data: [],
  //     }))

  const columnVisibility = columns.reduce((acc: any, column) => {
    acc[column.fieldId] = column.visibility
    return acc
  }, {})

  return (
    <div className="p-10">
      <PageHeader
        heading={collectionName}
        breadcrumbs={[
          { label: 'Admin', crumb: '/admin' },
          { label: 'CMS', crumb: 'cms' },
          { label: `${collectionName} collection` },
        ]}
      />

      <CollectionDataTable
        insert={insert}
        update={update}
        type={type}
        columns={columns as any}
        columnOrder={
          columnOrder || (columns || []).map((column) => column.fieldId)
        }
        data={data as any}
        collectionName={collectionName}
        columnVisibility={columnVisibility}
        datasetId={datasetId}
        totalPages={collections?.totalPages}
        queryParams={queryParams}
      />
    </div>
  )
}
