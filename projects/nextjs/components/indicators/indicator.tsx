import React from 'react'

import { TailwindIndicator } from '@/components/indicators/tailwind-indicator'
import { LoggedIndicator } from '@/components/indicators/loggedIn-indicator'
import { cn } from '@/lib/utils'
import { isDev } from 'c-ufunc/libs/isDev'

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
