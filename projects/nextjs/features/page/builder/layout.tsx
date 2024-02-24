'use client'

import * as React from 'react'
import { useFrame } from 'react-frame-component'

import { Button } from '@/components/ui/button'

import { DndFrame } from '@/components/frame'
import { cn } from '@/lib/utils'
import { tailwind } from '@/features/page/builder/config/tailwind.config'
import { usePageStore, LayoutTypes } from '@/features/page/store/page.store'

import {
  PropertyBreakpoints,
  usePropertiesStore,
} from '../store/properties.store'
import { DropZone } from './dropzone'
import { BuildLayout } from './build-layout'

export interface LayoutInitProps extends React.HTMLAttributes<HTMLElement> {}

export const LayoutInit = ({ children }: LayoutInitProps) => {
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
  }, [breakpoint, isFullView])

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
