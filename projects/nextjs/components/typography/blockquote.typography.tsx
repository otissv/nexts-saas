'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { TypographyBlockquoteProps } from '@/components/typography/types.typography'
import { variants } from '@/components/typography/variants.typography'

export const TypographyBlockquote = React.forwardRef<
  HTMLQuoteElement,
  TypographyBlockquoteProps
>(({ children, className, variant = 'default', muted, ...props }, ref) => {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic',
        variant && variants.variant[variant],
        muted && 'text-muted-foreground',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </blockquote>
  )
})
TypographyBlockquote.displayName = 'TypographyBlockquote'
