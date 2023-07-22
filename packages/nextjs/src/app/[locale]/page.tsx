/**
 * Home Page
 */
import { getServerSession } from 'next-auth/next'
import { serverUseTranslate } from '@/components/translate/translate-server'
import { DefaultLayout } from '@/components/layouts/default-layout'

import { menu } from '@/app/[locale]/(marketing)/menu'

export default async function Home() {
  const session = await getServerSession()
  const isLoggedIn = Boolean(session)
  const T = await serverUseTranslate('ui.pages.authentication')

  const menuItems = await menu()

  return (
    <DefaultLayout menuItems={menuItems} isLoggedIn={isLoggedIn} T={T}>
      <h1>Home</h1>
    </DefaultLayout>
  )
}
