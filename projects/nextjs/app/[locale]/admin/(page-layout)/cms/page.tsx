import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Search } from '@/components/search'
import { FileText, MoreVertical, Table } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { selectCmsCollectionsAction } from '@/features/cms/cms.actions'
import { sql } from 'drizzle-orm'
import { CmsCollection } from '@/features/cms/cms.types'
import { PageHeader } from '@/components/page/page-header'

export default async function CMSPage() {
  const res = await selectCmsCollectionsAction({
    columns: [
      'id',
      'userId',
      'collectionName',
      'datasetId',
      'type',
      'createdAt',
      'updatedAt',
      (table) => ({
        data: table.cmsCollectionDocuments.data,
      }),
      (table) => ({
        documentCount: sql`jsonb_array_length(${table.cmsCollectionDocuments.data})`,
      }),
    ],
    groupBy: ['id', (tables) => tables.cmsCollectionDocuments.data],
  })

  const handleOnAddCollection = () => {}
  const handleOnEditCollection = () => {}
  const handleOnDeleteCollection = () => {}

  const data: Partial<CmsCollection & { documentCount: number }>[] = res.data

  return (
    <div className="p-10">
      <PageHeader
        heading="Your Collections"
        breadcrumbs={[{ label: 'Admin', crumb: '/admin' }, { label: 'CMS' }]}
      />

      <Search className="my-6" placeholder="Search..." />

      <div className="grid grid-cols-5 gap-4">
        {data.map(({ datasetId, collectionName, type, documentCount }) => {
          return (
            <Link key={datasetId} href={`/admin/cms/collections/${datasetId}`}>
              <Card className="h-28">
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center">
                    {collectionName}
                    <Button size="sm" variant="ghost" className="ml-auto">
                      <MoreVertical className="h-4 " />
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-sm"></CardDescription>
                  <CardContent className="p-0 h-4 flex justify-start items-center text-sm text-muted-foreground">
                    {type === 'single' ? (
                      <FileText className="h-4 mr-1" />
                    ) : (
                      <Table className="h-4 mr-1" />
                    )}
                    {documentCount} items
                  </CardContent>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
