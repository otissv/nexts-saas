'use client'

import React from 'react'
import { Flag } from 'lucide-react'
import { z } from 'zod'

import { cn } from '@/lib/utils'
import { CmsConfigField } from '@/features/cms/cms.types'
import TextFelid, {
  FieldOptionsProps as TextFieldOptionsProps,
  FieldProps as TextFieldProps,
} from './text'

const FieldValidation = TextFelid.FieldValidation

export type FieldOptionsProps = TextFieldOptionsProps
export type FieldProps = TextFieldProps

const fieldConfig: CmsConfigField<CmsFieldValidation> = {
  ...TextFelid.fieldConfig,
  title: 'Title',
  Icon: ({ className, ...props }: Record<string, any>) => (
    <Flag
      className={cn('h-3 text-muted-foreground', className)}
      {...props}
      type="title"
    />
  ),
  type: 'title',
  description: 'Primary key',
}

const Field = TextFelid.Field

export function FieldOptions(props: FieldOptionsProps) {
  return TextFelid.FieldOptions({ ...props, type: 'title' })
}

const validationValidator = TextFelid.validationValidator
export type CmsFieldValidation = z.infer<typeof validationValidator>

export default {
  Field,
  FieldOptions,
  FieldValidation,
  fieldConfig,
  validationValidator,
}
