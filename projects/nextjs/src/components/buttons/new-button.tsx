'use client'

import * as React from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { useTranslateClient } from '@/components/translate/translate-client'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LinkButtonProps } from '@/components/buttons/types.button'

export const NewButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, children, href, variant, ...props }, ref) => {
    const t = useTranslateClient('ui.page.toolbar')

    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: variant || 'default' }),
          className
        )}
        title={t('new.content')}
        ref={ref}
        {...props}
      >
        <Plus className="inline-block mr-2" /> {t('new.content') || children}
      </Link>
    )
  }
)
NewButton.displayName = 'NewButton'
