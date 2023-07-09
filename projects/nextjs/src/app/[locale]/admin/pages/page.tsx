/**
 *  Pages Page
 */

import { PageHeader } from '@/components/page-header'

export default function PagesPage() {
  const breadcrumbs = [{ label: 'Home', crumb: '/' }, { label: 'Posts' }]

  return (
    <>
      <PageHeader heading="Posts" breadcrumbs={breadcrumbs} />
    </>
  )
}
