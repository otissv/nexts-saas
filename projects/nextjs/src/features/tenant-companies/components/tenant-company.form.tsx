'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'

import {
  tenantCompanyUpdateValidator,
  tenantCompanyInsertValidator,
} from '@/features/tenant-companies/companies.tenant.validators'
import {
  FormConfig,
  createFormSchema,
} from '@/components/forms/createFormSchema'
import { useTranslate } from '@/components/translate-client'
import { Form, Submit } from '@/components/form'
import {
  updateTenantCompanyByIdAction,
  insertTenantCompanyAction,
} from '@/features/tenant-companies/companies.actions'
import { cn, isDev } from '@/lib/utils'
import { useErrorNotify, useSuccessNotify } from '@/components/notify'
import { SaveButton } from '@/components/buttons'
import { TenantCompany } from '../companies.tenant.types'

export interface CompanyFormProps {
  name: string
  data: Partial<TenantCompany>[]
  children?: React.ReactNode
  className?: string
}

export const CompanyForm = ({
  name,
  data,
  children,
  className,
  ...props
}: CompanyFormProps) => {
  const t = useTranslate('ui.pages.company')
  const errorNotify = useErrorNotify()
  const successNotify = useSuccessNotify()
  const pathname = usePathname()

  const [company] = data
  const id = company?.id

  const action = id ? updateTenantCompanyByIdAction : insertTenantCompanyAction

  const validator = company
    ? tenantCompanyUpdateValidator
    : tenantCompanyInsertValidator

  const config: FormConfig = {
    name: {
      label: t('form.fields.name.label'),
      value: company?.name,
      error: t('form.fields.name.error'),
    },
    email: {
      type: 'email',
      label: t('form.fields.email.label'),
      error: t('form.fields.email.error'),
      value: company?.email,
    },
    phone: {
      type: 'tel',
      label: t('form.fields.phone.label'),
      error: t('form.fields.phone.error'),
      value: company?.phone,
    },
    website: {
      type: 'url',
      label: t('form.fields.website.label'),
      error: t('form.fields.website.error'),
      value: company?.website,
    },
  }

  const schema = createFormSchema(
    validator.omit({ socialLinks: true, userId: true }),
    config
  )

  const onSubmit = async ({ error, values }: Submit) => {
    try {
      if (error) throw error

      const args = id ? { data: values, id } : ({ data: values } as any)

      const result = await action(args, pathname)
      if (result.error) throw result.error

      successNotify({
        title: t('notifications.save.success.title'),
        description: t('notifications.save.success.description'),
      })

      // redirect()

      return !error
    } catch (error) {
      if (isDev()) {
        console.error(error)
      }

      errorNotify({
        title: t('notifications.save.error.title'),
        description: t('notifications.save.error.description'),
      })
    }
  }

  {
    /* TODO:// Social */
  }
  return (
    <Form
      id={name}
      className={cn(className)}
      legend={t('form.legend')}
      schema={schema}
      submit={onSubmit}
      validator={validator}
      {...props}
    >
      <SaveButton />
    </Form>
  )
}
