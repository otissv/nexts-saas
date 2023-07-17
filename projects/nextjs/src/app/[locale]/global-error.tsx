'use client'

import { XCircle } from 'lucide-react'

import { TypographyH1 } from '@/components/typography/h1.typography'
import { Button } from '@/components/ui/button'

export default function RootError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <TypographyH1 className="mb-6 text-red-500">
        <XCircle className="inline-block mr-2 " size={40} color="#ef4444" />{' '}
        There was a problem
      </TypographyH1>
      <p className="mb-5">{error.message}</p>

      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
