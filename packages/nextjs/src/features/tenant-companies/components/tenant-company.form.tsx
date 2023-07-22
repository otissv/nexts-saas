'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { isDev } from 'c-ufunc/libs/isDev'
import { cn } from '@/components/lib/utils'
import { FormConfig, useForm } from '@/components/form/useForm'
import { useTranslateClient } from '@/components/translate/translate-client'
import { Form, Submit } from '@/components/form/form'
import { useErrorNotify, useSuccessNotify } from '@/components/notify'
import { SaveButton } from '@/components/buttons/save-button'

import {
  tenantCompanyUpdateValidator,
  tenantCompanyInsertValidator,
} from '@/features/tenant-companies/companies.tenant.validators'
import {
  updateTenantCompanyByIdAction,
  insertTenantCompanyAction,
} from '@/features/tenant-companies/companies.actions'

import { TenantCompany } from '@/features/tenant-companies/companies.tenant.types'

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
  const t = useTranslateClient('ui.pages.tenantCompany')
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
      error: t('form.fields.name.error'),
      label: t('form.fields.name.label'),
      ref: React.useRef(null),
      value: company?.name,
    },
    email: {
      type: 'email',
      error: t('form.fields.email.error'),
      label: t('form.fields.email.label'),
      ref: React.useRef(null),
      value: company?.email,
    },
    phone: {
      type: 'tel',
      error: t('form.fields.phone.error'),
      label: t('form.fields.phone.label'),
      ref: React.useRef(null),
      value: company?.phone,
    },
    website: {
      type: 'url',
      error: t('form.fields.website.error'),
      label: t('form.fields.website.label'),
      ref: React.useRef(null),
      value: company?.website,
    },
  }

  const schema = useForm(
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
