/**
 * Companies Page
 */

import { PageHeader } from 'components/page/page-header'
import { translateServer } from 'components/translate/translate-server'
import { NewButton } from 'components/buttons/new-button'
import { Divider } from 'components/divider'

export interface CompaniesPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const t = await translateServer('ui.pages')

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('companies.breadcrumb.label') },
  ]

  return (
    <>
      <PageHeader heading={t('companies.heading')} breadcrumbs={breadcrumbs} />

      <NewButton className="mb-4" href="/admin/companies/new" />

      <Divider />
    </>
  )
}
