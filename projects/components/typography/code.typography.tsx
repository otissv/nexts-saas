'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyElementProps } from '../typography/types.typography'

export const TypographyCode = React.forwardRef<
  HTMLElement,
  TypographyElementProps
>(({ children, className, ...props }, ref) => {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </code>
  )
})
TypographyCode.displayName = 'TypographyCode'
