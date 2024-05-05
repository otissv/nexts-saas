'use client'

import React from 'react'

import { cn } from '@/lib/utils'
import {
  TagInputItem,
  TagItem,
  TagSelect,
  TagSelectContent,
  TagSelectGroup,
  TagSelectItems,
  TagSelectSelected,
  TagSelectTrigger,
  TagsInput,
} from '@/components/tags'
import { deepCompareObjects } from '@/lib/compareCollections'
import { CmsField } from '../cms-config'
import { SelectOptions } from './select'

export type TagSelectFieldProps = Omit<CmsField<HTMLInputElement>, 'type'> & {
  value: TagSelectSelected
  onUpdate: (selectItem: TagSelectSelected) => void
  items?: TagInputItem[]
  type?: 'single' | 'multiple'
  url?: RequestInfo
}
export function TagsSelectField({
  value: initialValue = {
    selectedItems: [],
    items: [],
  },
  className,
  fieldId,
  isInline,
  isSelected,
  errorMessage,
  onUpdate,
  validate,
  onBlur,
  type = 'multiple',
  url,
}: TagSelectFieldProps) {
  const [{ items, selectedItems }, setState] =
    React.useState<TagSelectSelected>({
      selectedItems: initialValue.selectedItems || [],
      items: initialValue.items || [],
    })

  const [previousSelectedItems, setPreviousSelectedItems] = React.useState(
    initialValue.selectedItems || []
  )
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url as RequestInfo)
      if (!response.ok) throw new Error('Network response was not ok')

      const { data: items } = await response.json()
      setState({
        selectedItems,
        items,
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (
      !isOpen &&
      !deepCompareObjects({
        items,
        selectedItems: previousSelectedItems,
      })({ items, selectedItems })
    ) {
      setPreviousSelectedItems(selectedItems)
      onUpdate && onUpdate({ items, selectedItems })
    }
  }, [isOpen, initialValue, selectedItems])

  React.useEffect(() => {
    if (isOpen && url) {
      fetchData()
    }
  }, [url, isOpen])

  const updateState = (
    nextSelectedItems: TagSelectSelected['selectedItems'],
    previousSelectedItems: TagSelectSelected['selectedItems']
  ) => {
    setState({
      items,
      selectedItems: nextSelectedItems,
    })
    setPreviousSelectedItems(previousSelectedItems)
  }

  return (
    <TagsInput className={cn(isInline && 'rounded-none border-t-0', className)}>
      {selectedItems.map(({ id, value }) => {
        return (
          <TagItem
            key={id}
            id={id}
            value={value}
            onRemoveItem={(id: string) =>
              updateState(
                selectedItems.filter((s) => s.id !== id),
                selectedItems
              )
            }
          />
        )
      })}
      <TagSelect open={isOpen} onOpenChange={setIsOpen}>
        <TagSelectTrigger
          placeholder="Select"
          selectedItems={selectedItems}
          type={type}
        />
        <TagSelectContent>
          <TagSelectGroup>
            <TagSelectItems
              type={type}
              items={items}
              selectedItems={selectedItems}
              onSelect={updateState}
            />
          </TagSelectGroup>
        </TagSelectContent>
      </TagSelect>
    </TagsInput>
  )
}

export const TagSelectOptions = SelectOptions
