'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyHeadingProps } from './types.typography'

export const TypographyH3 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ children, className, ...props }, ref) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </h3>
  )
})
TypographyH3.displayName = 'TypographyH3'
