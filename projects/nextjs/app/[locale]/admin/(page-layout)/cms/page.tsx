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

import { selectTenantCmsCollectionsAction } from '@/features/tenant-cms-collections/cms-collections.actions'
import { sql } from 'drizzle-orm'

export default async function CMSPage() {
  const { data } = await selectTenantCmsCollectionsAction({
    columns: [
      'id',
      'userId',
      'displayName',
      'datasetId',
      'type',
      'columns',
      'columnFilters',
      'columnOrder',
      'columnSort',
      'columnVisibility',
      'createdAt',
      'updatedAt',
      (table) => ({
        data: table.cmsCollectionDocuments.data,
      }),
      (table) => ({
        documentCount: sql`jsonb_array_length(${table.cmsCollectionDocuments.data}) `,
      }),
    ],
    groupBy: ['id', (tables) => tables.cmsCollectionDocuments.data],
  })

  return (
    <div>
      <h2>Your Collections</h2>
      <Search className="my-6" placeholder="Search..." />

      <div className="grid grid-cols-5 gap-4">
        {data.map(({ datasetId, displayName, type, documentCount }) => {
          return (
            <Link key={datasetId} href={`/admin/cms/collections/${datasetId}`}>
              <Card className="h-28">
                <CardHeader className="p-4">
                  <CardTitle className="flex items-center">
                    {displayName} {type}
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
