'use client'

import * as React from 'react'
import Link from 'next/link'
import { Pencil } from 'lucide-react'

import { useTranslateClient } from '../translate/translate-client'
import { buttonVariants } from '../ui/button'
import { cn } from '../lib/utils'
import { LinkButtonProps } from './types.button'

export const EditButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, children, href, variant, ...props }, ref) => {
    const t = useTranslateClient('ui.page.toolbar')

    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant }), className)}
        title={t('edit.content')}
        ref={ref}
        {...props}
      >
        <Pencil className={cn('inline-block', children ? 'mr-2' : '')} />
        {children}
      </Link>
    )
  }
)
EditButton.displayName = 'EditButton'
