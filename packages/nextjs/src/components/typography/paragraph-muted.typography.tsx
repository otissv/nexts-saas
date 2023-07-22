'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyParagraphProps } from './types.typography'

export const TypographyMuted = React.forwardRef<
  HTMLParagraphElement,
  TypographyParagraphProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </p>
  )
})
TypographyMuted.displayName = 'TypographyMuted'
