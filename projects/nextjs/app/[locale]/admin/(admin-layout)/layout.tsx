import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { menu } from '@/app/[locale]/admin/(admin-layout)/menu'
import { AdminLayout } from '@/components/layouts/admin-layout'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session: AuthSession = await getServerSession(authOptions)
  if (!session?.user?.tenantId) redirect('/login')

  const menuItems = await menu()

  return <AdminLayout menuItems={menuItems}>{children}</AdminLayout>
}
