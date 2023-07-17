'use client'

import * as React from 'react'
import { isDev } from 'c-ufunc/libs/isDev'
import { Trash2 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AppDialog } from '@/components/app-dialog'
import { useErrorNotify, useSuccessNotify } from '@/components/notify'
import { useTranslateClient } from '@/components//translate/translate-client'
import { DeleteButtonProps } from '@/components/buttons/types.button'
import { Button } from '@/components/ui/button'

export const DeleteButton = React.forwardRef<
  HTMLButtonElement,
  DeleteButtonProps
>(
  (
    {
      className,
      children,
      cancel,
      description,
      error,
      ok,
      success,
      title,
      variant,
      onAction,
      ...props
    },
    ref
  ) => {
    const t = useTranslateClient('ui.page.toolbar')
    const errorNotify = useErrorNotify()
    const successNotify = useSuccessNotify()

    const handleAction = async () => {
      try {
        const result = await onAction()

        if (!result) {
          if (isDev()) console.log(error)
          errorNotify(error)
          return
        }

        successNotify(success)
      } catch (err) {
        if (err && isDev()) console.error(err)
        errorNotify(error)
      }
    }

    return (
      <AppDialog
        cancel={cancel}
        description={description}
        ok={ok}
        title={title}
        onAction={handleAction}
        trigger={
          <Button
            className={className}
            title={t('delete.a.content')}
            ref={ref}
            variant={variant || 'destructive'}
            {...props}
          >
            <Trash2 className={cn('inline-block', children ? 'mr-2' : '')} />
            {children}
          </Button>
        }
      />
    )
  }
)
DeleteButton.displayName = 'DeleteButton'
