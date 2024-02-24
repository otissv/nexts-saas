'use client'

import React from 'react'
import { Plus } from 'lucide-react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TanstackTable,
  VisibilityState,
  flexRender,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ColumnDialog } from '@/components/data-table/columns'
import { TenantCmsCollectionColumn } from '@/features/tenant-cms-collections/cms-collections.tenant.types'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setData: React.Dispatch<React.SetStateAction<TData[]>>
  setColumns: React.Dispatch<React.SetStateAction<TenantCmsCollectionColumn[]>>
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
  setRowSelection: React.Dispatch<React.SetStateAction<{}>>
  sorting: SortingState
  columnFilters: ColumnFiltersState
  columnVisibility: VisibilityState
  rowSelection: Record<string, any>
  table: TanstackTable<TData>
  handleOnAddItem: () => void
  handleOnAddColumn: (values: Partial<TenantCmsCollectionColumn>) => void
  canEdit?: boolean
  cadAddItem?: boolean
  cadAddColumn?: boolean
  canSort?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  table,
  handleOnAddItem,
  handleOnAddColumn,
  canAddItem,
}: DataTableProps<TData, TValue>) {
  return (
    <div>
      <DataTableToolbar table={table} />

      <style>
        {`
        .data-table-container {
          display: grid;
          grid-template-columns: max-content max-content;
          grid-template-rows: max-content 60px;
        }
        
        .data-table {
          grid-column-start: 1;
          grid-column-end: 1
          grid-row-start: 1;
          grid-row-end: 1;
        }

        .data-table-add-column {
          grid-column-start: 2;
          grid-column-end: 2
          grid-row-start: 1;
          grid-row-end: 1;
        }

        .data-table-add-row {
          grid-column-start: 1;
          grid-column-end: 1
          grid-row-start: 2;
          grid-row-end: 2;
        }
        
        `}
      </style>

      <div className="data-table-container">
        <Table className="data-table w-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="border bg-gray-900 h-10 p-0"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-0"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="p-0" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ColumnDialog onAddColumn={handleOnAddColumn}>
          <Button className="data-table-add-column h-10 bg-gray-900 text-sm text-accent-foreground  font-medium border rounded-none p-4 hover:bg-accent hover:text-accent-foreground">
            <Plus className="mr-2 h-4 w-4" />
            Add Column
          </Button>
        </ColumnDialog>
        <div className="flex items-center w-full">
          {canAddItem && (
            <Button
              variant="ghost"
              className="border data-table-add-column h-10 w-full text-left justify-start text-sm bg-gray-900 text-accent-foreground font-medium  rounded-none p-4 hover:bg-accent hover:text-accent-foreground"
              onClick={handleOnAddItem}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function DataTableToolbar<TData>({
  table,
}: {
  table: TanstackTable<TData>
}) {
  return (
    <div className="h-10">
      {table.getFilteredSelectedRowModel().rows.length ? (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      ) : null}
    </div>
  )
}
