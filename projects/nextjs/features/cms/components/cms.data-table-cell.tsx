'use client'

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { GetFieldComponent } from '@/features/cms/components/cms.input-fields'

export function DataTableCell({ getValue, row, column, table }) {
  const initialValue = getValue()
  const [value, setValue] = React.useState(initialValue)

  const { type, fieldId } = column.columnDef.values

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onUpdate = (value: unknown) => {
    console.log(value)
    table.options.meta?.updateData(row.index, column.id, value)
  }
  const isSelected = row.getIsSelected()

  return (
    <DndProvider backend={HTML5Backend}>
      <GetFieldComponent
        type={type}
        value={value}
        isSelected={isSelected}
        onUpdate={onUpdate}
        fieldId={fieldId}
        isInline={true}
      />
    </DndProvider>
  )
}
