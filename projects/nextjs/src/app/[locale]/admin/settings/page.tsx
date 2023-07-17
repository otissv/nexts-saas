/**
 * Settings Page
 */

import { PageHeader } from '@/components/page/page-header'

export default function SettingsPage() {
  const breadcrumbs = [{ label: 'Home', crumb: '/' }, { label: 'Team' }]

  return (
    <>
      <PageHeader heading="Team" breadcrumbs={breadcrumbs} />
    </>
  )
}
