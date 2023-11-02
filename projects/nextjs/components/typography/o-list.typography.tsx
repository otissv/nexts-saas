'use client'

import * as React from 'react'
import Balancer from 'react-wrap-balancer'

import { cn } from '@/lib/utils'
import { TypographyOListProps } from '@/components/typography/types.typography'
import { variants } from '@/components/typography/variants.typography'

export const TypographyOList = React.forwardRef<
  HTMLOListElement,
  TypographyOListProps
>(
  (
    {
      children,
      className,
      type,
      size = 'default',
      variant = 'default',
      muted,
      ...props
    },
    ref
  ) => {
    return (
      <ol
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
      </ol>
    )
  }
)
TypographyOList.displayName = 'TypographyOList'
