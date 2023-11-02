import { cn } from '@/lib/utils'
import * as React from 'react'
import {
  DragPreviewOptions,
  DragSourceMonitor,
  DragSourceOptions,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd'

export type DndItem = { id: string; [key: string]: any }

export interface DraggableProps<ItemProp extends DndItem>
  extends React.HTMLAttributes<HTMLElement> {
  as?: string
  collect?: ((monitor: Record<string, any>) => unknown) | undefined
  id: string
  item?: ItemProp
  type: string
  isDragging?:
    | ((
        monitor: DragSourceMonitor<
          {
            id: string
          },
          unknown
        >
      ) => boolean)
    | undefined
  previewOptions?: DragPreviewOptions | undefined
  options?: DragSourceOptions | undefined
  end?:
    | ((
        draggedItem: {
          id: string
        },
        monitor: DragSourceMonitor<
          {
            id: string
          },
          unknown
        >
      ) => void)
    | undefined
  canDrag?:
    | boolean
    | ((
        monitor: DragSourceMonitor<
          {
            id: string
          },
          unknown
        >
      ) => boolean)
    | undefined
}

export const Draggable = <ItemProp extends DndItem>({
  as = 'div',
  canDrag,
  children,
  collect,
  end,
  hover,
  id,
  isDragging,
  item,
  options,
  previewOptions,
  type,
  ...props
}: DraggableProps<ItemProp>) => {
  const [collectedProps, ref, dragPreview] = useDrag({
    canDrag,
    collect,
    end,
    hover,
    isDragging,
    item: { id, ...item },
    options,
    previewOptions,
    type,
  })

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  )
}
Draggable.displayName = 'Draggable'

export interface DroppableProps extends React.HTMLAttributes<HTMLElement> {
  accept: string | string[]
  options?: Record<string, any>
  drop?:
    | ((item: unknown, monitor: DropTargetMonitor<unknown, unknown>) => unknown)
    | undefined
  hover?:
    | ((item: unknown, monitor: DropTargetMonitor<unknown, unknown>) => void)
    | undefined
  deps?: unknown[] | undefined
  canDrop?:
    | ((item: unknown, monitor: DropTargetMonitor<unknown, unknown>) => boolean)
    | undefined
  collect?: ((monitor: Record<string, any>) => unknown) | undefined
}

export const Droppable = ({
  accept,
  drop,
  hover,
  deps,
  canDrop,
  children,
  className,
  ...props
}: DroppableProps) => {
  const [collectedProps, ref] = useDrop(() => ({
    accept,
    drop,
    hover,
    deps,
    canDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const collected = collectedProps as Record<string, any>
  const isActive = collected.canDrop && collected.isOver

  return (
    <div
      className={cn('droppable', isActive && 'bg-blue-400', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
}
Droppable.displayName = 'Droppable'
