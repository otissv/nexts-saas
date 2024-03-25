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
  CellContext,
} from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { CmsCollection, CmsCollectionColumn } from '@/features/cms/cms.types'
import { DataTableCell } from '@/features/cms/components/cms.data-table-cell'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDialog } from '@/features/cms/components/cms.column.dialog'

export function getTableColumns<TData, TValue>({
  collectionName,
  collectionType,
  columns,
  onEditColumn,
  onSortColumn,
  onVisibilityToggle,
}: {
  collectionName: string
  collectionType: CmsCollection['type']
  columns: CmsCollectionColumn[]
  onEditColumn: (values: Partial<CmsCollectionColumn>) => void
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
        <div className="flex items-center  min-h-10">
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
        <div className="flex items-center h-10 border border-t-0">
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
        <div className="flex items-center px-4 min-h-10 min-w-10 text-muted-foreground ">
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
            className="flex items-center border-t-0 text-sm h-10 border rounded-none"
            href={`/admin/cms/collections/${collectionName}/${title}`}
            passHref
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full px-3 justify-start h-10 text-accent-foreground font-medium rounded-none hover:bg-accent hover:text-accent-foreground "
            >
              <ArrowUpRightFromSquare className="h-4" />{' '}
              <span className="ml-1 whitespace-nowrap">
                {Number(row.id) + 1}
              </span>
            </Button>
          </Link>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },

    ...columns.map(({ columnName, fieldId, type, ...values }) =>
      dynamicColumn({
        collectionType,
        columnName,
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
  children,
}: {
  column: TanstackColumn<CmsCollectionColumn>
  table: TanstackTable<CmsCollectionColumn>
  children: React.ReactNode
}) {
  const { getState, setColumnOrder } = table
  const { columnOrder } = getState()

  const [{ isOver }, dropRef] = useDrop({
    accept: 'column',
    drop: (draggedColumn: TanstackColumn<CmsCollectionColumn>) => {
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
  collectionType,
  columnName,
  fieldId,
  type,
  values,
  onEditColumn,
  onSortColumn,
  onVisibilityToggle,
}: {
  collectionType: CmsCollection['type']
  columnName: string
  fieldId: string
  type: CmsCollectionColumn['type']
  values: Partial<CmsCollectionColumn>
  onEditColumn: (values: Partial<CmsCollectionColumn>) => void
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
          {columnName}
          <ColumnDropdownMenu className="ml-auto">
            <ColumnDialog
              step={2}
              columnName={columnName}
              fieldId={fieldId}
              type={type}
              {...values}
              fieldOptions={values as any}
              onEditColumn={onEditColumn}
              process="edit"
            >
              <Button
                variant="ghost"
                className="text-xs w-full justify-start relative rounded-sm px-2 py-1.5"
              >
                <Settings className="h-4 mr-2" />
                <span className="whitespace-nowrap">Edit</span>
              </Button>
            </ColumnDialog>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-xs"
              onClick={onVisibilityToggle(column)}
            >
              <EyeOff className="h-4 w-4 mr-4" /> Hide
            </DropdownMenuItem>

            {collectionType === 'multiple' ? (
              <>
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
              </>
            ) : null}
            {type !== 'title' && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-red-600 text-xs">
                  <Trash2 className="h-4 w-4 mr-4" /> Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </>
            )}
          </ColumnDropdownMenu>
        </ColumnHeader>
      )
    },
    cell: <TData, TValue>(props: CellContext<TData, TValue>) => (
      <DataTableCell {...props} />
    ),
    values: {
      columnName,
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
