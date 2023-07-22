/**
 * Admin Page
 */

import { PageHeader } from '@/components/page/page-header'

export default async function Admin() {
  const breadcrumbs = [{ label: 'Home', crumb: '/' }, { label: 'Admin' }]

  return (
    <>
      <PageHeader heading="Admin" breadcrumbs={breadcrumbs} />
    </>
  )
}
