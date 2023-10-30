'use client'

import React from 'react'

export const WindowLoaded = ({ children }: { children: React.ReactNode }) => {
  const [windowIsLoaded, setWindowIsLoaded] = React.useState(false)

  React.useEffect(() => {
    setWindowIsLoaded(true)
  }, [])

  return windowIsLoaded ? children : null
}
