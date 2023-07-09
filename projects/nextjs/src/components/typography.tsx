import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TypographyHeadingProps
  extends React.InputHTMLAttributes<HTMLHeadingElement> {}
const TypographyH1 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
TypographyH1.displayName = 'TypographyH1'
export { TypographyH1 }

const TypographyH2 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
TypographyH2.displayName = 'TypographyH2'
export { TypographyH2 }

const TypographyH3 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
TypographyH3.displayName = 'TypographyH3'
export { TypographyH3 }

const TypographyH4 = React.forwardRef<
  HTMLHeadingElement,
  TypographyHeadingProps
>(({ className, ...props }, ref) => {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
TypographyH4.displayName = 'TypographyH4'
export { TypographyH4 }

export interface TypographyParagraphProps
  extends React.InputHTMLAttributes<HTMLParagraphElement> {}
const TypographyParagraph = React.forwardRef<
  HTMLParagraphElement,
  TypographyParagraphProps
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
TypographyParagraph.displayName = 'TypographyParagraph'
export { TypographyParagraph }

const TypographyLead = React.forwardRef<
  HTMLParagraphElement,
  TypographyParagraphProps
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn('text-xl text-muted-foreground', className)}
      ref={ref}
      {...props}
    />
  )
})
TypographyLead.displayName = 'TypographyLead'
export { TypographyLead }

const TypographyMuted = React.forwardRef<
  HTMLParagraphElement,
  TypographyParagraphProps
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      ref={ref}
      {...props}
    />
  )
})
TypographyMuted.displayName = 'TypographyMuted'
export { TypographyMuted }

export interface TypographyBlockquoteProps
  extends React.InputHTMLAttributes<HTMLQuoteElement> {}
const TypographyBlockquote = React.forwardRef<
  HTMLQuoteElement,
  TypographyBlockquoteProps
>(({ className, ...props }, ref) => {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      ref={ref}
      {...props}
    />
  )
})
TypographyBlockquote.displayName = 'TypographyBlockquote'
export { TypographyBlockquote }

export interface TypographyOListProps
  extends React.InputHTMLAttributes<HTMLOListElement> {}
const TypographyOList = React.forwardRef<
  HTMLOListElement,
  TypographyOListProps
>(({ className, type, ...props }, ref) => {
  return (
    <ol
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      ref={ref}
      {...props}
    />
  )
})
TypographyOList.displayName = 'TypographyOList'
export { TypographyOList }
export interface TypographyUListProps
  extends React.InputHTMLAttributes<HTMLUListElement> {}
const TypographyUList = React.forwardRef<
  HTMLUListElement,
  TypographyUListProps
>(({ className, ...props }, ref) => {
  return (
    <ul
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
      ref={ref}
      {...props}
    />
  )
})
TypographyUList.displayName = 'TypographyUList'
export { TypographyUList }
export interface TypographyCodeProps
  extends React.InputHTMLAttributes<HTMLElement> {}
const TypographyCode = React.forwardRef<HTMLElement, TypographyCodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <code
        className={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TypographyCode.displayName = 'TypographyCode'
export { TypographyCode }

export interface TypographyLargeProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}
const TypographyLarge = React.forwardRef<HTMLDivElement, TypographyLargeProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('text-lg font-semibold', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
TypographyLarge.displayName = 'TypographyLarge'
export { TypographyLarge }

export interface TypographySmallProps
  extends React.InputHTMLAttributes<HTMLDivElement> {}

const TypographySmall = React.forwardRef<HTMLDivElement, TypographySmallProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('text-lg font-semibold', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
TypographySmall.displayName = 'TypographySmall'
export { TypographySmall }
