/**
 * Billings Page
 */

import { PageHeader } from '@/components/page-header'

export default function BillingPage() {
  const breadcrumbs = [{ label: 'Home', crumb: '/' }, { label: 'Billing' }]

  return (
    <>
      <PageHeader heading="Billing" breadcrumbs={breadcrumbs} />
    </>
  )
}
