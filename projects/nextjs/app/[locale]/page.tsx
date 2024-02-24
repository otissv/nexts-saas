/**
 * Home Page
 */
import { getServerSession } from 'next-auth/next'

import { DefaultLayout } from '@/components/layouts/default-layout'
import { menu } from 'app/[locale]/(marketing)/menu'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'

export default async function Home() {
  const session: AuthSession = await getServerSession(authOptions)
  const isLoggedIn = Boolean(session?.user?.tenantId)

  const menuItems = await menu()

  return (
    <DefaultLayout menuItems={menuItems} isLoggedIn={isLoggedIn}>
      <h1>Home</h1>
    </DefaultLayout>
  )
}
