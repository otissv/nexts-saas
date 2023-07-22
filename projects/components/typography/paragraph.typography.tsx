'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyParagraphProps } from '../typography/types.typography'

export const TypographyParagraph = React.forwardRef<
  HTMLParagraphElement,
  TypographyParagraphProps
>(({ children, className, ...props }, ref) => {
  return (
    <p
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </p>
  )
})
TypographyParagraph.displayName = 'TypographyParagraph'
