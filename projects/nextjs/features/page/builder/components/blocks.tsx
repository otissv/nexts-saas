import * as React from 'react'
import { useDrag } from 'react-dnd'

import {
  Column,
  LayoutTypes,
  usePageStore,
} from '@/features/page/store/page.store'
import { DropZone, DropZoneProps } from '@/features/page/builder/dropzone'

function cloneElement(
  element: React.FunctionComponentElement<any>,
  props = {}
) {
  return React.cloneElement(element, {
    ...element.props,
    ...props,
  })
}

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  item: Column
  path: string
  drop?: (target: string, type: LayoutTypes) => DropZoneProps['drop']
}

export const RowBlock = ({
  item,
  children,
  path,
  drop,
  ...props
}: BlockProps) => {
  const ref = React.useRef(null)
  const { mode, updateLayout, setSelectedElement } = usePageStore()

  const [{ isDragging }, drag] = useDrag({
    type: 'row',
    item: {
      ...item,
      path,
    },
    // canDrag: () => isMove || mode === "move",

    end: (_item, monitor) => {
      const dropResult: any = monitor.getDropResult()

      if (dropResult) {
        const { dropEffect, ...item } = dropResult
        // setSelectedElement()
        updateLayout(item)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(ref)

  const pathSplit = path.split('-')

  pathSplit[pathSplit.length - 1] = `${
    parseInt(pathSplit[pathSplit.length - 1]) + 1
  }`

  const dropZonePath = pathSplit.join('-')

  return isDragging ? null : (
    <>
      <div ref={ref} {...props}>
        {children}
      </div>
      <DropZone
        data-blockpath={dropZonePath}
        direction="horizontal"
        drop={drop(dropZonePath, 'row')}
        data-type="row"
      />
    </>
  )
}
RowBlock.displayName = 'RowBlock'

export const ColumnBlock = ({
  item,
  children,
  path,
  drop,
  ...props
}: BlockProps) => {
  const ref = React.useRef(null)
  const { mode, updateLayout } = usePageStore()

  const [{ isDragging }, drag] = useDrag({
    type: 'column',
    item: {
      ...item,
      path,
    },

    // canDrag: () => isMove || mode === "move",

    end: (_item, monitor) => {
      const dropResult: any = monitor.getDropResult()
      if (dropResult) {
        const { dropEffect, ...item } = dropResult
        updateLayout(item)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(ref)

  const pathSplit = path.split('-')

  pathSplit[pathSplit.length - 1] = `${
    parseInt(pathSplit[pathSplit.length - 1]) + 1
  }`

  const dropZonePath = pathSplit.join('-')

  return isDragging ? null : (
    <>
      <div ref={ref} {...props}>
        {children}
      </div>
      <DropZone
        data-blockpath={dropZonePath}
        direction="vertical"
        drop={drop(dropZonePath, 'column')}
        data-type="column"
      />
    </>
  )
}
ColumnBlock.displayName = 'ColumnBlock'

export const ComponentBlock = ({
  item,
  children,
  path,
  drop,
  noDrop,
  ...props
}: BlockProps) => {
  const ref = React.useRef(null)

  const pageStore = usePageStore()
  const { mode, updateLayout } = pageStore

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: {
      ...item,
      path,
    },

    // canDrag: () => isMove || mode === "move",

    end: (_item, monitor) => {
      const dropResult: any = monitor.getDropResult()
      if (dropResult) {
        const { dropEffect, ...item } = dropResult
        updateLayout(item)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(ref)

  const pathSplit = path.split('-')

  pathSplit[pathSplit.length - 1] = `${
    parseInt(pathSplit[pathSplit.length - 1]) + 1
  }`

  const dropZonePath = pathSplit.join('-')

  const component = cloneElement(
    children as React.FunctionComponentElement<any>,
    { pageStore }
  )

  return isDragging ? null : (
    <>
      <div ref={ref} data-blockpath={path} {...props}>
        {children}
      </div>
      {noDrop ? null : (
        <DropZone
          data-blockpath={dropZonePath}
          direction="horizontal"
          drop={drop(dropZonePath, 'column')}
        />
      )}
    </>
  )
}
ComponentBlock.displayName = 'ComponentBlock'
