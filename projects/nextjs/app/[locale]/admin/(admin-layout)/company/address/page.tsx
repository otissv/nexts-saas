/**
 * Company Address Page
 */

import { selectTenantAddressByIdAction } from '@/features/tenant-addresses/addresses.tenant.actions'
import { AddressForm } from '@/features/tenant-addresses/components/tenant-addresses.form'
import { PageHeader } from '@/components/page/page-header'
import { translateServer } from '@/components/translate/translate-server'
import { TenantAddress } from '@/features/tenant-addresses/addresses.tenant.types'
import { TenantCompany } from '@/features/tenant-companies/companies.tenant.types'

export interface AddressesPageProps {
  searchParams: {
    addressId: TenantAddress['id']
    companyId: TenantCompany['id']
  }
}

export default async function AddressesPage({
  searchParams: { addressId, companyId },
}: AddressesPageProps) {
  if (!addressId || !companyId) {
    return <h1>Address not found</h1>
  }

  const { data: addressData } = await selectTenantAddressByIdAction(addressId)
  const t = await translateServer('ui.pages')

  if (!addressData) {
    return <h1>Company not found</h1>
  }

  const breadcrumbs = [
    { label: t('admin.breadcrumb.label'), crumb: 'admin' },
    { label: t('tenantCompanies.breadcrumb.label'), crumb: 'admin/companies' },
    { label: t('tenantAddresses.breadcrumb.label'), crumb: 'addresses' },
  ]

  return (
    <div>
      <PageHeader
        heading={t('tenantAddress.heading')}
        breadcrumbs={breadcrumbs}
      />

      <AddressForm name="address" data={addressData} />
    </div>
  )
}
