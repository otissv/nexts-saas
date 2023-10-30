'use client'

import React from 'react'
import { useInView } from 'react-intersection-observer'

export interface InViewProps extends React.HTMLAttributes<HTMLElement> {
  as: string
  action: (
    element: (node?: Element | null | undefined) => void,
    inView: boolean
  ) => void
}
export const InView = ({
  children,
  action,
  as = 'div',
  ...props
}: InViewProps) => {
  const { ref, inView } = useInView()

  const clonedElement = React.createElement(
    as,
    { ref, ...props },
    <>{children}</>
  )

  React.useEffect(() => {
    if (inView) {
      action(ref, inView)
    }
  }, [inView, action, ref])

  return clonedElement
}
InView.displayName = 'InView'
