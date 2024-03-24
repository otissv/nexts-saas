'use client'

import React from 'react'

import { GetFieldComponent } from '@/features/cms/components/cms.input-fields'

export function DataTableCell({ getValue, row, column, table }) {
  const initialValue = getValue()
  const [value, setValue] = React.useState(initialValue)
  const [isMounted, setMounted] = React.useState(false)

  const { type, fieldId } = column.columnDef.values

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onUpdate = (value: unknown) => {
    isMounted && table.options.meta?.updateData(row.index, column.id, value)
  }
  const isSelected = row.getIsSelected()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <GetFieldComponent
      type={type}
      value={value}
      isSelected={isSelected}
      onUpdate={onUpdate}
      fieldId={fieldId}
      isInline={true}
    />
  )
}
