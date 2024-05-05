import React from 'react'
import { z } from 'zod'
import { ToggleLeft } from 'lucide-react'

import {
  ToggleSwitch,
  ToggleSwitchOnOffTypes,
} from '@/components/toggle-switch'
import { GetFieldComponent } from '@/features/cms/components/cms-config'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CmsConfigField, CmsField } from '@/features/cms/cms.types'

import { RequiredValidation } from '@/features/cms/components/cms-validation'

type Option = {
  value: {
    defaultValue?: boolean
    falseValue?: string
    trueValue?: string
  }
}

export type FieldOptionsProps = {
  fieldId: string
  onUpdate: (newValue: unknown, errorMessage?: 'string') => void
} & Option

export type FieldProps = CmsField<HTMLInputElement> & {
  id: string
  onOff?: ToggleSwitchOnOffTypes
  value: boolean
}

export const fieldConfig: CmsConfigField<CmsFieldValidation> = {
  type: 'boolean',
  title: 'Boolean',
  Icon: ({ className, ...props }: Record<string, any>) => (
    <ToggleLeft
      className={cn('h-3 text-muted-foreground', className)}
      {...props}
    />
  ),
  description: 'Yes or no, true or false',
  validationDefaults: {
    required: false,
  },
  validate: (_) => '',
}

function Field({
  value,
  className,
  isSelected,
  onOff,
  isInline,
  onUpdate,
  id,
}: FieldProps) {
  return isInline ? (
    <div
      className={cn(
        'h-10  flex items-center justify-center border',
        isInline && 'border-t-0',
        className
      )}
    >
      <ToggleSwitch
        className="w-full rounded-none"
        checked={value}
        id={id}
        onOff={onOff}
        onCheckedChange={onUpdate}
      />
    </div>
  ) : (
    <ToggleSwitch
      checked={value}
      id={id}
      onOff={onOff}
      onCheckedChange={onUpdate}
    />
  )
}

function FieldOptions({
  value = {},
  onUpdate,
  trueValue,
  falseValue,
  fieldId,
}: FieldOptionsProps) {
  const defaultValue = value.defaultValue || ''

  const handleOnUpdate = (key: string) => (value: unknown) => {
    onUpdate &&
      onUpdate({
        [key]: value,
      })
  }

  return (
    <>
      <div className="mb-6">
        <Label htmlFor="defaultValue" className="flex mb-2">
          Default Value
        </Label>

        <Field
          fieldId={fieldId}
          id="defaultValue"
          type="boolean"
          value={defaultValue || false}
          onUpdate={handleOnUpdate('defaultValue')}
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="trueValue" className="flex mb-2">
            True Value
          </Label>

          <Input
            id="trueValue"
            type="text"
            value={trueValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnUpdate('trueValue')(e.target.value)
            }
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="falseValue" className="flex mb-2">
            False Value
          </Label>

          <Input
            id="falseValue"
            type="text"
            value={falseValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleOnUpdate('falseValue')(e.target.value)
            }
          />
        </div>
      </div>
    </>
  )
}

const FieldValidation = RequiredValidation

const validationValidator = z
  .object({
    required: z.boolean().optional(),
  })
  .optional()
export type CmsFieldValidation = z.infer<typeof validationValidator>

export default {
  Field,
  FieldOptions,
  FieldValidation,
  fieldConfig,
  validationValidator,
}
