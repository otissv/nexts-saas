'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type VariantProps } from 'class-variance-authority'
import { ArrowLeft, Pencil, Plus, Save, Send, Trash2 } from 'lucide-react'
import { isDev } from 'c-ufunc/libs/isDev'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslate } from '@/components/translate-client'
import { AppDialog } from '@/components/app-dialog'
import { useErrorNotify, useSuccessNotify } from '@/components/notify'

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

interface LinkButtonProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  href: string
}

export const BackButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const router = useRouter()
    const t = useTranslate('ui.page.toolbar')

    return (
      <Button
        variant="ghost"
        className={className}
        onClick={() => router.back()}
        title={t('back.a.content')}
        ref={ref}
        {...props}
      >
        {children || (
          <>
            <ArrowLeft className="inline-block mr-2 h-4 w-4" />
            {t('back.a.content')}
          </>
        )}
      </Button>
    )
  }
)

interface DeleteButtonProps extends ButtonProps {
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
    const t = useTranslate('ui.page.toolbar')
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

export const EditButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, children, href, variant, ...props }, ref) => {
    const t = useTranslate('ui.page.toolbar')

    return (
      <Link
        href={href}
        className={cn(buttonVariants({ variant }), className)}
        title={t('edit.a.content')}
        ref={ref}
        {...props}
      >
        <Pencil className={cn('inline-block', children ? 'mr-2' : '')} />
        {children}
      </Link>
    )
  }
)

export const NewButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, children, href, variant, ...props }, ref) => {
    const t = useTranslate('ui.page.toolbar')

    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: variant || 'default' }),
          className
        )}
        title={t('new.a.content')}
        ref={ref}
        {...props}
      >
        <Plus className="inline-block mr-2" /> {t('new.a.content') || children}
      </Link>
    )
  }
)

export const SaveButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const t = useTranslate('ui.page.toolbar')

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

export const SendIconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    const t = useTranslate('ui.page.toolbar')

    return (
      <Button
        className={cn('min-w-20 inline-block w-10 h-10', className)}
        type="submit"
        title={t('save.button.content')}
        ref={ref}
        {...props}
      >
        <Send className="inline-block" />
      </Button>
    )
  }
)
