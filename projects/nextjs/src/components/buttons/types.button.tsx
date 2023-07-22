import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from '@/components/ui/button'

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export interface DeleteButtonProps extends ButtonProps {
  cancel: string
  description: string
  error: {
    description: string
    title: string
  }
  ok: string
  success: {
    description: string
    title: string
  }
  title: string
  onAction: () => Promise<boolean>
}

export interface LinkButtonProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string
}
