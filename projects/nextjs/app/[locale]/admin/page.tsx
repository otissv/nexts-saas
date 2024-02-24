/**
 * Admin Page
 */

import { PageHeader } from '@/components/page/page-header'
import AdminRootLayout from '@/app/[locale]/admin/(admin-layout)/layout'

export default async function Admin() {
  return (
    <AdminRootLayout>
      <PageHeader heading="Admin" />
    </AdminRootLayout>
  )
}
