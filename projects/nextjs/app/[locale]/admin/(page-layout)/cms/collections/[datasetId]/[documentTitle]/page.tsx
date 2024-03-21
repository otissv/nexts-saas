import React from 'react'

import { selectCmsCollectionDocumentAction } from '@/features/cms/cms.actions'
import { Document } from '@/features/cms/components/cms.document'
import { CmsCollection } from '@/features/cms/cms.types'

export default async function DocumentForm({
  params,
}: {
  params: {
    datasetId: string
    documentTitle: string
  }
}) {
  const { datasetId, documentTitle } = params

  const { data } = await selectCmsCollectionDocumentAction({
    id: Number(datasetId),
    title: documentTitle,
  })

  const { columns, data: documents, type = 'single' } = data[0]

  return (
    <Document
      values={documents?.[0] as any}
      columns={columns as CmsCollection['columns']}
      type={type}
    />
  )
}
