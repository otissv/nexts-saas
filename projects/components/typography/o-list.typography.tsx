'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyOListProps } from '../typography/types.typography'

export const TypographyOList = React.forwardRef<
  HTMLOListElement,
  TypographyOListProps
>(({ children, className, type, ...props }, ref) => {
  return (
    <ol
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </ol>
  )
})
TypographyOList.displayName = 'TypographyOList'
