import * as React from 'react'

import { cn } from '@/lib/utils'

export interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: React.ReactNode
}

export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ className, children, legend, ...props }, ref) => {
    return (
      <fieldset
        className={cn('mb-5 font-semibold', className)}
        ref={ref}
        {...props}
      >
        <legend className="mb-4 -block w-full pb-1">{legend}</legend>
        {children}
      </fieldset>
    )
  }
)
