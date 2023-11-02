import * as React from 'react'

import { cn } from '@/lib/utils'
import { variants } from '@/components/typography/variants.typography'
import { TypographyBaseProps } from './types.typography'

const css: Record<string, any> = {
  blockquote: 'mt-6 border-l-2 pl-6 italic',
  code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl',
  h2: 'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
  ol: 'my-6 ml-6 list-disc [&>li]:mt-2',
  ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
  p: 'leading-7 [&:not(:first-child)]:mt-6',
}

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    TypographyBaseProps {
  as?: 'blockquote' | 'code' | 'h1' | 'h2' | 'h3' | 'h4' | 'ol' | 'ul' | 'p'
  muted?: boolean
  variant?: 'default' | 'uppercase' | 'lowercase' | 'capitalize'
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { as = 'p', className, children, variant = 'default', muted, ...props },
    ref
  ) => {
    const element = React.createElement(
      as,
      {
        ref,
        className: cn(
          css[as],
          variant && (variants.variant as any)[variant],
          muted && 'text-muted-foreground',
          className
        ),
        ...props,
      },
      children
    )

    return <>{element}</>
  }
)
Typography.displayName = 'Typography'
