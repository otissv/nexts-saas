import React from 'react'

import { selectTenantCmsCollectionDocumentAction } from '@/features/tenant-cms-collections/cms-collections.actions'
import { Document } from '@/components/data-table/document'

export default async function DocumentForm({ params }) {
  const { datasetId, documentTitle } = params

  const { data } = await selectTenantCmsCollectionDocumentAction({
    datasetId: datasetId,
    title: documentTitle,
  })

  const { columns, data: documents = [] } = data[0]

  return <Document values={documents[0]} columns={columns} />
}
