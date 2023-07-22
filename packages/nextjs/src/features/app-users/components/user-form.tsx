'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { isDev } from 'c-ufunc/libs/isDev'
import { Form, Submit } from '@/components/form/form'
import { FormConfig, useForm } from '@/components/form/useForm'
import { SaveButton } from '@/components/buttons/save-button'
import { cn } from '@/components/lib/utils'
import { useErrorNotify, useSuccessNotify } from '@/components/notify'
import { useTranslateClient } from '@/components/translate/translate-client'
import { ErrorResponse, SuccessResponse } from 'database/pg/types.pg'

import { User } from '@/features/app-users/users.types'
import { userUpdateValidator } from '@/features/app-users/users.validators'
import { updateUsersByIdAction } from '@/features/app-users/users.actions'

export interface UserFormProps {
  name: string
  data: Partial<User>[]
  children?: React.ReactNode
  className?: string
}

export const UserForm = ({
  name,
  data,
  children,
  className,
  ...props
}: UserFormProps) => {
  const t = useTranslateClient('ui.pages')
  const errorNotify = useErrorNotify()
  const successNotify = useSuccessNotify()
  const pathname = usePathname()

  const [user] = data
  const id = user?.id

  const action = updateUsersByIdAction

  const config: FormConfig = {
    username: {
      error: t('authentication.form.fields.username.error'),
      label: t('authentication.form.fields.username.label'),
      ref: React.useRef(null),
      value: user?.username,
    },
    imageUrl: {
      error: t('user.form.fields.imageUrl.error'),
      label: t('user.form.fields.imageUrl.label'),
      ref: React.useRef(null),
      value: user?.imageUrl,
    },
    firstName: {
      error: t('user.form.fields.firstName.error'),
      label: t('user.form.fields.firstName.label'),
      ref: React.useRef(null),
      value: user?.firstName,
    },
    lastName: {
      error: t('user.form.fields.lastName.error'),
      label: t('user.form.fields.lastName.label'),
      ref: React.useRef(null),
      value: user?.lastName,
    },
    email: {
      type: 'email',
      error: t('user.form.fields.email.error'),
      label: t('user.form.fields.email.label'),
      ref: React.useRef(null),
      value: user?.email,
    },
    phone: {
      type: 'tel',
      error: t('user.form.fields.phone.error'),
      label: t('user.form.fields.phone.label'),
      ref: React.useRef(null),
      value: user?.phone,
    },
  }

  const schema = useForm(userUpdateValidator, config)

  const onSubmit = async ({ error, values }: Submit) => {
    try {
      if (error) throw error

      const args = id ? { data: values, id } : ({ data: values } as any)

      await action(args, pathname).then(
        ({ error }: SuccessResponse<Partial<User>> | ErrorResponse) => {
          if (error) throw error
          successNotify({
            title: t('user.notifications.save.success.title'),
            description: t('user.notifications.save.success.description'),
          })
        }
      )
    } catch (error) {
      if (isDev()) {
        console.error(error)
      }

      errorNotify({
        title: t('user.notifications.save.error.title'),
        description: t('user.notifications.save.error.description'),
      })
    }
  }

  return (
    <Form
      id={name}
      className={cn(className)}
      legend={t('user.form.legend')}
      schema={schema}
      submit={onSubmit}
      validator={userUpdateValidator}
      {...props}
    >
      {children || <SaveButton />}
    </Form>
  )
}
