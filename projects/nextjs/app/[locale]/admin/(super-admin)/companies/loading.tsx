import { TableLoadingLayout } from '@/components/layouts/table-loading-layout'
import { translateServer } from '@/components/translate/translate-server'

export default async function CompaniesLoading() {
  const t = await translateServer('ui.pages')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('tenantCompanies.breadcrumb.label') },
  ]

  return (
    <TableLoadingLayout
      heading={t('tenantCompanies.heading')}
      breadcrumbs={breadcrumbs}
    />
  )
}
