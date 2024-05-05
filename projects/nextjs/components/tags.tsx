'use client'

import React from 'react'
import { Check, ChevronDown, Plus, X } from 'lucide-react'
import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/lib/utils'
import { Badge, BadgeProps } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Button, ButtonProps } from '@/components/ui/button'
import { isEmpty } from 'c-ufunc/libs/isEmpty'
import { Skeleton } from './ui/skeleton'

export type TagInputItem = {
  id: string
  value: string
}

export type TagSelectSelectedItem = TagInputItem

export type TagSelectSelected = {
  selectedItems: TagInputItem[]
  items: TagInputItem[]
}

export interface TagsInputProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}
export function TagsInput({ children, className }: TagsInputProps) {
  return (
    <div
      className={cn(
        'relative flex gap-2 h-10 border rounded-md pl-2',
        className
      )}
    >
      {children}
    </div>
  )
}

export interface TagItemProps extends BadgeProps {
  value: string
  onRemoveItem: (id: string) => void
}
export function TagItem({
  className,
  id,
  value,
  onRemoveItem,
  ...props
}: TagItemProps) {
  const handleOnRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onRemoveItem && onRemoveItem(e.currentTarget.id)
  }

  return (
    <Badge
      {...props}
      aria-labelledby={`tag-input-item=${id}`}
      aria-current="false"
      className={cn(
        'bg-accent text-foreground text-base rounded-md px-2 py-1 h-6 self-center',
        className
      )}
      variant="outline"
    >
      <span className="whitespace-nowrap">{value}</span>
      <button id={id} onClick={handleOnRemove}>
        <X className="h-4 w-4 ml-2" />
      </button>
    </Badge>
  )
}

export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLElement>, 'value'> {
  value?: string
  onUpdate: (items: TagInputItem[]) => void
  selectedItems?: TagInputItem[]
}
export function TagInput({
  className,
  value: initialValue = '',
  onUpdate,
  placeholder,
  selectedItems = [],
  id,
  ...props
}: TagInputProps) {
  const [value, setValue] = React.useState(initialValue)

  const updateValue = () => {
    const exitingItem = selectedItems?.find((f) => f.id === value)

    if (onUpdate && !exitingItem && value.trim() !== '') {
      onUpdate([...selectedItems, { id: value, value }])
    }
    setValue('')
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' || e.key == ' ') {
      updateValue()
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className="flex items-center ml-auto">
      <input
        id={id}
        aria-labelledby={id}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onChange={handleOnChange}
        {...props}
        className={cn(
          'min-w-16 max-w-48 h-10 px-2 ml-2 bg-transparent focus:outline-none focus:bg-accent',
          className
        )}
        value={value}
        onKeyDown={handleOnKeyDown}
        type="text"
        placeholder={placeholder}
      />

      <Button
        className="rounded-tl-none rounded-bl-none border-none border-l-1"
        title="Add button"
        onClick={() => updateValue()}
      >
        <Plus className="h-4 w-4 mr-1" /> Add
      </Button>
    </div>
  )
}

export const TagSelectGroup = SelectGroup
export const TagSelectLabel = SelectLabel
export const TagSelectValue = SelectValue

export interface TagSelectProps extends SelectPrimitive.SelectProps {
  className?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
export function TagSelect({
  className,
  children,
  open,
  onOpenChange,
}: TagSelectProps) {
  return (
    <div
      className={cn('relative grid grid-rows-2 grid-col-1 ml-auto', className)}
    >
      <Select open={open} onOpenChange={onOpenChange}>
        {children}
      </Select>
    </div>
  )
}

export interface TagSelectTriggerProps
  extends Omit<
    SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>,
    'ref' | 'type'
  > {
  selectedItems?: TagSelectSelectedItem[]
  type?: 'single' | 'multiple'
}
export function TagSelectTrigger({
  className,
  children,
  placeholder,
  selectedItems = [],
  type,
  ...props
}: TagSelectTriggerProps) {
  return (
    <SelectTrigger asChild>
      <Button
        {...props}
        aria-multiselectable={type === 'multiple'}
        variant="ghost"
        className={cn('flex gap-2 h-10 py-0 border-0 text-base', className)}
      >
        {children ? (
          <>children</>
        ) : (
          <>
            {isEmpty(selectedItems) ? <>{placeholder}</> : null}
            <ChevronDown className="h-4 w-4" />
          </>
        )}
      </Button>
    </SelectTrigger>
  )
}

export interface TagSelectContentProps
  extends Omit<
    SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>,
    'ref'
  > {}
export function TagSelectContent({
  className,
  children,
}: TagSelectContentProps) {
  return (
    <SelectContent className={cn('relative p-0', className)}>
      {children}
    </SelectContent>
  )
}

export interface TagSelectItemProps extends Omit<ButtonProps, 'ref' | 'type'> {
  type?: 'single' | 'multiple'
  isSelected?: boolean
}
export function TagSelectItem({
  type = 'single',
  id,
  onSelect,
  value,
  isSelected,
  onClick,
  ...props
}: TagSelectItemProps) {
  return (
    <Button
      {...props}
      aria-checked={Boolean(value)}
      role="checkbox"
      variant="ghost"
      className="flex items-center gap-4 w-full justify-start pr-12"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        onSelect({ id, value })
        onClick && onClick(e)
      }}
    >
      <Check
        className={cn(
          'h-6 w-6 inline-fle',

          type === 'multiple' &&
            'border rounded-md p-1 border-white hover:border-accent-foreground',
          !isSelected && 'text-transparent'
        )}
      />
      <span className="whitespace-nowrap">{value}</span>
    </Button>
  )
}

export interface TagSelectItemsProps
  extends Omit<React.HtmlHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  items?: TagInputItem[]
  selectedItems?: TagSelectSelectedItem[]
  type?: 'single' | 'multiple'
  value?: string[]
  onSelect: (
    nextSelectedItems: TagSelectSelectedItem[],
    previousSelectedItems: TagSelectSelectedItem[]
  ) => void
}
export function TagSelectItems({
  items = [],
  selectedItems = [],
  type = 'multiple',
  onSelect,
}: TagSelectItemsProps) {
  const isMultiSelect = type === 'multiple'

  const handleOnSelect = (item: TagInputItem) => {
    const exitingItem = selectedItems?.find((f) => f.id === item.id)
    const hasItem = Boolean(exitingItem && onSelect)

    switch (true) {
      case isMultiSelect && hasItem:
        return (
          onSelect &&
          onSelect(
            selectedItems.filter((f) => f.id !== exitingItem?.id),
            selectedItems
          )
        )
      case isMultiSelect: {
        return onSelect([...selectedItems, item], selectedItems)
      }
      case !isMultiSelect && hasItem: {
        return onSelect && onSelect([], selectedItems)
      }
      case !isMultiSelect: {
        return onSelect && onSelect([item], selectedItems)
      }
    }
  }

  return items.length > 0 ? (
    <div>
      {items.map(({ id, value }) => {
        const isSelected = !!selectedItems?.find(
          (item) => item.id.toLowerCase() === id.toLowerCase()
        )

        return (
          <TagSelectItem
            type={type}
            key={id}
            id={id}
            value={value}
            isSelected={isSelected}
            onSelect={handleOnSelect}
          />
        )
      })}
    </div>
  ) : (
    <div className="grid gap-1">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
    </div>
  )
}
