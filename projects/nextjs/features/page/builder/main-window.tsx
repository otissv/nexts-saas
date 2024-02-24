'use client'

import * as React from 'react'

import { Layout } from '@/features/page/builder/layout'
import { cn } from '@/lib/utils'
import { config } from '@/features/page/builder/config/config'
import { useZoomPan } from '@/hooks/zoom-pan.hook'

const { devices } = config

export interface MainWindowProps extends React.HTMLProps<HTMLDivElement> {
  isFullView: boolean
}

export const MainWindow = ({ isFullView }: MainWindowProps) => {
  const canvasRef = React.useRef<HTMLDivElement | null>(null)
  const viewportRef = React.useRef<HTMLDivElement | null>(null)
  const { canPan, canZoom, ...zoomPan } = useZoomPan({
    canvasRef,
    viewportRef,
  })

  return (
    <div
      className={cn(
        'main-window h-full overflow-auto flex',
        !isFullView && 'py-10 px-[200px]',
        canPan && 'select-none'
      )}
      ref={viewportRef}
      // {...zoomPan}
      tabIndex={-1}
    >
      <main className="flex h-full zoom" ref={canvasRef}>
        {isFullView ? (
          <>
            <Layout
              isFullView={isFullView}
              size="sm-sm"
              tabs={devices.full.tabs}
              sizes={devices.full.sizes}
              canPan={canPan}
            />
          </>
        ) : (
          <>
            <Layout
              isFullView={isFullView}
              title="Mobile"
              size="sm"
              tabs={devices.mobile.tabs}
              sizes={devices.mobile.sizes}
              canPan={canPan}
            />

            <Layout
              isFullView={isFullView}
              title="Tablet"
              size="sm"
              tabs={devices.tablet.tabs}
              sizes={devices.tablet.sizes}
              canPan={canPan}
            />

            <Layout
              isFullView={isFullView}
              title="Desktop"
              size="sm"
              tabs={devices.laptop.tabs}
              sizes={devices.laptop.sizes}
              canPan={canPan}
            />
          </>
        )}
      </main>
    </div>
  )
}
MainWindow.displayName = 'MainWindow'
