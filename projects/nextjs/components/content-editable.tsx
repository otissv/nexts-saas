import * as React from 'react'

export interface ContentEditableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isEdit?: boolean
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
      isEdit,
      label,
      multiline,
      required,
      role,
      expandable,
      ...props
    },
    ref
  ) => {
    return isEdit ? (
      <>
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
              onChange: console.log,

              role,
              className:
                element.props.className +
                ' outline-none focus:border-2 focus:border-blue-400',
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
        'aria-label': label,
        'aria-required': `${required}`,
        ...(multiline ? { 'aria-multiline': 'true' } : {}),
        ...props,
        suppressContentEditableWarning: true,
      }
    : {}
}
