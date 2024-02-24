import React from 'react'
import {
  Column as TanstackColumn,
  Row as TanstackRow,
  Table as TanstackTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

export function DocumentForm<TData>({
  children,
  row,
  table,
}: {
  children: React.ReactNode
  row: TanstackRow<TData>
  table: TanstackTable<any>
}) {
  const values: Record<string, any> = row.getAllCells().reduce((acc, cell) => {
    return cell.getValue() ? { ...acc, [cell.column.id]: cell.getValue() } : acc
  }, {})

  const columns = table
    .getAllColumns()
    .map((col) => col.columnDef.values)
    .filter(Boolean)

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto max-w-[872px] w-full max-h-[calc(100vh - 100px)]">
          <DrawerHeader>
            <DrawerTitle>{values['title']}</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <Card className=" overflow-y-auto">
            <CardHeader>
              <CardTitle>Create project</CardTitle>
              <CardDescription>
                Deploy your new project in one-click.
              </CardDescription>
            </CardHeader>
            {columns.map(({ fieldId, displayName, type }) => {
              return (
                <CardContent key={fieldId}>
                  <form>
                    {getInputField({
                      type,
                      value: values[fieldId],
                      onBlur: () => {},
                      setValue: () => {},
                      displayName,
                      fieldId,
                    })}
                  </form>
                </CardContent>
              )
            })}
          </Card>

          <DrawerFooter className="flex flex-row md:flex-row sm:flex-col justify-between px-0">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>

            <Button className="w-auto">Save</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function getInputField({
  type,
  value,
  onBlur,
  setValue,
  fieldId,
  displayName,
}) {
  switch (type) {
    case 'rich-text':
      return (
        <RichTextInput
          value={value}
          onBlur={onBlur}
          setValue={setValue}
          fieldId={fieldId}
          displayName={displayName}
        />
      )
    case 'text':
    case 'number':

    default:
      return (
        <TextInput
          value={value}
          onBlur={onBlur}
          setValue={setValue}
          displayName={displayName}
          displayName={displayName}
        />
      )
  }
}

export function TextInput({
  value,
  onBlur,
  className,
  setValue,
  fieldId,
  displayName,
}) {
  return (
    <div>
      <Label htmlFor={fieldId}>{displayName}</Label>
      <Input
        id={fieldId}
        className={cn(
          'p-4 border focus:border-white focus:bg-gray-900',
          className
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  )
}
export function RichTextInput({
  value,
  onBlur,
  className,
  setValue,
  fieldId,
  displayName,
}) {
  return (
    <div>
      <Label htmlFor={fieldId}>{displayName}</Label>

      <Textarea
        className={cn(
          'p-4 border focus:border-white focus:bg-gray-900',
          className
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    </div>
  )
}
