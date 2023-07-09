/**
 * Company Address Page
 */

import {
  deleteTenantCompanyAddressByIdAction,
  selectTenantCompanyAddressByIdAction,
} from '@/features/tenant-company-addresses/company-addresses.tenant.actions'

import { AddressForm } from '@/features/tenant-addresses/components/tenant-addresses.form'
import { PageHeader } from '@/components/page-header'
import { translateServer } from '@/components/translate-server'
import { TenantCompanyAddress } from '@/features/tenant-company-addresses/company-addresses.tenant.types'
import { Divider } from '@/components/divider'
import { DeleteButton } from '@/components/buttons'
import { getHeaders } from '@/lib/getHeaders'
import { isDev } from '@/lib/utils'
import { TenantCompany } from '@/features/tenant-companies/companies.tenant.types'

export interface CompanyAddressesPageProps {
  params: {
    addressId: TenantCompanyAddress['id']
    companyId: TenantCompany['id']
  }
}

export default async function CompanyAddressesPage({
  params: { addressId, companyId },
}: CompanyAddressesPageProps) {
  const { data } = await selectTenantCompanyAddressByIdAction(addressId)
  const t = await translateServer('ui.pages')
  const tToolbar = await translateServer('ui.page.toolbar')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('companies.breadcrumb.label'), crumb: 'admin/companies' },
    { label: t('company.edit.breadcrumb.label'), crumb: `${companyId}` },
    { label: t('addresses.breadcrumb.label'), crumb: 'addresses' },
    { label: t('address.edit.breadcrumb.label') },
  ]

  const handleDelete = async () => {
    'use server'

    const { pathname } = getHeaders()
    const { error } = await deleteTenantCompanyAddressByIdAction(
      addressId,
      pathname
    )
    if (error && isDev()) console.error(error)
    return !error
  }

  return (
    <div>
      <PageHeader heading={t('address.heading')} breadcrumbs={breadcrumbs} />

      <AddressForm name="address" data={data} />

      <Divider className="mt-8 mb-6" />

      <DeleteButton
        title={t('address.notifications.delete.alert.title')}
        description={t('address.notifications.delete.alert.description')}
        cancel={t('address.notifications.delete.alert.buttons.cancel')}
        ok={t('address.notifications.delete.alert.buttons.ok')}
        onAction={handleDelete}
        error={{
          title: t('pages.user.notifications.save.error.title'),
          description: t('pages.user.notifications.save.error.description'),
        }}
        success={{
          title: t('pages.user.notifications.delete.success.title'),
          description: t('pages.user.notifications.delete.success.description'),
        }}
      >
        {tToolbar('delete.a.content')}
      </DeleteButton>
    </div>
  )
}
