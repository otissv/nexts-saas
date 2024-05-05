'use client'

import React from 'react'

import { GetFieldComponent } from '@/features/cms/components/cms-config'
import { CmsCollectionColumn } from '../cms.types'

export function DataTableCell({
  getValue,
  row,
  column,
  table,
  fieldId,
  type,
  errors,
}: {
  fieldId: string
  type?: CmsCollectionColumn['type']
}) {
  const initialValue = getValue()
  const [value, setValue] = React.useState(initialValue)
  const [isMounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onUpdate = (value: unknown, errorMessage: string) => {
    isMounted &&
      table.options.meta?.updateData({
        rowIndex: row.index,
        columnId: column.id,
        value,
        errorMessage,
      })
  }
  const isSelected = row.getIsSelected()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const celId = `${column.id}:${row.index}`

  const errorMessage = errors.get(celId) || ''

  return (
    <GetFieldComponent
      id={celId}
      type={type}
      value={value}
      isSelected={isSelected}
      onUpdate={onUpdate}
      fieldId={fieldId}
      isInline={true}
      validate={column.columnDef.validate}
      errorMessage={errorMessage}
      validation={column.columnDef.validation}
    />
  )
}
