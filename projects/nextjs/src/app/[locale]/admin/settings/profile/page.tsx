/**
 * Profile Page
 */

import { PageHeader } from '@/components/page-header'

export default function ProfilePage() {
  const breadcrumbs = [{ label: 'Home', crumb: '/' }, { label: 'Profile' }]

  return (
    <>
      <PageHeader heading="Profile" breadcrumbs={breadcrumbs} />
    </>
  )
}
