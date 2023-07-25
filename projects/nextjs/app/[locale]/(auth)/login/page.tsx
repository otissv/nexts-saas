/**
 * Login Page
 */

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { getProviders } from 'next-auth/react'

import { TypographyH1 } from '@/components/typography/h1.typography'
import { serverUseTranslate } from '@/components/translate/translate-server'
import { LoginForm } from '@/features/app-auth/components/login.form'

export default async function LoginPage() {
  const session = await getServerSession()

  if (session) redirect('/admin')

  const provides = await getProviders()
  const T = await serverUseTranslate('ui.pages.authentication')

  const providerNames = [
    'credentials',
    ...Object.keys(provides || {}).filter(
      (provider) => provider !== 'credentials'
    ),
  ]

  return (
    <main className="flex justify-center">
      <div className="flex flex-col w-72 text-center min-h-screen justify-center">
        <TypographyH1 className="mb-3">
          <T>login.heading</T>
        </TypographyH1>

        <LoginForm providers={providerNames} />

        <p className=" mt-3 text-center text-sm text-muted-foreground">
          <T>terms.content</T>
        </p>
      </div>
    </main>
  )
}
LoginPage.displayName = 'Login'
