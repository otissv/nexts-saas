'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { TypographyHeadingProps } from '@/components/typography/types.typography'
import { variants } from '@/components/typography/variants.typography'

export const TypographyH1 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ children, className, variant = 'default', muted, ...props }, ref) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl',
        variant && variants.variant[variant],
        muted && 'text-muted-foreground',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </h1>
  )
})
TypographyH1.displayName = 'TypographyH1'
