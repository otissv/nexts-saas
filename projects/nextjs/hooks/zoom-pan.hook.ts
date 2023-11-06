import * as React from "react"

import { useThrottle } from "@react-hook/throttle"

export const useZoomPan = ({
  canvasRef,
  viewportRef,
}: {
  canvasRef: React.MutableRefObject<HTMLDivElement | null>
  viewportRef: React.MutableRefObject<HTMLDivElement | null>
}) => {
  // const [isSpaceKeyDown, setIsSpaceKeyDown] = useThrottle(false, 100)
  const [isSpaceKeyDown, setIsSpaceKeyDown] = useThrottle(false)
  const [isMouseDown, setMouseDown] = useThrottle(false)

  let [mouseX, setMouseX] = React.useState(0)
  let [mouseY, setMouseY] = React.useState(0)

  const canPan = isSpaceKeyDown && isMouseDown
  const canZoom = isSpaceKeyDown && isMouseDown

  //TODO: allow keys to work on children

  const setScale = (scaleChange: number) => {
    const currentScale =
      parseFloat(canvasRef.current.style.transform?.replace(/[^\d.-]/g, "")) ||
      1
    const newScale = currentScale + scaleChange
    canvasRef.current.style.transform = `scale(${newScale})`
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // const ctrlKey = event.ctrlKey || event.metaKey
    const spaceKey = event.key === "Space"

    if (canvasRef.current && spaceKey) {
      if (!isSpaceKeyDown) {
        event.preventDefault()
        setIsSpaceKeyDown(true)
      } else if (!isSpaceKeyDown && (event.key === "=" || event.key === "-")) {
        event.preventDefault()
        const scaleChange = event.key === "-" ? -0.1 : 0.1
        setScale(scaleChange)
      } else if (event.key === "0" && !isSpaceKeyDown) {
        event.preventDefault()
        canvasRef.current.style.transform = "scale(1)"
      }
    }

    if (viewportRef.current && spaceKey) {
      if (!isSpaceKeyDown) {
        setIsSpaceKeyDown(true)
      } else if (event.key == "ArrowLeft") {
        event.preventDefault()
        viewportRef.current?.scrollBy(-10, 0)
      } else if (event.key == "ArrowRight") {
        event.preventDefault()
        viewportRef.current?.scrollBy(10, 0)
      } else if (event.key == "ArrowUp") {
        event.preventDefault()
        viewportRef.current?.scrollBy(0, -10)
      } else if (event.key == "ArrowDown") {
        event.preventDefault()
        viewportRef.current?.scrollBy(0, 10)
      }
    }
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (canvasRef.current && event.key === "Space" && !isSpaceKeyDown) {
      setIsSpaceKeyDown(true)
    }

    if (viewportRef && event.key === "Space" && isSpaceKeyDown) {
      setIsSpaceKeyDown(false)
    }
  }

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (canPan) {
      setMouseX(event.clientX)
      setMouseY(event.clientY)
    }
  }

  const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    if (event.button === 0 && !isMouseDown) {
      setMouseDown(true)
      document.body.style.cursor = "grabbing"
    }
  }

  const onMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button === 0 && isMouseDown) {
      setMouseDown(false)
      document.body.style.cursor = "auto"
    }
  }

  const onWheel = (event: WheelEvent) => {
    event.preventDefault()

    if (canvasRef.current && isSpaceKeyDown) {
      const scaleChange = event.deltaY > 0 ? -0.1 : 0.1
      setScale(scaleChange)
    }
  }

  React.useEffect(() => {
    window.addEventListener("keydown", onKeyDown as any)
    window.addEventListener("keyup", onKeyUp as any)
    window.addEventListener("wheel", onKeyUp as any, { passive: false })

    return () => {
      window.removeEventListener("keydown", onKeyDown as any)
      window.removeEventListener("keyup", onKeyUp as any)
      window.removeEventListener("wheel", onWheel as any)
    }
  }, [])

  React.useEffect(() => {
    if (canPan && viewportRef.current) {
      const xScrollAmount =
        10 * Math.sign(document.documentElement.clientWidth / 2 - mouseX)
      const yScrollAmount =
        10 * Math.sign(document.documentElement.clientHeight / 2 - mouseY)

      viewportRef.current?.scrollBy(xScrollAmount, yScrollAmount)
    }
  }, [canPan, mouseX, mouseY])

  return {
    canZoom,
    canPan,
    onKeyDown,
    onKeyUp,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheel,
  }
}
