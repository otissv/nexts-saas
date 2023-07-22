/**
 *  Company Page
 */

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Divider } from '@/components/divider'
import { PageHeader } from '@/components/page/page-header'
import { translateServer } from '@/components/translate/translate-server'

import { CompanyForm } from '@/features/tenant-companies/components/tenant-company.form'
import { TenantCompany } from '@/features/tenant-companies/companies.tenant.types'
import { selectTenantCompanyByIdAction } from '@/features/tenant-companies/companies.actions'

export interface CompanyPageProps {
  params: { companyId: TenantCompany['id'] }
}

export default async function CompanyPage({
  params: { companyId },
}: CompanyPageProps) {
  const { data } = await selectTenantCompanyByIdAction(companyId)

  const t = await translateServer('ui.pages')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('home.breadcrumb.label'), crumb: 'admin/companies' },
    { label: t('company.edit.breadcrumb.label') },
  ]

  return (
    <>
      <PageHeader
        heading={data[0]?.name || t('company.edit.heading')}
        breadcrumbs={breadcrumbs}
      />
      <Link
        href={`/admin/companies/${companyId}/addresses`}
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
        {t('addresses.heading')}
        <ChevronRight className="inline-block ml-2" />
      </Link>

      <Divider className="my-6" />
      <CompanyForm name="company" data={data} />
    </>
  )
}
