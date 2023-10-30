/**
 *  Company Address Page
 */

import { PageHeader } from '@/components/page/page-header'
import { translateServer } from '@/components/translate/translate-server'
import { serverContext } from '@/app/context-server-only'

export default async function CompanyAddressesNewPage() {
  const locale = serverContext().localeService.get()
  const t = await translateServer(locale, 'ui.pages')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('tenantCompany.breadcrumb.label'), crumb: 'admin/companies' },
    { label: t('tenantAddresses.breadcrumb.label') },
  ]

  return (
    <>
      <PageHeader heading="Company Addresses" breadcrumbs={breadcrumbs} />
    </>
  )
}
