'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { TypographyUListProps } from '@/components/typography/types.typography'
import { variants } from '@/components/typography/variants.typography'

export const TypographyUList = React.forwardRef<
  HTMLUListElement,
  TypographyUListProps
>(({ children, className, variant = 'default', muted, ...props }, ref) => {
  return (
    <ul
      className={cn(
        'my-6 ml-6 list-disc [&>li]:mt-2',
        variant && variants.variant[variant],
        muted && 'text-muted-foreground',
        className
      )}
      ref={ref}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </ul>
  )
})
TypographyUList.displayName = 'TypographyUList'
