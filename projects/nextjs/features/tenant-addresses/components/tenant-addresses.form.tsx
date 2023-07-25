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
import { Form, Submit } from '@/components/form/form'
import { FormConfig, useForm } from '@/components/form/useForm'
import { SaveButton } from '@/components/buttons/save-button'
import { cn } from '@/lib/utils'
import { useErrorNotify, useSuccessNotify } from '@/components/notify'
import { useTranslateClient } from '@/components/translate/translate-client'
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
  const t = useTranslateClient('ui.pages.tenantAddress.form')
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
      error: t('fields.site.error'),
      label: t('fields.site.label'),
      ref: React.useRef(null),
      value: address?.site,
    },
    streetAddress: {
      error: t('fields.streetAddress.error'),
      label: t('fields.streetAddress.label'),
      ref: React.useRef(null),
      value: address?.streetAddress,
    },
    addressDetails: {
      classNames: {
        label: 'sr-only',
      },
      label: t('fields.addressDetails.label'),
      error: t('fields.addressDetails.error'),
      ref: React.useRef(null),
      value: address?.addressDetails,
    },
    city: {
      error: t('fields.city.error'),
      label: t('fields.city.label'),
      ref: React.useRef(null),
      value: address?.city,
    },
    state: {
      error: t('fields.state.error'),
      label: t('fields.state.label'),
      ref: React.useRef(null),
      value: address?.state,
    },
    postalCode: {
      error: t('fields.postalCode.error'),
      label: t('fields.postalCode.label'),
      ref: React.useRef(null),
      value: address?.postalCode,
    },
    country: {
      error: t('fields.country.error'),
      label: t('fields.country.label'),
      ref: React.useRef(null),
      value: address?.country,
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

  const schema = useForm(validator, config)

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
