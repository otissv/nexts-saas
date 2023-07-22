/**
 *  Company Address Page
 */

import { PageHeader } from 'components/page/page-header'
import { translateServer } from 'components/translate/translate-server'

import { TenantCompany } from '@/features/tenant-companies/companies.tenant.types'

export interface CompanyAddressNewPageProps {
  params: { companyId: TenantCompany['id'] }
}

export default async function CompanyAddressesNewPage({
  params: { companyId },
}: CompanyAddressNewPageProps) {
  const t = await translateServer('ui.pages')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('company.breadcrumb.label'), crumb: 'admin/companies' },
    { label: t('addresses.breadcrumb.label') },
  ]

  return (
    <>
      <PageHeader heading="Company Addresses" breadcrumbs={breadcrumbs} />
    </>
  )
}
