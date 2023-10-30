'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import { Animate } from '@/components/animate/animate'
import { Animation } from '@/hooks/animate.hook'
import { GetPageTransition } from '@/components/element-page-transition/element-page-transition-hook'

export interface ElementPageTransitionInProps
  extends React.HTMLAttributes<HTMLElement> {
  animation: Animation
  getPage: GetPageTransition
}

export const ElementPageTransitionIn = ({
  animation,
  className,
  children,
  getPage,
  ...props
}: ElementPageTransitionInProps) => {
  const pathname = usePathname()

  const { top } = getPage(pathname) || {}

  return (
    <Animate
      animation={animation}
      className={cn('overflow-hidden', top ? 'opacity-0' : '', className)}
      {...props}
    >
      {children}{' '}
    </Animate>
  )
}
