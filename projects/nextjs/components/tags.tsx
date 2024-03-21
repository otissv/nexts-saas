'use client'
import React from 'react'
import { Check, ChevronDown, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge, BadgeProps } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { isEmpty } from 'c-ufunc/libs/isEmpty'

export interface TagProps extends React.InputHTMLAttributes<HTMLDivElement> {}
export function TagsInput({ children, className }: TagProps) {
  return (
    <div
      className={cn(
        'relative flex gap-2 h-10 border rounded-md w-full px-2 ',
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
export function TagItem({ id, value, onRemoveItem, ...props }: TagItemProps) {
  const handleOnRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    onRemoveItem && onRemoveItem(e.currentTarget.id)
  }

  return (
    <Badge
      {...props}
      aria-labelledby={`tag-input-item=${id}`}
      aria-current="false"
      className="bg-accent text-foreground rounded-md px-2 py-1 h-6 self-center"
      variant="outline"
    >
      <span className="whitespace-nowrap">{value}</span>
      <button id={id} onClick={handleOnRemove}>
        <X className="h-4 w-4 ml-2" />
      </button>
    </Badge>
  )
}

export type TagInputItem = {
  id: string
  value: string
}
export interface TagInputProps
  extends Omit<React.InputHTMLAttributes<HTMLElement>, 'value'> {
  value?: TagInputItem
  onUpdate: (items: TagInputItem[]) => void
  hasSelect?: boolean
  items?: TagInputItem[]
  selectedItems?: TagInputItem[]
}
export function TagInput({
  className,
  value: initialValue,
  onUpdate,
  autoComplete,
  items,
  placeholder,
  selectedItems = [],
  ...props
}: TagInputProps) {
  const [state, setState] = React.useState(initialValue)
  const [open, setOpen] = React.useState<boolean>(false)

  const value = state?.value || ''

  const handleOnMouseDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter' && onUpdate && state?.value.trim() !== '') {
      onUpdate(state as TagInputItem)
      setState({} as TagInputItem)
    }
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      value: e.target.value,
    })
  }

  const handleOnSelectClick = (item: TagInputItem) => () => {
    const exitingItem = selectedItems?.find((f) => f.id === item.id)
    if (exitingItem) {
      onUpdate && onUpdate(selectedItems.filter((f) => f.id !== exitingItem.id))
    } else {
      onUpdate && onUpdate([...selectedItems, item])
    }
  }

  const handleOpen = () => {
    setOpen(!open)
  }

  return !isEmpty(items) ? (
    <div className=" relative grid grid-rows-2 grid-col-1">
      <DropdownMenu open={open} onOpenChange={handleOpen}>
        <DropdownMenuTrigger asChild>
          <>
            <div>{placeholder || 'Select...'} hello</div>

            <Button variant="ghost" className="flex h10 w-10 p-0">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="relative justify-start p-0 pt-8 ">
          {items
            ? items
                .filter((item) => item.value.includes(value))
                .map(({ id, value }) => {
                  const isSelected = !!selectedItems?.find(
                    (item) => item.id.toLowerCase() === id.toLowerCase()
                  )

                  return (
                    <Button
                      key={id}
                      variant="ghost"
                      className="flex items-center gap-4 w-full justify-star pr-12"
                      onClick={handleOnSelectClick({ id, value })}
                    >
                      <Check
                        className={cn(
                          'h-3 w-3 inline-flex',
                          !isSelected && 'text-transparent'
                        )}
                      />

                      {value}
                    </Button>
                  )
                })
            : null}
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
            onClick={handleOpen}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <input
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      onChange={handleOnChange}
      {...props}
      className={cn(
        'w-32 h-10 ml-2 bg-transparent focus:outline-none',
        className
      )}
      value={value}
      onKeyDown={handleOnMouseDown}
      type="text"
      placeholder={placeholder}
    />
  )
}
