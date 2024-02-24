/**
 *  Company Page
 */

import Link from 'next/link'
import React from 'react'
import { ChevronRight } from 'lucide-react'

import { CompanyForm } from '@/features/tenant-companies/components/tenant-company.form'
import { PageHeader } from '@/components/page/page-header'
import { translateServer } from '@/components/translate/translate-server'
import { TenantCompany } from '@/features/tenant-companies/companies.tenant.types'
import { selectTenantCompanyByIdAction } from '@/features/tenant-companies/companies.actions'
import { Divider } from '@/components/divider'

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
    { label: t('tenantCompany.edit.breadcrumb.label') },
  ]

  return (
    <>
      <PageHeader
        heading={data[0]?.name || t('tenantCompany.edit.heading')}
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
        {t('tenantAddress.heading')}
        <ChevronRight className="inline-block ml-2" />
      </Link>

      <Divider className="mt-2 mb-6" />
      <CompanyForm name="company" data={data} />
    </>
  )
}
