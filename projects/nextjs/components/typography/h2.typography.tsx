'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { TypographyHeadingProps } from '@/components/typography/types.typography'
import { variants } from '@/components/typography/variants.typography'

export const TypographyH2 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ children, className, variant = 'default', muted, ...props }, ref) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        variant && variants.variant[variant],
        muted && 'text-muted-foreground',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </h2>
  )
})
TypographyH2.displayName = 'TypographyH2'
