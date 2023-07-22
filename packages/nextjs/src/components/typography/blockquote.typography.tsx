'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '../lib/utils'
import { TypographyBlockquoteProps } from './types.typography'

export const TypographyBlockquote = React.forwardRef<
  HTMLQuoteElement,
  TypographyBlockquoteProps
>(({ children, className, ...props }, ref) => {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </blockquote>
  )
})
TypographyBlockquote.displayName = 'TypographyBlockquote'
