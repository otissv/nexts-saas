import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { AdminLayout } from '@/components/layouts/admin-layout'

import { menu } from '@/app/[locale]/admin/menu'

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const menuItems = await menu()

  return <AdminLayout menuItems={menuItems}>{children}</AdminLayout>
}
