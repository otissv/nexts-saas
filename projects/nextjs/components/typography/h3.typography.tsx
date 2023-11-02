'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { TypographyHeadingProps } from '@/components/typography/types.typography'
import { variants } from '@/components/typography/variants.typography'

export const TypographyH3 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ children, className, variant = 'default', muted, ...props }, ref) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        variant && variants.variant[variant],
        muted && 'text-muted-foreground',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </h3>
  )
})
TypographyH3.displayName = 'TypographyH3'
