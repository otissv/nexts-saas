import * as React from 'react'

import { cn } from './lib/utils'

export interface FieldsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Divider = React.forwardRef<HTMLDivElement, FieldsetProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('-mx-1 my-6 h-px bg-muted', className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Divider.displayName = 'Divider'
