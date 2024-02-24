import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

import { menu } from '@/app/[locale]/admin/(admin-layout)/menu'
import { PageLayout } from '@/components/layouts/page-layout'

export default async function PageRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const menuItems = await menu()

  return <PageLayout menuItems={menuItems}>{children}</PageLayout>
}
