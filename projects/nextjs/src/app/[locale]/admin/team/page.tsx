/**
 * Team Page
 */

import { PageHeader } from '@/components/page-header'

export default function TeamPage() {
  const breadcrumbs = [{ label: 'Home', crumb: '/' }, { label: 'Team' }]

  return (
    <>
      <PageHeader heading="Team" breadcrumbs={breadcrumbs} />
    </>
  )
}
