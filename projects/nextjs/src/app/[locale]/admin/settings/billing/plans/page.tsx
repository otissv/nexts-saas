/**
 * Pricing plans Page
 */
import { PageHeader } from 'components/page/page-header'

export default function PlansPage() {
  const breadcrumbs = [{ label: 'Home', crumb: '/' }, { label: 'Plans' }]

  return (
    <>
      <PageHeader heading="Plans" breadcrumbs={breadcrumbs} />
    </>
  )
}
