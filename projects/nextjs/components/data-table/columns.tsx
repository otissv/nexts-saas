'use client'

import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Link from 'next/link'
import {
  ArrowDownAZ,
  ArrowDownZA,
  Copy,
  EyeOff,
  FileStack,
  MoreVertical,
  MoveLeft,
  MoveRight,
  RefreshCcw,
  Settings,
  Trash2,
  ArrowUpRightFromSquare,
  GripVertical,
} from 'lucide-react'
import {
  ColumnDef,
  Table as TanstackTable,
  Column as TanstackColumn,
  ColumnOrderState,
} from '@tanstack/react-table'
import { toSnakeCase } from 'c-ufunc/libs/toSnakeCase'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TenantCmsCollectionColumn } from '@/features/tenant-cms-collections/cms-collections.tenant.types'
import { TypeIcon } from '@/components/data-table/type-icon'
import { DataTableCell } from '@/components/data-table/data-table-cell'

export type SetError = (error: string) => void
export type Field = {
  value: TenantCmsCollectionColumn['validation'] | string | boolean | number
  error: string
  validate: ({ setError, value }: { setError: SetError; value: any }) => boolean
}

export function getColumns<TData, TValue>({
  collectionName,
  columns,
  onEditColumn,
  onSortColumn,
  onVisibilityToggle,
}: {
  collectionName: string
  columns: TenantCmsCollectionColumn[]
  onEditColumn: (values: Partial<TenantCmsCollectionColumn>) => void
  onVisibilityToggle: (
    column: any
  ) => (_e: React.MouseEvent<HTMLDivElement>) => void
  onSortColumn: (
    column: TanstackColumn<TData>,
    direction: 'asc' | 'desc'
  ) => (e: React.MouseEvent<HTMLDivElement>) => void
}): ColumnDef<TData, TValue>[] {
  return [
    {
      id: '_select',
      header: ({ table }: { table: TanstackTable<TData> }) => (
        <div className="flex items-center  min-h-10 border">
          <Checkbox
            className="mx-4"
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center h-10 border">
          <Checkbox
            className="mx-4"
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: '_action',
      header: () => (
        <div className="flex items-center px-4 border min-h-10 min-w-10 text-muted-foreground ">
          ID
        </div>
      ),
      cell: ({ row }) => {
        const title = row
          .getAllCells()
          .filter(({ column }) => column.id === 'title')[0]
          .getValue()

        return (
          <Link
            className="flex items-center 
             text-sm h-10 border rounded-none"
            href={`/admin/cms/collections/${collectionName}/${title}`}
            passHref
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full px-3 justify-start h-10 text-accent-foreground font-medium rounded-none hover:bg-accent hover:text-accent-foreground "
            >
              <ArrowUpRightFromSquare className="h-4" />{' '}
              <span className="ml-1">{Number(row.id) + 1}</span>
            </Button>
          </Link>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },

    ...columns.map(({ displayName, fieldId, type, ...values }) =>
      dynamicColumn({
        displayName,
        fieldId,
        type,
        values,
        onEditColumn,
        onSortColumn,
        onVisibilityToggle,
      })
    ),
  ]
}

function reorderColumn(
  draggedColumnId: string,
  targetColumnId: string,
  columnOrder: string[]
): ColumnOrderState {
  columnOrder.splice(
    columnOrder.indexOf(targetColumnId),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
  )
  return [...columnOrder]
}

export function ColumnHeader({
  table,
  column,
  children, // canDrag,
  // canDrop,
}: {
  column: TanstackColumn<TenantCmsCollectionColumn>
  table: TanstackTable<TenantCmsCollectionColumn>
  children: React.ReactNode
}) {
  const { getState, setColumnOrder } = table
  const { columnOrder } = getState()

  const [{ isOver }, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: TanstackColumn<TenantCmsCollectionColumn>) => {
      const newColumnOrder = reorderColumn(
        draggedColumn.id,
        column.id,
        columnOrder
      )
      setColumnOrder(newColumnOrder)
    },
    collect: (monitor) => {
      const item = monitor.getItem()
      if (item) {
        // console.log("collect", item.files, item.items)
      }
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }
    },
  })

  const [_, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => column,
    type: 'column',
  })

  return (
    <div ref={dropRef} className={cn(isOver && 'bg-gray-700')}>
      <div ref={previewRef}>
        <div className="flex items-center w-full" ref={dragRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function dynamicColumn({
  displayName,
  fieldId,
  type,
  values,
  onEditColumn,
  onSortColumn,
  onVisibilityToggle,
}: {
  type: string
  displayName: string
  fieldId: string
  values: Partial<TenantCmsCollectionColumn>
  onEditColumn: (values: Partial<TenantCmsCollectionColumn>) => void
  onSortColumn: (
    column: TanstackColumn<any>,
    direction: 'asc' | 'desc'
  ) => (e: React.MouseEvent<HTMLDivElement>) => void
  onVisibilityToggle: (
    column: TanstackColumn<any>
  ) => (_e: React.MouseEvent<HTMLDivElement>) => void
}) {
  return {
    accessorKey: fieldId,
    header: ({
      table,
      column,
    }: {
      column: TanstackColumn<any>
      table: TanstackTable<any>
    }) => {
      return (
        <ColumnHeader column={column} table={table}>
          <GripVertical className="h-4 p-0" />
          {displayName}
          <ColumnDropdownMenu className="ml-auto">
            <ColumnDialog
              displayName={displayName}
              fieldId={fieldId}
              type={type}
              {...values}
              onEditColumn={onEditColumn}
            >
              <Button
                variant="ghost"
                className="text-xs w-full justify-start relative rounded-sm px-2 py-1.5"
              >
                <Settings className="h-4 mr-2" /> Edit
              </Button>
            </ColumnDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-xs"
              onClick={onVisibilityToggle(column)}
            >
              <EyeOff className="h-4 w-4 mr-4" /> Hide
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              <Copy className="h-4 w-4 mr-4" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              <FileStack className="h-4 w-4 mr-4" /> Duplicate column with
              content
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-xs"
              onClick={onSortColumn(column, 'asc')}
            >
              <ArrowDownAZ className="h-4 w-4 mr-4" /> Sort A{' '}
              <MoveRight className="h-4 w-4 mx-2" /> Z
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-xs"
              onClick={onSortColumn(column, 'desc')}
            >
              <ArrowDownZA className="h-4 w-4 mr-4" /> Sort Z
              <MoveLeft className="h-4 w-4 mx-2 p-0" />A
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600 text-xs">
              <Trash2 className="h-4 w-4 mr-4" /> Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </ColumnDropdownMenu>
        </ColumnHeader>
      )
    },
    cell: DataTableCell,
    values: {
      displayName,
      fieldId,
      type,
      ...values,
    },
  }
}

export function ColumnDropdownMenu({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('text-accent-foreground', className)}
        >
          <MoreVertical className="h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ColumnDialog({
  children,
  displayName = '',
  fieldId = '',
  type = '',
  help = '',
  defaultValue = '',
  validation,
  onAddColumn,
  onEditColumn,
}: {
  children: React.ReactNode
  displayName: string
  fieldId: string
  type: string
  help?: string
  defaultValue?: string
  validation?: TenantCmsCollectionColumn['validation']
  onAddColumn?: (values: Partial<TenantCmsCollectionColumn>) => void
  onEditColumn?: (values: Partial<TenantCmsCollectionColumn>) => void
}) {
  const [typeField, setTypeField] = React.useState<Field>({
    value: type,
    error: '',
    validate: ({ setError, value }) => {
      if (
        typeof value !== 'string' ||
        value.trim().length < 2 ||
        value.trim().length > 50
      ) {
        setError(
          'This filed is required and a minium 3 and a maximin of 50 characters'
        )

        return false
      }

      setError('')
      return true
    },
  })

  const [nameField, setNameField] = React.useState<Field>({
    value: displayName,
    error: '',
    validate: ({ setError, value }) => {
      if (
        typeof value !== 'string' ||
        value.trim().length < 2 ||
        value.trim().length > 50
      ) {
        setError(
          'This filed is required and a minium 3 and a maximin of 50 characters'
        )

        return false
      }

      setError('')
      return true
    },
  })

  const [fieldIdField, setFieldIdField] = React.useState<Field>({
    value: fieldId,
    error: '',
    validate: ({ setError, value }) => {
      if (
        typeof value !== 'string' ||
        value.trim().length < 2 ||
        value.trim().length > 50
      ) {
        setError(
          'This filed is required and a minium 3 and a maximin of 50 characters'
        )

        return false
      }

      setError('')
      return true
    },
  })

  const [helpField, setHelpField] = React.useState<Field>({
    value: help,
    error: '',
    validate: () => true,
  })

  const [defaultValueField, setDefaultValueField] = React.useState<Field>({
    value: defaultValue,
    error: '',
    validate: () => true,
  })

  const [validationField, setValidationField] = React.useState<Field>({
    value: validation,
    error: '',
    validate: () => true,
  })

  const columnDialogIsInvalid = (fields: [Field, SetError][]) => {
    for (let [field, setError] of fields) {
      const isInvalid = !field.validate({
        setError,
        value: field.value,
      })

      if (isInvalid) return true
    }

    return false
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const setError =
      (field: Field, setField: React.Dispatch<React.SetStateAction<Field>>) =>
      (error: string) => {
        return setField({
          ...field,
          error,
        })
      }

    if (
      columnDialogIsInvalid([
        [typeField, setError(typeField, setTypeField)],
        [nameField, setError(nameField, setNameField)],
        [fieldIdField, setError(fieldIdField, setFieldIdField)],
        [helpField, setError(helpField, setHelpField)],
        [defaultValueField, setError(defaultValueField, setDefaultValueField)],
      ])
    ) {
      return
    }

    const values = {
      type: typeField.value,
      displayName: nameField.value,
      fieldId: fieldIdField.value,
      help: helpField.value,
      defaultValue: defaultValueField.value,
      validation: validationField.value,
    } as Partial<TenantCmsCollectionColumn>

    onAddColumn ? onAddColumn(values) : onEditColumn && onEditColumn(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{onAddColumn ? 'Add' : 'Edit'} a column</DialogTitle>
        </DialogHeader>
        <div className="h-[436px] overflow-y-auto">
          {onAddColumn ? (
            <NewColumnDialogContent
              isAddColumn={Boolean(onAddColumn)}
              typeField={typeField}
              nameField={nameField}
              fieldIdField={fieldIdField}
              helpField={helpField}
              defaultValueField={defaultValueField}
              onSubmit={handleSubmit}
              setTypeField={setTypeField}
              setNameField={setNameField}
              setFieldIdField={setFieldIdField}
              setHelpField={setHelpField}
              validationField={validationField}
              setValidationField={setValidationField}
              setDefaultValueField={setDefaultValueField}
            />
          ) : (
            <ColumnDialogContent
              isAddColumn={Boolean(onAddColumn)}
              className="h-[436px]"
              typeField={typeField}
              nameField={nameField}
              fieldIdField={fieldIdField}
              helpField={helpField}
              defaultValueField={defaultValueField}
              onSubmit={handleSubmit}
              setTypeField={setTypeField}
              setNameField={setNameField}
              setFieldIdField={setFieldIdField}
              setHelpField={setHelpField}
              validationField={validationField}
              setValidationField={setValidationField}
              setDefaultValueField={setDefaultValueField}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function ColumnDialogContent({
  isAddColumn,
  className,
  typeField,
  nameField,
  fieldIdField,
  helpField,
  defaultValueField,
  setTypeField,
  setNameField,
  setFieldIdField,
  setHelpField,
  validationField,
  setValidationField,
  setDefaultValueField,
  onSubmit,
  setStep,
}: {
  isAddColumn: boolean
  className?: string
  typeField: Field
  nameField: Field
  fieldIdField: Field
  helpField: Field
  defaultValueField: Field
  validationField: Field
  setTypeField: React.Dispatch<React.SetStateAction<Field>>
  setNameField: React.Dispatch<React.SetStateAction<Field>>
  setFieldIdField: React.Dispatch<React.SetStateAction<Field>>
  setHelpField: React.Dispatch<React.SetStateAction<Field>>
  setValidationField: React.Dispatch<React.SetStateAction<Field>>
  setDefaultValueField: React.Dispatch<React.SetStateAction<Field>>
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void
  setStep?: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <form className={cn('grid', className)}>
      <div>
        <Tabs defaultValue="settings" className="h-[296px]">
          <TabsList className="w-full my-6">
            <TabsTrigger value="settings" className="w-full">
              Setting
            </TabsTrigger>
            <TabsTrigger value="validation" className="w-full">
              Validation
            </TabsTrigger>
            <TabsTrigger value="defaultValue" className="w-full">
              Default Value
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="fieldType" className="text-sm">
                  Filed type
                </Label>
                <Input
                  id="fieldType"
                  className={typeField.error && 'border-red-700'}
                  value={typeField.value}
                  disabled
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTypeField({
                      ...typeField,
                      value: e.target.value,
                    })
                  }
                />
              </div>
              {!isAddColumn && (
                <div className="flex items-end">
                  <Button variant="ghost" className="">
                    <RefreshCcw className="h-4 mr-2" /> change type
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <Label htmlFor="fieldName" className="text-sm">
                  Filed displayName
                </Label>
                <Input
                  className={nameField.error && 'border-red-700'}
                  id="fieldName"
                  value={nameField.value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNameField({
                      ...nameField,
                      value: e.target.value,
                    })
                    {
                      isAddColumn &&
                        setFieldIdField({
                          ...fieldIdField,
                          value: toSnakeCase(e.target.value),
                        })
                    }
                  }}
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="fieldId" className="text-sm">
                  Filed ID
                </Label>
                <Input
                  id="fieldId"
                  className={fieldIdField.error && 'border-red-700'}
                  value={fieldIdField.value}
                  disabled={!isAddColumn}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFieldIdField({
                      ...fieldIdField,
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="help" className="text-sm">
                Help text (optional)
              </Label>
              <Input
                id="help"
                className={helpField.error && 'border-red-700'}
                value={helpField.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHelpField({
                    ...helpField,
                    value: e.target.value,
                  })
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="validation">
            <Validation
              type={typeField.value as string}
              validationField={validationField}
              setValidationField={setValidationField}
            />
          </TabsContent>

          <TabsContent value="defaultValue">
            <div className="mb-4">
              <Label htmlFor="defaultValue" className="text-sm">
                Default value
              </Label>
              <Input
                id="defaultValue"
                className={defaultValueField.error && 'border-red-700'}
                value={defaultValueField.value}
                disabled
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDefaultValueField({
                    ...defaultValueField,
                    value: e.target.value,
                  })
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {typeField.error && (
        <div className="text-xs text-red-700">{typeField.error}</div>
      )}
      {nameField.error && (
        <div className="text-xs text-red-700">{nameField.error}</div>
      )}
      {fieldIdField.error && (
        <div className="text-xs text-red-700">{fieldIdField.error}</div>
      )}
      {helpField.error && (
        <div className="text-xs text-red-700">{helpField.error}</div>
      )}
      {defaultValueField.error && (
        <div className="text-xs text-red-700">{defaultValueField.error}</div>
      )}

      <DialogFooter className="self-end h-10 justify-between sm:justify-between">
        {isAddColumn ? (
          <Button
            variant="outline"
            className="text-sm"
            onClick={() => setStep && setStep(1)}
          >
            Back
          </Button>
        ) : (
          <DialogClose asChild>
            <Button variant="outline" className="text-sm">
              Cancel
            </Button>
          </DialogClose>
        )}

        <Button type="submit" className="text-sm" onClick={onSubmit}>
          Save
        </Button>
      </DialogFooter>
    </form>
  )
}

export function NewColumnDialogContent({
  className,
  ...props
}: {
  isAddColumn: boolean
  className?: string
  typeField: Field
  nameField: Field
  fieldIdField: Field
  helpField: Field
  defaultValueField: Field
  validationField: Field
  setTypeField: React.Dispatch<React.SetStateAction<Field>>
  setNameField: React.Dispatch<React.SetStateAction<Field>>
  setFieldIdField: React.Dispatch<React.SetStateAction<Field>>
  setHelpField: React.Dispatch<React.SetStateAction<Field>>
  setValidationField: React.Dispatch<React.SetStateAction<Field>>
  setDefaultValueField: React.Dispatch<React.SetStateAction<Field>>
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void
}) {
  const types = [
    // Essentials

    {
      title: 'Text',
      Icon: (props: Record<string, any>) => <TypeIcon {...props} type="text" />,
      type: 'text',
      description: 'Titles, paragraph',
    },

    {
      title: 'Rich Text',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="rich-text" />
      ),
      description: 'text with formatting',
      type: 'rich-text',
    },
    {
      title: 'Rich Content',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="rich-content" />
      ),
      description: 'Text with links and media',
      type: 'rich-content',
    },
    {
      title: 'URL',
      Icon: (props: Record<string, any>) => <TypeIcon {...props} type="url" />,
      description: 'Links',
      type: 'url',
    },
    {
      title: 'Number',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="number" />
      ),
      type: 'number',
      description: 'ID, rating, oder number',
    },
    {
      title: 'Boolean',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="boolean" />
      ),
      type: 'boolean',
      description: 'Yes or no, true or false',
    },
    {
      title: 'Reference',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="reference" />
      ),
      type: 'reference',
      description: 'Link to another collection',
    },
    {
      title: 'Multi Reference',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="multi-reference" />
      ),
      description: 'Link between collections',
      type: 'multi-reference',
    },

    // Media
    {
      title: 'Image',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="image" />
      ),
      type: 'image',
      description: 'Upload a single image',
    },
    {
      title: 'Video',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="video" />
      ),
      type: 'video',
      description: 'Upload a single video',
    },
    {
      title: 'Audio',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="audio" />
      ),
      type: 'audio',
      description: 'Upload an audio file',
    },
    {
      title: 'Document',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="document" />
      ),
      type: 'documents',
      description: 'Add a files to a collection',
    },

    // Time and location
    {
      title: 'Date',
      Icon: (props: Record<string, any>) => <TypeIcon {...props} type="date" />,
      type: 'date',
      description: 'Data of event, date added',
    },
    {
      title: 'Time',
      Icon: (props: Record<string, any>) => <TypeIcon {...props} type="time" />,
      type: 'time',
      description: 'Opening hours, time of event',
    },
    {
      title: 'Address',
      Icon: (props: Record<string, any>) => (
        <TypeIcon {...props} type="address" />
      ),
      type: 'address',
      description: 'Location',
    },
  ]

  const [step, setStep] = React.useState<number>(1)
  const [_type, setType] = React.useState<string>('')

  return (
    <div className="overflow-hidden">
      {step === 1 ? (
        <div className="grid grid-cols-3 gap-3">
          {types.map(({ title, type, description, Icon }) => {
            return (
              <div
                key={type}
                onClick={() => {
                  setType(type)
                  props.setTypeField({
                    ...props.typeField,
                    value: type,
                  })
                  setStep(2)
                }}
              >
                <Card className="h-28">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center">
                      <Icon className="p-0 h-4" /> {title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            )
          })}
        </div>
      ) : (
        <ColumnDialogContent
          setStep={setStep}
          {...props}
          className={cn('h-[436px]', className)}
          // typeField={{
          //   ...props.typeField,
          //   value: type,
          // }}
        />
      )}
    </div>
  )
}

export function Validation({
  type,
  validationField,
  setValidationField,
}: {
  type: string
  validationField: Field
  setValidationField: React.Dispatch<React.SetStateAction<Field>>
}) {
  const { required } = validationField.value as { required?: boolean }

  switch (type) {
    case 'number': {
      const { min, max } = validationField.value as {
        min?: number
        max?: number
      }

      return (
        <>
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="requiredField"
              checked={required}
              //  onCheckedChange={field.onChange}
            />
            <Label htmlFor="requiredField">Make this a require field</Label>
          </div>
          <div className="grid grid-cols-2 gap-4 w-40">
            <div className="mb-4">
              <Label htmlFor="fieldName" className="text-sm">
                min
              </Label>
              <Input
                id="fieldName"
                value={min}
                className="w-16"
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinValue(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="fieldId" className="text-sm">
                max
              </Label>
              <Input
                id="fieldId"
                value={max}
                className="w-16"
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxValue(e.target.value)}
              />
            </div>
          </div>
        </>
      )
    }
    case 'text': {
      const { minLength, maxLength } = validationField.value as {
        minLength?: number
        maxLength?: number
      }

      return (
        <>
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="requiredField"
              checked={required}
              //  onCheckedChange={field.onChange}
            />
            <Label htmlFor="requiredField">Make this a require field</Label>
          </div>
          Number of characters
          <div className="grid grid-cols-2 gap-4 w-40">
            <div className="mb-4">
              <Label htmlFor="fieldName" className="text-sm">
                min
              </Label>
              <Input
                id="fieldName"
                value={minLength}
                className="w-16"
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinValue(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="fieldId" className="text-sm">
                max
              </Label>
              <Input
                id="fieldId"
                value={maxLength}
                className="w-16"
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxValue(e.target.value)}
              />
            </div>
          </div>
        </>
      )
    }
    default:
      return (
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="requiredField"
            checked={required}
            //  onCheckedChange={field.onChange}
          />
          <Label htmlFor="requiredField">Make this a require field</Label>
        </div>
      )
  }
}
