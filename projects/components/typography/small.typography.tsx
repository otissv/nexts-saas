'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyDivProps } from '../typography/types.typography'

export const TypographySmall = React.forwardRef<
  HTMLDivElement,
  TypographyDivProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn('text-lg font-semibold', className)}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </div>
  )
})
TypographySmall.displayName = 'TypographySmall'
