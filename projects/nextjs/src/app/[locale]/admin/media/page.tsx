/**
 *  Media Page
 */

import { PageHeader } from 'components/page/page-header'

export default function MediaPage() {
  const breadcrumbs = [{ label: 'Home', crumb: '/' }, { label: 'Media' }]

  return (
    <>
      <PageHeader heading="Media" breadcrumbs={breadcrumbs} />
    </>
  )
}
