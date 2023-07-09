import * as React from 'react'

import { cn } from '@/lib/utils'

export interface ContentEditableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  isEdit: boolean
  label: string
  expandable?: boolean
  multiline?: boolean
  required?: boolean
  role?: string
  srOnly?: boolean
}

export const ContentEditable = React.forwardRef<
  HTMLDivElement,
  ContentEditableProps
>(
  (
    {
      children,
      className,
      id,
      isEdit,
      label,
      multiline,
      required,
      role,
      srOnly,
      expandable,
      ...props
    },
    ref
  ) => {
    return isEdit ? (
      <>
        <div
          id={id}
          className={cn(srOnly ? 'sr-only' : '', className)}
          ref={ref}
          {...props}
        >
          {label}
        </div>

        {React.Children.map(children, (child) => {
          const element = child as React.ReactElement<
            any,
            React.JSXElementConstructor<any>
          >
          return React.cloneElement(
            element,
            editableProps({
              isEdit,
              label,
              multiline,
              required,
              role,
            })
          )
        })}
      </>
    ) : (
      <>{children}</>
    )
  }
)
ContentEditable.displayName = 'ContentEditable'

function editableProps({
  isEdit,
  label,
  multiline,
  required = true,
  role = 'textbox',
  ...props
}: {
  isEdit: boolean
  label: string
  multiline?: boolean
  required?: boolean
  role?: string
  className?: string
  onInput?: (event: React.ChangeEvent<HTMLDivElement>) => void
}) {
  return isEdit
    ? {
        role,
        contentEditable: 'true',
        'aria-labelledby': label,
        'aria-required': `${required}`,
        ...(multiline ? { 'aria-multiline': 'true' } : {}),
        ...props,
        suppressContentEditableWarning: true,
      }
    : {}
}
