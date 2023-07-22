import * as React from 'react'
import { isDev } from 'c-ufunc/libs/isDev'

import { TailwindIndicator } from './tailwind-indicator'
import { LoggedIndicator } from './loggedIn-indicator'
import { cn } from '../lib/utils'

export interface IndicatorsProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoggedIn: boolean
}

export const Indicators = ({
  className,
  children,
  isLoggedIn,
  ...props
}: IndicatorsProps) => {
  return (
    <div
      className={cn(
        'grid col-auto gap-1 fixed bottom-1 left-1 z-50',
        className
      )}
      {...props}
    >
      {isDev() ? (
        <>
          <TailwindIndicator />
          <LoggedIndicator isLoggedIn={isLoggedIn} />
        </>
      ) : null}
      {children}
    </div>
  )
}
Indicators.displayName = 'Indicators'
