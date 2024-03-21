/**
 * Login Page
 */

import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { getProviders } from 'next-auth/react'
import { Metadata } from 'next/types'

import { TypographyH1 } from '@/components/typography/h1.typography'
import { serverUseTranslate } from '@/components/translate/translate-server'
import { LoginForm } from '@/features/app-auth/components/login.form'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'

export const metadata: Metadata = {
  title: 'Login',
  description: '...',
}

export default async function LoginPage() {
  const session: AuthSession = await getServerSession(authOptions)

  console.log('===============================:', session?.user?.tenantId)

  if (session?.user?.tenantId) redirect('/')

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
        <TypographyH1 className="mb-3">Login</TypographyH1>

        <LoginForm providers={providerNames} />

        <p className=" mt-3 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </main>
  )
}
LoginPage.displayName = 'Login'
