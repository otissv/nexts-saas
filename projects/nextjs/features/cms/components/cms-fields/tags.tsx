'use client'
import React from 'react'

import { TagInput, TagInputItem, TagItem, TagsInput } from '@/components/tags'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { compareCollections } from '@/lib/compareCollections'
import { cn } from '@/lib/utils'
import { CmsField } from '../cms-config'
import { SelectOptions } from './select'

export type TagsFieldProps = CmsField<HTMLInputElement> & {
  value: TagInputItem[]
  onUpdate?: (items: TagInputItem[]) => void
}
export function TagsField({
  className,
  fieldId,
  isInline,
  isSelected,
  value = [],
  onUpdate,
  errorMessage,
  validate,
  onBlur,
}: TagsFieldProps) {
  const [state, setState] = React.useState<TagInputItem[]>(value)
  const [isOpen, setIsOpen] = React.useState(false)

  const tagItems = state.map(({ id, value }) => {
    return (
      <TagItem
        key={id}
        id={id}
        value={value}
        onRemoveItem={(id: string) =>
          setState(state.filter((item) => item.id !== id))
        }
      />
    )
  })

  React.useEffect(() => {
    if (!isOpen && !compareCollections(value)(state)) {
      onUpdate && onUpdate(state)
    }
  }, [isOpen, value, state])

  return isInline ? (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'min-w-48 flex gap-2 items-center w-full h-10 p-2 border',
            isInline && 'border-t-0',
            className
          )}
        >
          {tagItems}
        </div>
      </PopoverTrigger>

      <PopoverContent className={cn('w-full min-w-80 p-0 border-0')}>
        <TagsInput className="flex items-center ">
          {tagItems}
          <TagInput
            id={fieldId}
            placeholder="Items..."
            selectedItems={state}
            onUpdate={setState}
          />
        </TagsInput>
      </PopoverContent>
    </Popover>
  ) : (
    <TagsInput>
      {tagItems}
      <TagInput
        id={fieldId}
        placeholder="Items..."
        selectedItems={state}
        onUpdate={setState}
      />
    </TagsInput>
  )
}

export const TagsOptions = SelectOptions
