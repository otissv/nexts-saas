'use client'

import * as React from 'react'

import { InView } from '@/components/in-view'
import { useAnimation, Animation } from '@/hooks/animate.hook'

export interface AnimateInViewProps extends React.HTMLAttributes<HTMLElement> {
  as: string
  animation: Animation
}

export const AnimateInView = ({
  animation,
  as = 'div',
  children,
  ...props
}: AnimateInViewProps) => {
  const [active, setActive] = React.useState('')

  const currentAnimation = useAnimation(active, {
    active: animation,
  })

  return (
    <InView
      action={() => setActive('active')}
      as={as}
      {...props}
      style={{ ...props.style, ...currentAnimation }}
    >
      {children}
    </InView>
  )
}

export interface AnimateProps extends React.HTMLAttributes<HTMLElement> {
  as?: string
  animation: Animation
}
export const Animate = ({
  animation,
  as = 'div',
  children,
  ...props
}: AnimateProps) => {
  const ref = React.useRef<HTMLElement>()
  const currentAnimation = useAnimation(
    animation ? 'active' : '',
    {
      active: animation,
    },
    ref
  )

  const clonedElement = React.createElement(
    as,
    { ref, ...props, style: { ...currentAnimation, ...props.style } },
    <>{children}</>
  )

  return clonedElement
}
