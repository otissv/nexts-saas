'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyUListProps } from './types.typography'

export const TypographyUList = React.forwardRef<
  HTMLUListElement,
  TypographyUListProps
>(({ children, className, ...props }, ref) => {
  return (
    <ul
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </ul>
  )
})
TypographyUList.displayName = 'TypographyUList'
