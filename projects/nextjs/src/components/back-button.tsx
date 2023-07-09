'use client'

import * as React from 'react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { VariantProps } from 'class-variance-authority'

import { Button, buttonVariants } from '@/components/ui/button'

export interface BackButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, children, ...props }, ref) => {
    const router = useRouter()

    return (
      <Button
        variant="ghost"
        className={className}
        onClick={() => router.back()}
        ref={ref}
        {...props}
      >
        <>
          <ChevronLeft className="inline-block mr-2 h-4 w-4" />
          {children || 'Back'}
        </>
      </Button>
    )
  }
)

BackButton.displayName = 'BackButton'
