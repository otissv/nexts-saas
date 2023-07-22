import * as React from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'

export interface AppDialogProps extends React.HTMLProps<HTMLDivElement> {
  title: string
  trigger: React.ReactNode
  description: React.ReactNode
  cancel: React.ReactNode
  ok: React.ReactNode
  onAction: () => void
}

export const AppDialog = React.forwardRef<HTMLDivElement, AppDialogProps>(
  (
    {
      className,
      children,
      title,
      trigger,
      description,
      cancel,
      ok,
      onAction,
      ...props
    },
    ref
  ) => {
    return (
      <AlertDialog ref={ref} {...props}>
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={() => onAction()}>
              {ok}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
)
AppDialog.displayName = 'AppDialog'
