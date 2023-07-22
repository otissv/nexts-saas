import * as React from 'react'

import { cn } from './lib/utils'
import { Maybe } from './maybe'

export interface AddressProps extends React.HTMLAttributes<HTMLElement> {
  streetAddress: React.ReactNode
  addressDetails?: React.ReactNode
  city: React.ReactNode
  state: React.ReactNode
  country: React.ReactNode
  postalCode: React.ReactNode
  site: React.ReactNode
}

export const Address = React.forwardRef<HTMLElement, AddressProps>(
  (
    {
      className,
      children,
      streetAddress,
      addressDetails,
      city,
      state,
      country,
      postalCode,
      site,
      ...props
    },
    ref
  ) => {
    return (
      <address className={cn(className)} ref={ref} {...props}>
        <ul>
          <Maybe>
            <strong>{site}</strong>
          </Maybe>

          {!site ? (
            <li>
              <strong>{streetAddress}</strong>
            </li>
          ) : (
            <li>{streetAddress}</li>
          )}
          <Maybe>
            <li>{addressDetails}</li>
          </Maybe>
          <li>{city}</li>
          <Maybe check="addressDetails">
            <li>{state}</li>
          </Maybe>

          <li>{postalCode}</li>
          <li>{country}</li>
        </ul>
        {children}
      </address>
    )
  }
)
Address.displayName = 'Address'
