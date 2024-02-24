'use client'

import React from 'react'
import {
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Table as TanstackTable,
  Column as TanstackColumn,
  ColumnOrderState,
  OnChangeFn,
} from '@tanstack/react-table'
import {
  ArrowDownSquare,
  GripVertical,
  Plus,
  Settings,
  Trash2,
} from 'lucide-react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { TypeIcon } from '@/components/data-table/type-icon'
import { DataTable } from '@/components/data-table/data-table'
import {
  ColumnDialog,
  getColumns,
  ColumnHeader,
  ColumnDropdownMenu,
} from '@/components/data-table/columns'
import {
  TenantCmsCollection,
  TenantCmsCollectionColumn,
} from '@/features/tenant-cms-collections/cms-collections.tenant.types'
import { usePushQueryString } from '@/hooks/querystring-hook'
import { Pagination, usePagination } from '../page/pagination'
import { string } from 'zod'

export interface CollectionDataTableProps<TData> {
  columns: TenantCmsCollection['columns']
  data: TData[]
  collectionName: string
  filters?: ColumnFiltersState
  order?: ColumnOrderState
  sortBy?: SortingState
  type?: 'single' | 'multiple'
  visibility?: VisibilityState
}

export function CollectionDataTable<TData extends Record<string, any>>({
  collectionName,
  columns: defaultColumns,
  data: defaultData,
  filters = [],
  order,
  type = 'multiple',
  sortBy,
  visibility = {},
  queryParams,
  totalPages,
  update,
}: CollectionDataTableProps<TData>) {
  const [data, setData] = React.useState<TData[]>(defaultData)
  const [columns, setColumns] = React.useState(defaultColumns)

  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    order || columns.map((column) => column.fieldId as string)
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(visibility)

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(filters)
  const [sorting, setSorting] = React.useState<SortingState>(
    sortBy?.map(([id, dir]) => ({ id, desc: dir === 'desc' })) || []
  )

  const pagination = usePagination({
    total: totalPages,
    limit: queryParams.limit || 1,
    page: queryParams.page || 1,
  })

  const updateSearchParams = (query) => {
    pagination.pushQueryString({
      ...queryParams,
      page: pagination.currentPage,
      limit: pagination.limit,
      ...query,
    })
  }

  const handleOnEditColumn = (values: Partial<TenantCmsCollectionColumn>) => {
    const fieldId = values.fieldId as string
    const index = columns.findIndex((col) => col.fieldId === fieldId)

    if (index === 0) {
      setColumns([{ ...columns[0], ...values }, ...columns.slice(1)])
    } else if (index === columns.length - 1) {
      setColumns([
        ...columns.slice(0, columns.length - 1),
        { ...columns[columns.length - 1], ...values },
      ])
    } else {
      setColumns([
        ...columns.slice(0, index),
        { ...columns[index], ...values },
        ...columns.slice(index + 1),
      ])
    }

    //TODO: save to db
  }

  const handleOnAddItem = () => {
    //TODO: save to db
    setData([...data])
  }

  const handleOnColumnOrderChange: OnChangeFn<ColumnOrderState> = async (
    order
  ) => {
    const newOrder = [...new Set(order as string[])]
    setColumnOrder(newOrder)

    const columOrder = newOrder.filter(
      (column) => column !== '_select' && column !== '_action'
    )

    updateSearchParams({
      columOrder,
    })

    update({ columOrder })
  }

  const handleOnSortColumn =
    (column: TanstackColumn<TData>, direction: 'asc' | 'desc') =>
    (_e: React.MouseEvent<HTMLDivElement>) => {
      const newSortItem = {
        id: column.id,
        desc: 'desc' === direction,
      }

      const index = sorting.findIndex((obj) => {
        console.log(obj.id, column.id)
        return obj.id === column.id
      })
      let newSorting = []
      if (index === -1 || index === sorting.length - 1) {
        newSorting = [...sorting, newSortItem]
      } else if (index === sorting.length - 1) {
        newSorting = [...sorting.slice(sorting.length - 1), newSortItem]
      } else if (index === 0) {
        newSorting = [newSortItem, ...sorting.slice(1)]
      } else {
        console.log
        newSorting = [
          ...sorting.slice(0, index),
          newSortItem,
          ...sorting.slice(index + 1),
        ]
      }

      setSorting(newSorting)
      updateSearchParams({
        columnSort: newSorting.map(({ id, desc }) => [
          id,
          desc ? 'desc' : 'asc',
        ]),
      })
    }

  const handleOnColumnVisibility =
    (column: TanstackColumn<TData>) =>
    (_e: React.MouseEvent<HTMLDivElement>) => {
      const newColumnVisibility = !column.getIsVisible()
      column.toggleVisibility(newColumnVisibility)

      const visibility = {
        ...columnVisibility,
        [column.id]: newColumnVisibility,
      }

      updateSearchParams({
        visibility,
      })

      console.log(visibility)

      update({ visibility })
    }

  const handleOnAddColumn = (values: Partial<TenantCmsCollectionColumn>) => {
    //TODO: missing validation field
    setColumns([...columns, values as TenantCmsCollectionColumn])
    values?.fieldId && setColumnOrder([...columnOrder, values.fieldId])

    console.log('handleOnAddColumn: ', values)
  }

  const cols = getColumns({
    collectionName,
    columns,
    onEditColumn: handleOnEditColumn,
    onSortColumn: handleOnSortColumn,
    onVisibilityToggle: handleOnColumnVisibility,
  })

  const table = useReactTable<TData>({
    data,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnOrderChange: handleOnColumnOrderChange,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
    state: {
      // sorting,
      columnFilters,
      columnVisibility,
      columnOrder: ['_select', '_action', ...columnOrder],
    },
  })

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex items-center mt-4">
          <div className="flex items-center gap-2 mr-6">
            {type === 'multiple' && (
              <Button
                variant="outline"
                className="text-sm"
                onClick={handleOnAddItem}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            )}

            <ColumnDialog onAddColumn={handleOnAddColumn}>
              <Button
                variant="outline"
                className="data-table-add-column h-10 font-medium border p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Column
              </Button>
            </ColumnDialog>

            <MangeCollection
              table={table}
              columnOrder={columnOrder}
              onEditColumn={handleOnEditColumn}
              onAddColumn={handleOnAddColumn}
              onColumnVisibility={handleOnColumnVisibility}
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>

        <SearchColumns table={table} />
        <DataTable
          canAddItem={type === 'multiple'}
          table={table}
          columns={cols}
          data={data}
          columnFilters={columnFilters}
          columnVisibility={columnVisibility}
          setData={setData}
          setColumns={setColumns}
          setColumnFilters={setColumnFilters}
          setColumnVisibility={setColumnVisibility}
          handleOnAddColumn={handleOnAddColumn}
          handleOnEditColumn={handleOnEditColumn}
          handleOnAddItem={handleOnAddItem}
        />
      </DndProvider>
      <Pagination {...queryParams} {...pagination} />
    </>
  )
}

function SearchColumns<TData>({ table }: { table: TanstackTable<TData> }) {
  return (
    <Input
      placeholder="Search..."
      value={table.getColumn('title')?.getFilterValue() as string}
      onChange={(event) =>
        table.getColumn('title')?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  )
}

function MangeCollection<TData>({
  columnOrder,
  table,
  onEditColumn,
  onAddColumn,
  onColumnVisibility,
}: {
  onAddColumn: () => void
  columnOrder: ColumnOrderState
  table: TanstackTable<TData>
  onEditColumn: (values: Partial<TenantCmsCollectionColumn>) => void
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Settings className="h-4 mr-2" />
          Manage Collection
        </Button>
      </SheetTrigger>
      <SheetContent
        className="p-4 pt-6 flex flex-col gap-6"
        overlayClassName="bg-transparent backdrop-blur-none"
      >
        <SheetHeader className="mt-12">
          <SheetTitle className="flex items-center">
            Manage Collection
          </SheetTitle>
        </SheetHeader>

        <div className="flex items-center">
          <Button variant="outline" size="sm">
            <Settings className="h-4" /> Edit Collection
          </Button>
        </div>
        <div className="h-full">
          {columnOrder.map((fieldId) => {
            const column = table.getColumn(fieldId)
            const values = column?.columnDef.values

            if (!values) return

            const { displayName, type } = values

            return (
              <ColumnHeader column={column} table={table} key={fieldId}>
                <div className="flex items-center h-14 border w-full text-sm">
                  <GripVertical className="h-4 mx-4" />
                  <Checkbox
                    className="capitalize mr-4"
                    checked={column?.getIsVisible()}
                    onCheckedChange={onColumnVisibility(column)}
                  />
                  <TypeIcon type={type} />
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

                    <DropdownMenuItem className="text-xs">
                      <ArrowDownSquare className="h-4 w-4 mr-4" /> Index
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-red-600 text-xs">
                      <Trash2 className="h-4 w-4 mr-4" /> Delete
                      <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </ColumnDropdownMenu>
                </div>
              </ColumnHeader>
            )
          })}
        </div>

        <ColumnDialog onAddColumn={onAddColumn}>
          <Button
            variant="outline"
            className="data-table-add-column h-10 font-medium border p-4 hover:bg-accent hover:text-accent-foreground"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Column
          </Button>
        </ColumnDialog>
      </SheetContent>
    </Sheet>
  )
}
