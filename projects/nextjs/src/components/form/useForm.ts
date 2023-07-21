'use client'
import { z } from 'zod'

import { FormSchema } from '@/components/form/types.form'
// import { MutableRefObject, useRef } from 'react'

export type FormConfig = Record<string, Partial<FormSchema>>

/** 
 * Creates a form schema
 * @example
 * ```
 * useForm(userValidator, {
 *  email: {
 *    type: 'email',
 *    attributes: {
 *      placeholder: 'Enter email',
 *    },
 *  },
* });
```
*/
export const useForm = <ZodObject extends z.ZodTypeAny>(
  zodObject: ZodObject,
  config: FormConfig = {}
) => {
  const schema: FormSchema[] = []

  type Check = { kind: string; value?: number; message?: string }

  type Def = {
    checks?: Check[]
    typeName: string
    coerce: boolean
    description?: string
  }

  for (const [name, validator] of Object.entries<z.ZodTypeAny>(
    zodObject._def.shape()
  )) {
    // @ts-ignore
    const prop = config[name] || {}
    const def: Def = validator._def?.innerType?._def || validator._def

    const type: FormSchema['type'] = prop.type as any
    const attributes = prop.attributes || {}
    const classNames = prop.classNames
    const description = prop.description || def.description
    const error = prop.error
    const ref = prop.ref
    const invalid = prop.invalid || false
    const label = prop.label
    const required = prop.required ?? def.typeName !== 'ZodOptional'

    const value = prop.value
      ? type === 'checkbox' || type === 'radio'
        ? { checked: prop.value || false }
        : { value: prop.value || '' }
      : { value: prop.value || '' }

    schema.push({
      name,
      // @ts-ignore
      type: prop.type,
      invalid,
      ...value,
      ...(classNames ? { classNames } : undefined),
      ...(description ? { description } : undefined),
      ...(ref ? { ref } : undefined),
      ...(required ? { required } : undefined),
      ...attributes,
      error: error || '',
      label: label || name.split('_').join(' '),
    })
  }

  return schema
}
