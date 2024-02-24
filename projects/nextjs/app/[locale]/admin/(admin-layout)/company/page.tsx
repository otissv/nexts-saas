/**
 *  Company Page
 */

import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react'

import { selectTenantCompanyAction } from '@/features/tenant-companies/companies.actions'
import { selectTenantAddressesByCompanyIdAction } from '@/features/tenant-addresses/addresses.tenant.actions'
import { TenantCompany } from '@/features/tenant-companies/companies.tenant.types'
import { CompanyForm } from '@/features/tenant-companies/components/tenant-company.form'
import { PageHeader } from '@/components/page/page-header'
import { translateServer } from '@/components/translate/translate-server'

import { Divider } from '@/components/divider'

export interface CompanyPageProps {
  searchParams: { companyId: TenantCompany['id'] }
}

export default async function CompanyPage({}: CompanyPageProps) {
  const { data } = await selectTenantCompanyAction()

  const companyData = data

  if (!companyData?.[0]) {
    return <h1>Company not found</h1>
  }

  const companyId = companyData[0]?.id

  let addressId
  if (companyId) {
    //TODO: use columns to get address id only
    let { data } = await selectTenantAddressesByCompanyIdAction(companyId)

    addressId = data[0]?.id
  }

  const t = await translateServer('ui.pages')

  const breadcrumbs = [
    { label: t('admin.breadcrumb.label'), crumb: 'admin' },
    { label: t('tenantCompany.heading'), crumb: 'admin/companies' },
  ]

  return (
    <>
      <PageHeader heading={companyData[0]?.name} breadcrumbs={breadcrumbs} />
      <Link
        href={`/admin/company/address?addressId=${addressId}&companyId=${companyId}`}
        className={`
        inline-flex
        border border-input
        hover:bg-accent
        py-2
        px-4
        font-medium
        text-sm
        rounded-md
        h-11
        justify-center
        items-center
        mb-6
        `}
      >
        {t('tenantAddress.heading')}
        <ChevronRight className="inline-block ml-2" />
      </Link>

      <Divider className="mt-2 mb-6" />

      <CompanyForm name="company" data={companyData} />
    </>
  )
}
