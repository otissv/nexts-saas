import { PrivateInput } from '@/components/private-input'
import React from 'react'
import { CmsField, GetFieldComponent } from '../cms-config'
import { cn } from '@/lib/utils'
import { PrivateOption } from '../../cms.types'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export type PrivateFieldProps = CmsField<HTMLInputElement> & {
  value: string
  onUpdate: (newValue: string) => void
  type?: 'text' | 'number'
}
export function PrivateField({
  value = '',
  onBlur,
  className,
  fieldId,
  errorMessage,
  isSelected,
  isInline,
  type = 'text',
  validate,
  onUpdate,
  ...props
}: PrivateFieldProps) {
  const [state, setState] = React.useState(value)

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (state !== value && onUpdate) {
      onUpdate(state)
    }
  }

  return (
    <div className="relative">
      <PrivateInput
        {...props}
        type={type}
        id={fieldId}
        className={cn(
          'min-w-48 rounded-mb bg-background border focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-text pr-10',
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
    </div>
  )
}

export type PrivateOptionsProps = {
  onUpdate: (props: Omit<PrivateOption, 'type'>) => void
} & PrivateOption
export function PrivateOptions({
  type = 'text',
  defaultValue,
  toggleVisibility,
  onUpdate,
}: PrivateOptionsProps) {
  const handleOnUpdate =
    (key: string) => (value: string | number | boolean) => {
      onUpdate &&
        onUpdate({
          toggleVisibility,
          defaultValue,
          [key]: value,
        })
    }

  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <GetFieldComponent
          id="defaultValue"
          type={type}
          value={defaultValue}
          onUpdate={handleOnUpdate('defaultValue')}
        />
      </div>
      <div className="mb-6">
        <Label htmlFor="toggleVisibility" className="flex mb-2">
          Allow toggle visibility
        </Label>

        <Switch
          id="toggleVisibility"
          checked={Boolean(toggleVisibility)}
          onCheckedChange={handleOnUpdate('toggleVisibility')}
        />
      </div>
    </>
  )
}
