/**
 * Marketing Layout
 */
import React from 'react'
import { getServerSession } from 'next-auth/next'

import { DefaultLayout } from '@/components/layouts/default-layout'
import { menu } from 'app/[locale]/(marketing)/menu'
import { serverUseTranslate } from '@/components/translate/translate-server'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'

export interface MarketingRootLayoutProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export default async function MarketingRootLayout({
  children,
}: MarketingRootLayoutProps) {
  const session: AuthSession = await getServerSession(authOptions)

  const isLoggedIn = Boolean(session?.user?.tenantId)
  const T = await serverUseTranslate('ui.pages.authentication')

  const menuItems = await menu()

  return (
    <DefaultLayout menuItems={menuItems} isLoggedIn={isLoggedIn} T={T}>
      {children}
    </DefaultLayout>
  )
}
