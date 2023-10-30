import { TableLoadingLayout } from '@/components/layouts/table-loading-layout'
import { translateServer } from '@/components/translate/translate-server'
import { serverContext } from '@/app/context-server-only'

export default async function CompaniesLoading() {
  const locale = serverContext().localeService.get()
  const t = await translateServer(locale, 'ui.pages')

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
