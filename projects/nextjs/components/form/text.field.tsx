'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useTranslateClientComponent } from '@/components/translate/translate-client'

export interface TextFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  required?: boolean
  classNames?: {
    label?: string
    input?: string
  }
  type?: string
  value?: string
  error: string | null
  invalid?: boolean
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
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
      type,
      ...props
    },
    ref
  ) => {
    const T = useTranslateClientComponent('ui.form')

    return (
      <React.Fragment>
        <Label className={cn('mb-2', classNames?.label)} htmlFor={name}>
          {label}{' '}
          {required ? null : (
            <span className="inline-block ml-1 text-xs text-muted-foreground">
              <T>notRequired</T>
            </span>
          )}
        </Label>
        <Input
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
          type={type}
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
TextField.displayName = 'TextField'
