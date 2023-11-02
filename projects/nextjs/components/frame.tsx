"use client"

import * as React from "react"
import { DndContext } from "react-dnd"
import FrameComponent, { FrameContext } from "react-frame-component"

export const DroppableFrame = ({ children }: { children: React.ReactNode }) => {
  const { dragDropManager } = React.useContext(DndContext)
  const { window } = React.useContext(FrameContext)

  React.useEffect(() => {
    // @ts-ignore
    dragDropManager.getBackend().addEventListeners(window)
  }, [])

  return <>{children}</>
}
DroppableFrame.displayName = "DroppableFrame"

export interface FrameProps
  extends React.IframeHTMLAttributes<HTMLIFrameElement> {}

export const Frame = React.forwardRef<HTMLIFrameElement, FrameProps>(
  (
    { children, width = "320px", height = "425px", style, srcDoc, ...props },
    ref
  ) => {
    const [hasMounted, setHasMounted] = React.useState(false)

    React.useEffect(() => {
      setHasMounted(true)
    }, [])

    if (!hasMounted) return <></>

    return (
      <FrameComponent
        ref={ref}
        {...props}
        style={{
          width,
          height,
          ...style,
        }}
        initialContent={
          srcDoc
            ? srcDoc
            : "<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><script src='https://cdn.tailwindcss.com'></script><style>body{margin: 0;background:#ffffff;}</style></head><body><div class=&quot;frame-root&quot;></div></body></html>"
        }
      >
        {children}
      </FrameComponent>
    )
  }
)
Frame.displayName = "Frame"

export const DndFrame = React.forwardRef<HTMLIFrameElement, FrameProps>(
  ({ children, ...props }, ref) => {
    return (
      <Frame ref={ref} {...props}>
        <DroppableFrame>{children}</DroppableFrame>
      </Frame>
    )
  }
)
DndFrame.displayName = "DndFrame"
