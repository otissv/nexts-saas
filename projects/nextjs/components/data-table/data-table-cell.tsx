'use client'

import React from 'react'

import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function DataTableCell({ getValue, row, column, table }) {
  const initialValue = getValue()
  const [value, setValue] = React.useState(initialValue)

  const { type } = column.columnDef.values

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value)
  }
  const selected = row.getIsSelected()

  switch (type) {
    case 'rich-text':
      return (
        <RichTextCell
          isSelected={selected}
          value={value}
          onBlur={onBlur}
          setValue={setValue}
        />
      )
    case 'text':
    case 'number':

    default:
      return (
        <TextCell
          isSelected={selected}
          value={value}
          onBlur={onBlur}
          setValue={setValue}
        />
      )
  }
}
export function getInputField(type) {}

export function TextCell({ isSelected, value, onBlur, className, setValue }) {
  return (
    <Input
      className={cn(
        'p-4 rounded-none border focus:border-white focus:bg-gray-900',
        className,
        isSelected && 'bg-gray-800'
      )}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  )
}

export function RichTextCell({
  isSelected,
  value,
  onBlur,
  setValue,
  className,
  ...props
}) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Input
            className={cn(
              'p-4 rounded-none border focus:border-white focus:bg-gray-900 w-[320px]',
              className,
              isSelected && 'bg-gray-800'
            )}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            {...props}
          />
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
