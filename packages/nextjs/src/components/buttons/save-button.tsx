'use client'

import * as React from 'react'
import { Save } from 'lucide-react'

import { Button } from '../ui/button'
import { useTranslateClient } from '../translate/translate-client'
import { ButtonProps } from './types.button'
import { cn } from '../lib/utils'

export const SaveButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const t = useTranslateClient('ui.page.toolbar')

    return (
      <Button
        className={cn('min-w-20 inline-block', className)}
        type="submit"
        title={t('save.button.content')}
        ref={ref}
        {...props}
      >
        <Save className="inline-block mr-2" />{' '}
        {t('save.button.content') || children}
      </Button>
    )
  }
)
SaveButton.displayName = 'SaveButton'
