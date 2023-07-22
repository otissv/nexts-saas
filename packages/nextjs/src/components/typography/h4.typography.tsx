'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyHeadingProps } from './types.typography'

export const TypographyH4 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ children, className, ...props }, ref) => {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </h4>
  )
})
TypographyH4.displayName = 'TypographyH4'
