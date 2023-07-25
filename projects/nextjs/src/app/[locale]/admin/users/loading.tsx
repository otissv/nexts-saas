import * as React from 'react'

import { TableLoadingLayout } from '@/components/layouts/table-loading-layout'
import { translateServer } from '@/components/translate/translate-server'

export default async function UsersLoading() {
  const t = await translateServer('ui.pages')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('users.breadcrumb.label') },
  ]

  return (
    <TableLoadingLayout
      heading={t('users.heading')}
      breadcrumbs={breadcrumbs}
    />
  )
}
