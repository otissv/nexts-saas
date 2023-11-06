'use client'

import * as React from 'react'
import { useFrame } from 'react-frame-component'

import { Button } from '@/components/ui/button'
import {
  ColumnBlock,
  ComponentBlock,
  RowBlock,
} from '@/features/page/builder/components/blocks'
import { DndFrame } from '@/components/frame'
import { cn } from '@/lib/utils'
import { components } from '@/features/page/builder/components/components'
import { tailwind } from '@/features/page/builder/config/tailwind.config'
import {
  usePageStore,
  LayoutItem,
  LayoutTypes,
} from '@/features/page/store/page.store'

import {
  PropertyBreakpoints,
  usePropertiesStore,
} from '../store/properties.store'
import { DropZone, DropZoneProps } from './dropzone'

export interface LayoutInitProps extends React.HTMLAttributes<HTMLElement> {}

export const LayoutInit = ({ children }: LayoutInitProps) => {
  //TODO: remove if not used
  const { getPageLayout } = usePageStore()
  const { document: doc } = useFrame()

  return <>{children}</>
}
LayoutInit.displayName = 'LayoutInit'

// @ts-ignore override size with device size type
export interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
  isFullView?: boolean
  tabs: {
    breakpoint: PropertyBreakpoints
    label: string
    size: string
    width: string
  }[]
  canPan?: boolean
  size: string
  sizes: Record<string, any>
}

export const Layout = ({
  canPan,
  children,
  rows,
  size,
  sizes,
  tabs = [],
  title,
  isFullView,
  ...props
}: LayoutProps) => {
  const { getPageLayout } = usePageStore()
  const [width, setWidth] = React.useState(size)
  const { setBreakpoint, breakpoint } = usePropertiesStore()
  const iframeRef = React.useRef<HTMLIFrameElement | undefined>()
  const [frameHeight, setFrameHeight] = React.useState('40px')

  const layout = getPageLayout()

  React.useEffect(() => {
    if (isFullView) {
      const size =
        breakpoint === '' ? 'sm-sm' : `${breakpoint.replace(':', '')}-sm`
      setWidth(size)
    }
  }, [breakpoint])

  React.useEffect(() => {
    if (iframeRef?.current?.style) {
      setFrameHeight(
        iframeRef.current.contentDocument?.body.scrollHeight + 'px'
      )
    }
  })

  const handleOnDrop =
    (target: string, type: LayoutTypes) => (item, monitor) => {
      return {
        ...item,
        target: {
          path: target,
          type,
        },
      }
    }

  return (
    <div id="myDiv" className="flex flex-col items-center">
      <span>
        {title} - {sizes[width]}
      </span>

      <div
        className={cn(`flex flex-col items-center`, !isFullView && 'mx-6')}
        {...props}
      >
        <div className="flex mb-1" style={{ width: sizes.lg }}>
          {tabs.map(({ size, label, width, breakpoint }, i) => (
            <Button
              key={i}
              className="border-0  ml-px bg-muted p-0 rounded-none text-muted-foreground"
              aria-label={label}
              onClick={() => {
                setWidth(size)
                if (breakpoint === ('sm' as PropertyBreakpoints)) {
                  setBreakpoint('')
                } else {
                  setBreakpoint(breakpoint)
                }
              }}
              style={{ width }}
            >
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
        <div
          className={`border border-gray-300 transition-all ease-linear`}
          style={{ width: sizes[width] }}
        >
          <DndFrame
            ref={iframeRef}
            width="inherit"
            //TODO: use calc to fit iframe
            style={{ height: frameHeight, width: 'inherit' }}
            srcDoc={`<!DOCTYPE html>
  <html>
  <head>
    <meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <style>body{margin: 0;background:#ffffff;}</style>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>tailwind.config = ${JSON.stringify(tailwind)}</script>
  </head>
  <body>
    <div class='frame-root'></div>
  </body>
  </html>`}
          >
            <LayoutInit>
              <DropZone
                data-blockpath="0"
                direction="horizontal"
                drop={handleOnDrop('0', 'row')}
                data-type="row"
              />
              <BuildLayout
                layout={layout?.children}
                drop={handleOnDrop}
                parent={''}
              />
            </LayoutInit>
          </DndFrame>
        </div>
      </div>
    </div>
  )
}
Layout.displayName = 'Layout'

function BuildLayout({
  drop,
  layout,
  parent,
}: {
  drop: (target: string, type: LayoutTypes) => DropZoneProps['drop']
  layout: LayoutItem[]
  parent: string
}) {
  const { mode, setSelectedElement } = usePageStore()

  if (!layout) return null

  const isEdit = mode === 'edit'

  const handleOnElementClick = (e: React.MouseEvent<HTMLElement>) => {
    setSelectedElement({
      // @ts-expect-error dataset exits
      path: e.target.dataset.blockpath,
      // @ts-expect-error dataset exits
      element: e.target.dataset.editor,
    })
  }

  return (layout || []).map((item, index) => {
    const path = `${parent.trim() === '' ? '' : parent + '-'}${index}`

    switch (item.type) {
      case 'column': {
        return (
          <React.Fragment key={item.id}>
            <ColumnBlock
              data-editor={`${item.id}-root`}
              data-blockpath={path}
              path={path}
              item={item}
              drop={drop}
              onClick={handleOnElementClick}
              className={cn(
                'column-block flex flex-col',
                item.props?.className
              )}
            >
              {item.children ? (
                <>
                  <DropZone
                    data-blockpath={`${path}-0`}
                    direction="horizontal"
                    drop={drop(`${path}-0`, 'column')}
                    data-type="column"
                  />
                  <BuildLayout
                    layout={item.children}
                    drop={drop}
                    parent={path}
                  />
                </>
              ) : null}
            </ColumnBlock>
          </React.Fragment>
        )
      }

      case 'component': {
        const Component = components[item.component]
        return (
          <ComponentBlock
            data-blockpath={path}
            key={item.id}
            path={path}
            item={item as any}
            drop={drop}
            className="component-block"
          >
            <Component
              data-blockpath={path}
              data-editor={`${item.id}-root`}
              onClick={handleOnElementClick}
              id={item.id}
              key={item.id}
              isEdit={isEdit}
              {...item.props}
            />
          </ComponentBlock>
        )
      }

      case 'row':
      default: {
        return (
          <RowBlock
            data-blockpath={path}
            data-editor={`${item.id}-root`}
            key={item.id}
            path={path}
            onClick={handleOnElementClick}
            item={item as any}
            drop={drop}
            className={cn('row-block flex', item.props?.className)}
          >
            {item.children ? (
              <>
                <DropZone
                  data-blockpath={`${parseInt(path)}-0`}
                  direction="vertical"
                  drop={drop(`${parseInt(path)}-0`, 'column')}
                  data-type="column"
                />

                <BuildLayout
                  layout={item.children}
                  drop={drop}
                  parent={`${parseInt(path)}`}
                />
              </>
            ) : null}
          </RowBlock>
        )
      }
    }
  })
}
