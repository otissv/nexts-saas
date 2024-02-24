/**
 * New Company Address Page
 */

import { AddressForm } from '@/features/tenant-addresses/components/tenant-addresses.form'
import { translateServer } from '@/components/translate/translate-server'
import { PageHeader } from '@/components/page/page-header'

export default async function CompanyAddressesNePage() {
  const t = await translateServer('ui.pages')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('tenantCompany.breadcrumb.label'), crumb: 'admin/companies' },
    { label: t('tenantCompany.breadcrumb.label'), crumb: 'admin/company' },
    { label: t('tenantAddresses.breadcrumb.label'), crumb: 'addresses' },
    { label: t('tenantAddress.new.breadcrumb.label') },
  ]

  return (
    <>
      <PageHeader
        heading={t('address.new.heading')}
        breadcrumbs={breadcrumbs}
      />

      <AddressForm name="companyAddress" data={[]} />
    </>
  )
}
