'use client'

import React from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { CmsField, GetFieldComponent } from '../cms-config'
import { CmsCollectionColumn, EmailOption } from '../../cms.types'
import { Label } from '@/components/ui/label'

export type EmailFieldProps = CmsField<HTMLInputElement> & {
  value: string
  onUpdate: (newValue: string) => void
}
export function EmailField({
  value,
  onBlur,
  className,
  fieldId,
  errorMessage,
  isSelected,
  isInline,
  type,
  onUpdate,
  validate,
  ...props
}: EmailFieldProps) {
  const [state, setState] = React.useState(value || '')

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (state !== value && onUpdate) {
      onUpdate(state)
    }
  }

  return (
    <Input
      {...props}
      type={type}
      id={fieldId}
      aria-describedby="helper-text-explanation"
      className={cn(
        'min-w-48 rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text',
        isInline && 'rounded-none border-t-0',
        isSelected && 'bg-gray-800',
        className
      )}
      value={state}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setState(e.target.value)
      }
      onBlur={handleOnBlur}
    />
  )
}

export type EmailOptionsProps = {
  type: CmsCollectionColumn['type']
  onUpdate: (props: Omit<EmailOption, 'type'>) => void
} & EmailOption

export function EmailOptions({ defaultValue, onUpdate }: EmailOptionsProps) {
  const handleOnUpdate = (defaultValue: EmailOption['defaultValue']) => {
    onUpdate && onUpdate({ defaultValue })
  }

  return (
    <div className="mb-6">
      <Label htmlFor="defaultValue" className="flex mb-2">
        Input Value
      </Label>

      <GetFieldComponent
        id="defaultValue"
        type="email"
        value={defaultValue}
        onUpdate={handleOnUpdate}
      />
    </div>
  )
}
