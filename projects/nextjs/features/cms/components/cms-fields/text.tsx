'use client'

import React from 'react'
import { TriangleAlert, Type } from 'lucide-react'
import { z } from 'zod'
import { isValidString } from 'c-ufunc/libs/isValidString'

import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { GetFieldComponent } from '@/features/cms/components/cms-config'
import { CmsConfigField, CmsField } from '@/features/cms/cms.types'
import { Label } from '@/components/ui/label'
import { TextValidation } from '@/features/cms/components/cms-validation'
import { isBoolean } from 'c-ufunc/libs/isBoolean'
import { stringIncludesAnyCharacters } from '@/lib/stringIncludesAnyCharacters'

export function isFieldRequired(value: unknown, required: unknown) {
  return !isBoolean(value) && required
}

export function hasDisallowCharacters(value: unknown, disallow: unknown) {
  if (
    !isValidString(value) &&
    stringIncludesAnyCharacters(value as string)(disallow as string)
  ) {
    return true
  }

  return false
}

export function isFieldMinLength(value: string, length: number) {
  return !isValidString(value) && (length as number) >= (value as string).length
}

export function isFieldMaxLength(value: unknown, length: unknown) {
  return !isValidString(value) && (length as number) <= (value as string).length
}

type Option = {
  value: { defaultValue?: string }
}

export type FieldOptionsProps = {
  type?: 'text' | 'title'
  fieldId: string
  onUpdate: (newValue: unknown, errorMessage?: 'string') => void
} & Option

export type FieldProps = CmsField<HTMLInputElement> & {
  id: string
  value: string
}

const FieldValidation = TextValidation

const fieldConfig: CmsConfigField<CmsFieldValidation> = {
  title: 'Text',
  Icon: ({ className, ...props }: Record<string, any>) => (
    <Type className={cn('h-3 text-muted-foreground', className)} {...props} />
  ),
  type: 'text',
  description: 'Title, sentence',
  validationDefaults: {
    required: false,
    minLength: 0,
    maxLength: 0,
    disallowCharacters: '',
  },
  validate: (value, validation) => {
    const { required, minLength, maxLength, disallowCharacters } =
      validation || {}

    switch (true) {
      case isFieldRequired(value, required):
        return `This field is required`

      case hasDisallowCharacters(value, disallowCharacters):
        return `Must not include ${disallowCharacters} characters`

      case isFieldMaxLength(value, maxLength) &&
        isFieldMinLength(value, minLength):
        return `Must have `

      default:
        return ''
    }
  },
}

function Field({
  value,
  onBlur,
  className,
  fieldId,
  isSelected,
  isInline,
  type,
  onUpdate,
  errorMessage,
  validate,
  validation,
  ...props
}: FieldProps) {
  const [state, setState] = React.useState(value || '')

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (state !== value && onUpdate) {
      onUpdate(state, 'hasError')
    }
  }

  return (
    <div
      className={cn(
        'flex items-center rounded-md bg-background border focus:ring-blue-500 focus:border-blue-500 cursor-text',
        isInline && 'rounded-none border-t-0',
        isSelected && 'bg-gray-800',
        className
      )}
    >
      <Input
        {...props}
        type="text"
        id={fieldId}
        className="min-w-48  p-2 border-0"
        aria-describedby="helper-text-explanation"
        value={state}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setState(e.target.value)
        }
        onBlur={handleOnBlur}
      />
      {errorMessage ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TriangleAlert className="mr-2 size-5 text-destructive" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{errorMessage}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : null}
    </div>
  )
}

function FieldOptions({
  value = {},
  onUpdate,
  type = 'text',
  fieldId,
}: FieldOptionsProps) {
  const defaultValue = value.defaultValue || ''

  const handleOnUpdate = (defaultValue: unknown) => {
    onUpdate && onUpdate({ defaultValue })
  }

  return (
    <div className="mb-6">
      <Label htmlFor="defaultValue" className="flex mb-2">
        Default Value
      </Label>

      <Field
        id="defaultValue"
        fieldId={fieldId}
        type={type}
        value={defaultValue}
        onUpdate={handleOnUpdate}
      />
    </div>
  )
}

const validationValidator = z
  .object({
    required: z.boolean().optional(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    disallowCharacters: z.string().optional(),
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
