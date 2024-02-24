import * as React from 'react'

import { TableLoadingLayout } from '@/components/layouts/table-loading-layout'
import { translateServer } from '@/components/translate/translate-server'
import { serverContext } from '@/features/context-server-only'

export default async function UsersLoading() {
  const t = await translateServer('ui.pages')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('tenantCompany.breadcrumb.label'), crumb: 'admin/companies' },
    { label: t('tenantAddresses.breadcrumb.label') },
  ]

  return (
    <TableLoadingLayout
      heading={t('tenantAddress.heading')}
      breadcrumbs={breadcrumbs}
    />
  )
}
