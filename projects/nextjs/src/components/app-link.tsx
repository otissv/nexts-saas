import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export interface AppLinkProps extends React.HTMLAttributes<HTMLElement> {
  href: string
}

export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, className, ...props }, ref) => {
    return (
      <Link
        href={href}
        className={cn(
          'inline-flex text-accent-foreground hover:underline focus:underline dark:hover-underline',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
