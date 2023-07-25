/**
 *  Company Address Page
 */

import { PageHeader } from '@/components/page/page-header'
import { translateServer } from '@/components/translate/translate-server'

export default async function CompanyAddressesNewPage() {
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
