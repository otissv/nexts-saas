'use client'

import React from 'react'
import {
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Column as TanstackColumn,
  ColumnOrderState,
  OnChangeFn,
  flexRender,
  SortDirection,
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
  CmsActions,
  CmsCollection,
  CmsCollectionColumn,
  CmsState,
  CmsStateInsert,
  CmsStateUpdate,
  CmsStateUpdateColumn,
} from '@/features/cms/cms.types'
import {
  getTableColumns,
  ColumnHeader,
  ColumnDropdownMenu,
} from '@/features/cms/components/cms.columns'
import { ColumnDialog } from '@/features/cms/components/cms.column.dialog'

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pagination, usePagination } from '@/components/page/pagination'
import { fieldTypeConfig } from './cms-config'
import { isValidString } from 'c-ufunc/libs/isValidString'

export function CollectionDataTable<TData extends Record<string, any>>({
  collectionName,
  columns: initialColumns,
  data: initialData,
  columnOrder: initialColumnOrder = [],
  columnVisibility: initialColumnVisibility = {},
  datasetId,
  totalPages,
  type = 'multiple',
  insert,
  update,
  queryParams,
}: {
  collectionName: string
  columns: CmsCollectionColumn[]
  columnOrder?: string[]
  columnVisibility?: VisibilityState
  datasetId: CmsCollection['datasetId']
  data: TData[]
  totalPages?: number
  type?: 'single' | 'multiple'
  queryParams: {
    limit?: number
    page?: number
  }
  insert: (column: CmsStateInsert) => Promise<Record<string, any>>
  update: (props: CmsStateUpdate) => Promise<Record<string, any>>
}) {
  const initialState: CmsState = {
    columns: initialColumns || [],
    data: initialData as any,
    columnVisibility: initialColumnVisibility,
    collectionType: type || 'single',
    collectionName: collectionName || '',
    datasetId: datasetId || '',
    isColumnDialogOpen: false,
    columnOrder: ['_select', '_action', ...initialColumnOrder],
    errors: new Map(),
  }

  const reducer = (state: CmsState, action: CmsActions): CmsState => {
    switch (action.type) {
      case 'addData':
        return {
          ...state,
          data: [...state.data, action.data],
        }

      case 'updateData':
        return state

      case 'addColumns': {
        const columns = [...state.columns, ...action.columns]
        return {
          ...state,
          columns,
          columnOrder: columns.map((col) => col.fieldId),
        }
      }

      case 'updateColumn': {
        const { column } = action
        const fieldId = column.fieldId as string
        const index = state.columns.findIndex((col) => col.fieldId === fieldId)

        let updatedColumns: CmsCollectionColumn[]

        if (index === 0) {
          updatedColumns = [
            { ...state.columns[0], ...column },
            ...state.columns.slice(1),
          ]
        } else if (index === state.columns.length - 1) {
          updatedColumns = [
            ...state.columns.slice(0, state.columns.length - 1),
            { ...state.columns[state.columns.length - 1], ...column },
          ]
        } else {
          updatedColumns = [
            ...state.columns.slice(0, index),
            { ...state.columns[index], ...column },
            ...state.columns.slice(index + 1),
          ]
        }

        return {
          ...state,
          columns: updatedColumns,
        }
      }

      case 'addColumnVisibility':
        return {
          ...state,
          columnVisibility: {
            ...state.columnVisibility,
            [action.field]: action.value,
          },
        }

      case 'setState': {
        if (typeof action.set === 'function') {
          const newState = action.set(state)
          return {
            ...newState,
            columnOrder: ['_select', '_action', ...newState.columnOrder],
          }
        } else {
          return {
            ...state,
            ...action.set,
            columnOrder: [
              '_select',
              '_action',
              ...state.columnOrder,
              ...(action.set.columnOrder || []),
            ],
          }
        }
      }
      default:
        return state
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState)

  console.log('cms: ', state)

  const pagination = usePagination({
    total: totalPages,
    limit: queryParams.limit || 1,
    page: queryParams.page || 1,
  })

  // const updateSearchParams = (query: QueryParams) => {
  //   pagination.pushQueryString({
  //     ...queryParams,
  //     page: pagination.currentPage,
  //     limit: pagination.limit,
  //     ...query,
  //   })
  // }

  const handleOnAddColumn = (column: CmsStateInsert) => {
    const updatedColumns = [...state.columns, column] as CmsCollectionColumn[]

    dispatch({
      type: 'setState',
      set: (state) => ({
        ...state,
        columns: updatedColumns,
        columnOrder: updatedColumns.map((c) => c.fieldId),
      }),
    })

    return column?.fieldId && insert(column)
  }

  const handleOnColumnEdit = (column: Partial<CmsCollectionColumn>) => {
    dispatch({
      type: 'updateColumn',
      column,
    })

    update(column as CmsStateUpdateColumn)
  }

  const handleOnColumnOrderChange: OnChangeFn<ColumnOrderState> = async (
    order
  ) => {
    const columnOrder = [...new Set(order as string[])]

    dispatch({
      type: 'setState',
      set: (state) => ({
        ...state,
        columnOrder: columnOrder,
      }),
    })

    update({ columnOrder })
  }

  const handleOnColumnSort =
    (column: TanstackColumn<TData>, value: SortDirection) =>
    async (_e: React.MouseEvent<HTMLDivElement>) => {
      update({ fieldId: column.id, sortBy: value })
    }

  const handleOnColumnVisibility =
    (column: TanstackColumn<TData>) => async () => {
      const value = !column.getIsVisible()
      column.toggleVisibility(value)

      const visibility = { [column.id]: value }

      dispatch({
        type: 'setState',
        set: (state) => ({
          ...state,
          columnVisibility: {
            ...state.columnVisibility,
            ...visibility,
          },
        }),
      })

      update({ fieldId: column.id, visibility: value })
    }

  const handleOnColumnDelete = () => {}

  const handleOnAddItem = () => {}

  const handleOnDeleteItem = () => {}
  const handleOnDupliacteItem = (fieldId: string, withContent: boolean) => {}

  const handleOnCellUpdateData = ({
    rowIndex,
    columnId,
    value,
    errorMessage,
  }: {
    rowIndex: number
    columnId: string
    value: string
    errorMessage: string
  }) => {
    dispatch({
      type: 'setState',
      set: (state) => {
        let errors = new Map(state.errors)
        const errorId = `${columnId}:${rowIndex}`

        if (isValidString(errorMessage)) {
          errors.set(errorId, errorMessage)
        } else {
          errors.delete(errorId)
        }

        return {
          ...state,
          data: state.data.map((row, index) =>
            index === rowIndex
              ? {
                  ...state.data[rowIndex],
                  [columnId]: value,
                }
              : row
          ),
          errors,
        }
      },
    })

    //TODO: added database, rollback if fail
  }

  const tableColumns = React.useMemo(
    () =>
      getTableColumns({
        collectionName: state.collectionName,
        collectionType: state.collectionType,
        columns: state.columns,
        errors: state.errors,
        onEditColumn: handleOnColumnEdit,
        onSortColumn: handleOnColumnSort,
        onVisibilityToggle: handleOnColumnVisibility,
      }),
    [state.columns.join(','), state.errors]
  )

  const table = useReactTable<TData>({
    state: {
      columnVisibility: state.columnVisibility,
      columnOrder: state.columnOrder,
    },
    data: state.data as any,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnOrderChange: handleOnColumnOrderChange,
    meta: {
      updateData: handleOnCellUpdateData,
    },
  })

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex items-center mt-4">
          <div className="flex items-center gap-2 mr-6">
            <Button
              variant="outline"
              className="text-sm"
              size="sm"
              onClick={handleOnAddItem}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Add Item</span>
            </Button>

            <ColumnDialog step={1} onAddColumn={handleOnAddColumn}>
              <Button
                variant="outline"
                className="data-table-add-column h-10 font-medium border p-4 hover:bg-accent hover:text-accent-foreground"
              >
                <Plus className="mr-2 h-4 w-4" />
                <span className="whitespace-nowrap">Add Column</span>
              </Button>
            </ColumnDialog>

            {/* Manage collection */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 mr-2" />
                  <span className="whitespace-nowrap">Manage Collection</span>
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
                    <Settings className="h-4" />{' '}
                    <span className="whitespace-nowrap">Edit Collection</span>
                  </Button>
                </div>
                <div className="h-full overflow-y-auto">
                  {state.columnOrder.map((fieldId) => {
                    const column = table.getColumn(fieldId)
                    const values = (column?.columnDef as any).values

                    if (!values) return

                    const { columnName, type } = values

                    const Icon =
                      fieldTypeConfig[type as keyof typeof fieldTypeConfig]
                        ?.Icon

                    return (
                      <ColumnHeader
                        column={column as any}
                        table={table as any}
                        key={fieldId}
                      >
                        <div className="flex items-center h-14 border w-full text-sm">
                          <GripVertical className="h-4 mx-4" />
                          <Checkbox
                            className="capitalize mr-4"
                            checked={column?.getIsVisible()}
                            onCheckedChange={handleOnColumnVisibility(
                              column as any
                            )}
                          />
                          {Icon ? <Icon /> : null}
                          {columnName}

                          <ColumnDropdownMenu className="ml-auto">
                            <ColumnDialog
                              step={2}
                              columnName={columnName}
                              fieldId={fieldId}
                              type={type}
                              {...values}
                              onEditColumn={handleOnColumnEdit}
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
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search */}
        <Input
          placeholder="Search..."
          value={table.getColumn('title')?.getFilterValue() as string}
          onChange={(_event: any) => {}}
          className="max-w-sm"
        />

        <div>
          {/* Toolbar */}
          <div className="h-10">
            {/* {table.getFilteredSelectedRowModel().rows.length ? (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      ) : null} */}
          </div>

          {/* Data Table */}

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
                      colSpan={columns?.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <ColumnDialog step={1} onAddColumn={handleOnAddColumn}>
              <Button className="data-table-add-column text-sm  bg-gray-900 text-accent-foreground  font-medium border border-l-0 rounded-none p-5 hover:bg-accent hover:text-accent-foreground">
                <Plus className="mr-2 h-4 w-4" />
                <span className="whitespace-nowrap">Add Column</span>
              </Button>
            </ColumnDialog>
            <div className="flex items-center w-full">
              {type === 'multiple' && (
                <Button
                  variant="ghost"
                  className="border data-table-add-column h-10 w-full text-left justify-start text-sm bg-gray-900 text-accent-foreground font-medium  rounded-none p-4 hover:bg-accent hover:text-accent-foreground"
                  onClick={handleOnAddItem}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  <span className="whitespace-nowrap">Add Item</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DndProvider>
      {type === 'multiple' && <Pagination {...queryParams} {...pagination} />}
    </>
  )
}
