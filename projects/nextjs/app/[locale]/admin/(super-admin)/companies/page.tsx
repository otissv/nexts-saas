/**
 * Companies Page
 */

import { PageHeader } from '@/components/page/page-header'
import { translateServer } from '@/components/translate/translate-server'
import { NewButton } from '@/components/buttons/new-button'
import { Divider } from '@/components/divider'
import { decodeSearchParams } from '@/lib/querystring'
import {
  deleteTenantCompanyByIdAction,
  selectTenantCompaniesAction,
} from '@/features/tenant-companies/companies.actions'
import { getHeaders } from '@/lib/getHeaders'
import { Pagination } from '@/components/page/pagination'
import { Search } from '@/components/search'
import { env } from 'env/build'
import { TenantCompaniesTable } from '@/features/tenant-companies/components/tenant-companies.table'

const { pageLimit } = env()

export interface TenantCompaniesPageProps {
  searchParams: Record<string, any>
}

export default async function TenantCompaniesPage({
  searchParams,
}: TenantCompaniesPageProps) {
  const t = await translateServer('ui.pages')
  const queryParams = decodeSearchParams(searchParams)
  const { data, totalPages } = await selectTenantCompaniesAction(queryParams)

  const breadcrumbs = [
    { label: t('home.breadcrumb.label'), crumb: '/' },
    { label: t('tenantCompanies.breadcrumb.label') },
  ]

  const deleteAction = async (id: number) => {
    'use server'
    const { pathname } = getHeaders()
    return deleteTenantCompanyByIdAction(id, pathname)
  }

  return (
    <>
      <PageHeader
        heading={t('tenantCompanies.heading')}
        breadcrumbs={breadcrumbs}
      />

      <NewButton className="mb-4" href="/admin/companies/new" />

      <Divider />

      <Search
        columns={['email', 'firstName', 'lastName']}
        searchParams={searchParams}
        className="mb-6"
      />

      {data.length ? (
        <>
          <TenantCompaniesTable
            total={totalPages}
            data={data}
            baseUrl="/admin/companies"
            onDelete={deleteAction}
            {...queryParams}
            limit={queryParams.limit || pageLimit}
          />

          <Pagination
            {...queryParams}
            total={totalPages}
            limit={queryParams.limit || pageLimit}
          />
        </>
      ) : (
        t('list.notFound')
      )}
    </>
  )
}
