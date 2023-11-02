'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { TypographyParagraphProps } from '@/components/typography/types.typography'
import { variants } from '@/components/typography/variants.typography'

export const TypographyParagraph = React.forwardRef<
  HTMLParagraphElement,
  TypographyParagraphProps
>(({ children, className, variant = 'default', muted, ...props }, ref) => {
  return (
    <p
      className={cn(
        'leading-7 [&:not(:first-child)]:mt-6',
        variant && variants.variant[variant],
        muted && 'text-muted-foreground',
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
