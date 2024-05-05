'use client'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Plus } from 'lucide-react'

import { CmsCollection, CmsCollectionDocument } from '@/features/cms/cms.types'
import { GetFieldComponent } from '@/features/cms/components/cms-config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TypographyH1 } from '@/components/typography/h1.typography'
import { Label } from '@/components/ui/label'

export const Document = ({
  columns = [],
  type,
  values,
}: {
  columns: CmsCollection['columns']
  type: CmsCollection['type']
  values: CmsCollectionDocument['data'] & {
    [key: string]: any
    title: string
    fieldId: string
  }
}) => {
  return (
    <div className="m-4 max-w-[1280px] mx-auto">
      <div className="flex items-center">
        <TypographyH1 className="mb-4">{values?.title}</TypographyH1>

        <div className="ml-auto">
          <Button variant="outline">
            <span className="whitespace-nowrap">Cancel</span>
          </Button>

          <Button className="w-auto">
            <span className="whitespace-nowrap">Save</span>
          </Button>
        </div>
      </div>
      <DndProvider backend={HTML5Backend}>
        <form>
          <Card className="bg-[#13131a] max-w-[900px] mx-auto">
            <CardHeader className="flex flex-row items-center border-b py-2">
              <CardTitle className="">
                {type === 'single' ? 'Collection content' : 'Item content'}
              </CardTitle>
              <Button
                variant="ghost"
                className="ml-auto text-accent-foreground"
              >
                <span className="whitespace-nowrap">Manage Fields</span>
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              {columns.map(({ fieldId, columnName, type }) => {
                return (
                  <div key={fieldId} className="mb-6">
                    {columnName && (
                      <Label className="mb-2" htmlFor={fieldId}>
                        {columnName}
                      </Label>
                    )}
                    <div>
                      <GetFieldComponent
                        type={type}
                        value={values?.[fieldId]}
                        onBlur={() => {}}
                        setValue={() => {}}
                        fieldId={fieldId}
                      />
                    </div>
                  </div>
                )
              })}

              <Button variant="ghost" className="text-accent-foreground">
                <Plus className="h-4 w-4 mr-2" />
                <span className="whitespace-nowrap">Add Item</span>
              </Button>
            </CardContent>
          </Card>
        </form>
      </DndProvider>
    </div>
  )
}
