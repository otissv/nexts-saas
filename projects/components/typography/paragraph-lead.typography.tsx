'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyParagraphProps } from '../typography/types.typography'

export const TypographyLead = React.forwardRef<
  HTMLParagraphElement,
  TypographyParagraphProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      className={cn('text-xl text-muted-foreground', className)}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </p>
  )
})
TypographyLead.displayName = 'TypographyLead'
