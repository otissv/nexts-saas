'use client'

import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useTranslateClientComponent } from '@/components/translate/translate-client'
import { cn } from '@/lib/utils'

export interface TextareaFieldProps
  extends React.HTMLAttributes<HTMLTextAreaElement> {
  name: string
  label: string
  required?: boolean
  classNames?: {
    label?: string
    input?: string
  }
  value?: string
  error: string | null
  invalid?: boolean
}

export const TextareaField = React.forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(
  (
    {
      name,
      id,
      label,
      classNames,
      required,
      error,
      invalid,
      value,
      onChange,
      onBlur,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const T = useTranslateClientComponent('ui.form')

    return (
      <React.Fragment>
        <Label className={classNames?.label} htmlFor={name}>
          {label || name}{' '}
          {required ? null : (
            <span className="inline-block ml-1 text-xs text-muted-foreground">
              <T>notRequired</T>
            </span>
          )}
        </Label>
        <Textarea
          className={cn(
            'mb-0.5',
            classNames?.input,
            invalid ? 'border-destructive' : ''
          )}
          required={required}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          ref={ref}
          {...props}
        />
        <p
          className={cn(
            'text-sm text-destructive mb-2 leading-tight',
            invalid ? 'visible h-auto' : 'invisible h-0'
          )}
        >
          {error}
        </p>
      </React.Fragment>
    )
  }
)
TextareaField.displayName = 'TextareaField'
