'use client'
import * as React from 'react'
import { isDev } from 'c-ufunc/libs/isDev'

import {
  tenantCompanyAddressInsertValidator,
  tenantCompanyAddressUpdateValidator,
} from '@/features/tenant-company-addresses/company-addresses.tenant.validators'
import {
  updateTenantCompanyAddressByIdAction,
  insertTenantCompanyAddressAction,
} from '@/features/tenant-company-addresses/company-addresses.tenant.actions'
import { Form, Submit } from '@/components/form'
import {
  FormConfig,
  createFormSchema,
} from '@/components/forms/createFormSchema'
import { SaveButton } from '@/components/buttons'
import { cn } from '@/lib/utils'
import { useErrorNotify, useSuccessNotify } from '@/components/notify'
import { useTranslate } from '@/components/translate-client'
import { TenantCompanyAddress } from '@/features/tenant-company-addresses/company-addresses.tenant.types'

export interface AddressFormProps {
  name: string
  data: Partial<TenantCompanyAddress>[]
  children?: React.ReactNode
  className?: string
}
export const AddressForm = ({
  name,
  data,
  children,
  className,
  ...props
}: AddressFormProps) => {
  const t = useTranslate('ui.pages.tenantAddress.form')
  const errorNotify = useErrorNotify()
  const successNotify = useSuccessNotify()

  const [address] = data
  const id = address?.id

  const action = id
    ? updateTenantCompanyAddressByIdAction
    : insertTenantCompanyAddressAction

  const addressValidator = address
    ? tenantCompanyAddressUpdateValidator
    : tenantCompanyAddressInsertValidator
  const validator = addressValidator

  const config: FormConfig = {
    site: {
      label: t('fields.site.label'),
      value: address?.site,
      error: t('fields.site.error'),
    },
    streetAddress: {
      label: t('fields.streetAddress.label'),
      value: address?.streetAddress,
      error: t('fields.streetAddress.error'),
    },
    addressDetails: {
      label: t('fields.addressDetails.label'),
      value: address?.addressDetails,
      classNames: {
        label: 'sr-only',
      },
      error: t('fields.addressDetails.error'),
    },
    city: {
      label: t('fields.city.label'),
      value: address?.city,
      error: t('fields.city.error'),
    },
    state: {
      label: t('fields.state.label'),
      value: address?.state,
      error: t('fields.state.error'),
    },
    postalCode: {
      label: t('fields.postalCode.label'),
      value: address?.postalCode,
      error: t('fields.postalCode.error'),
    },
    country: {
      label: t('fields.country.label'),
      value: address?.country,
      error: t('fields.country.error'),
    },
  }

  const onSubmit = async ({ error, values }: Submit) => {
    try {
      if (error) {
        throw error
      }

      ;(values as any).companyId = address.companyId

      const args = id ? { data: values, id } : ({ data: values } as any)
      await action(args).then(() =>
        successNotify({
          title: 'Success',
          description: 'Saved',
        })
      )
    } catch (error) {
      if (isDev()) {
        console.error(error)
      }

      errorNotify({
        title: 'Something went wrong',
        description: 'There was a problem with your request.',
      })
    }
  }

  const schema = createFormSchema(validator, config)

  return (
    <Form
      id={name}
      className={cn(className)}
      legend={t('legend')}
      schema={schema}
      submit={onSubmit}
      validator={validator}
      {...props}
    >
      {children || <SaveButton />}
    </Form>
  )
}
