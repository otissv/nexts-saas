import * as React from 'react'

export const Maybe = ({
  check,
  children,
}: {
  check?: unknown
  children?: React.ReactNode
}) => {
  return check ?? children ? <>{children}</> : null
}
Maybe.displayName = 'Maybe'
