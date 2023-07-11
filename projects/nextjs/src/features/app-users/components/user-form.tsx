'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

import { User } from '@/features/app-users/users.types'
import { userUpdateValidator } from '@/features/app-users/users.validators'
import { updateUsersByIdAction } from '@/features/app-users/users.actions'
import { Form, Submit } from '@/components/form'
import {
  FormConfig,
  createFormSchema,
} from '@/components/forms/createFormSchema'
import { SaveButton } from '@/components/buttons'
import { cn, isDev } from '@/lib/utils'
import { useErrorNotify, useSuccessNotify } from '@/components/notify'
import { useTranslate } from '@/components/translate-client'
import { ErrorResponse, SuccessResponse } from '@/database/pg/types.pg'

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
  const t = useTranslate('ui.pages')
  const errorNotify = useErrorNotify()
  const successNotify = useSuccessNotify()
  const pathname = usePathname()

  const [user] = data
  const id = user?.id

  const action = updateUsersByIdAction

  const config: FormConfig = {
    username: {
      label: t('authentication.form.fields.username.label'),
      value: user?.username,
      error: t('authentication.form.fields.username.error'),
    },
    imageUrl: {
      label: t('user.form.fields.imageUrl.label'),
      error: t('user.form.fields.imageUrl.error'),
      value: user?.imageUrl,
    },
    firstName: {
      label: t('user.form.fields.firstName.label'),
      error: t('user.form.fields.firstName.error'),
      value: user?.firstName,
    },
    lastName: {
      label: t('user.form.fields.lastName.label'),
      error: t('user.form.fields.lastName.error'),
      value: user?.lastName,
    },
    email: {
      type: 'email',
      label: t('user.form.fields.email.label'),
      error: t('user.form.fields.email.error'),
      value: user?.email,
    },
    phone: {
      type: 'tel',
      label: t('user.form.fields.phone.label'),
      error: t('user.form.fields.phone.error'),
      value: user?.phone,
    },
  }

  const schema = createFormSchema(userUpdateValidator, config)

  const onSubmit = async ({ error, values }: Submit) => {
    try {
      if (error) throw error

      const args = id ? { data: values, id } : ({ data: values } as any)

      const x = await action(args, pathname).then(
        ({ error }: SuccessResponse<Partial<User>> | ErrorResponse) => {
          if (error) throw error
          successNotify({
            title: t('user.notifications.save.success.title'),
            description: t('user.notifications.save.success.description'),
          })
        }
      )
      // redirect()
      console.log(x)
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
