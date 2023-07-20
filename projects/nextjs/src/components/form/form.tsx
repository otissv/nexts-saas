'use client'

import * as React from 'react'
import { z } from 'zod'

import { FormSchema } from '@/components/form/types.form'
import { TextField } from '@/components/form/text.field'
import { Fieldset } from '@/components/form/fieldset'
import { updateItemById } from '@/lib/updateArrayById'

export interface Submit {
  error?: unknown
  values?: Record<string, string | number | boolean>
}

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  id: string
  legend?: string
  validator: z.ZodObject<any>
  schema: FormSchema[]
  submit: (result: Submit) => void
  children?: React.ReactNode
  className?: string
  persist?: boolean
}

export const Form = ({
  className,
  legend,
  validator,
  schema,
  submit,
  children,
  ...props
}: FormProps) => {
  const formRef = React.useRef<HTMLFormElement | null>(null)
  const reducer = (state: any, { name, data }: any) => {
    return updateItemById({
      list: state,
      data,
      fn: (field) => field.name === name,
    })
  }

  const [state, dispatch] = React.useReducer(reducer, schema)

  //TODO: useDebouncedCallback
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ name: e.target.name, data: { value: e.target.value.trim() } })

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    try {
      const name = e.target.name
      const value = e.target.value.trim()

      if (e.target.required || value !== '') {
        validator.pick({ [name]: true }).parse({ [name]: value })
      }
      dispatch({ name: e.target.name, data: { invalid: false } })
    } catch (err) {
      console.error(err)
      dispatch({ name: e.target.name, data: { invalid: true } })
    }
  }

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const values: Record<string, string | number | boolean> = {}
    let error: unknown

    Array.from(e.target as HTMLFormElement).forEach((element: any) => {
      const name = element.name
      if (name) {
        try {
          const value =
            element.type === 'checkbox' || element.type === 'radio'
              ? element.checked
              : element.value.trim()

          if (element.required || value !== '') {
            values[name] = value
            validator.pick({ [name]: true }).parse(values)
          }
          dispatch({ name, data: { invalid: false } })
        } catch (err) {
          dispatch({ name, data: { invalid: true } })
          error = error
        }
      }
    })

    submit({ values, error })
  }

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.target = formRef.current as HTMLFormElement
      handleOnSubmit(e)
    }
  }

  const formFields = state.map((field) => {
    return (
      <TextField
        key={field.name}
        {...field}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
      />
    )
  })

  // TODO: save state cookie with session and form id before leaving if not saved if persist is true

  return (
    <form
      onSubmit={handleOnSubmit}
      className={className}
      ref={formRef}
      {...props}
    >
      {legend ? <Fieldset legend={legend}>{formFields}</Fieldset> : formFields}

      {children}

      {/* TODO:// Social */}
    </form>
  )
}

Form.displayName = 'Form'
