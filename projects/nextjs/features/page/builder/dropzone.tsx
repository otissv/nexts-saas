import React from 'react'

import { DroppableProps, Droppable } from '@/components/dnd'
import { layoutTypes, LayoutTypes } from '@/features/page/store/page.store'
import { cn } from '@/lib/utils'

export interface DropZoneProps extends React.HTMLAttributes<HTMLElement> {
  canDrop?: DroppableProps['canDrop']
  collect?: DroppableProps['collect']
  deps?: DroppableProps['deps']
  direction: 'vertical' | 'horizontal'
  drop?: DroppableProps['drop']
  hover?: DroppableProps['hover']
  options?: DroppableProps['options']
  accept?: LayoutTypes
}

export const DropZone = ({
  accept,
  className,
  direction,
  ...props
}: DropZoneProps) => {
  return (
    <Droppable
      className={cn(
        'flex',
        direction === 'horizontal' && 'h-2',
        direction === 'vertical' && 'w-2',
        className
      )}
      accept={accept || layoutTypes}
      {...props}
    />
  )
}
