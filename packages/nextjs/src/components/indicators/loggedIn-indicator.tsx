import * as React from 'react'

import { cn } from '../lib/utils'

export interface LoggedIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isLoggedIn: boolean
}

export const LoggedIndicator = ({
  className,
  isLoggedIn,
  ...props
}: LoggedIndicatorProps) => {
  return (
    <div
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white',
        className
      )}
      {...props}
    >
      {isLoggedIn ? 'in' : 'out'}
    </div>
  )
}
LoggedIndicator.displayName = 'LoggedIndicator'
