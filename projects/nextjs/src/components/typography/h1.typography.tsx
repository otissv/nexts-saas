'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { TypographyHeadingProps } from '@/components/typography/types.typography'

export const TypographyH1 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ children, className, ...props }, ref) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
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
