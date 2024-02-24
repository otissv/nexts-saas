/**
 * Sign Up Page
 */

import { Metadata } from 'next/types'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { getProviders } from 'next-auth/react'

import { TypographyH1 } from '@/components/typography/h1.typography'
import { SignupForm } from '@/features/app-auth/components/signup.form'
import { authOptions } from '@/features/app-auth/auth.options'
import { AuthSession } from '@/features/app-auth/auth.types'

export const metadata: Metadata = {
  title: 'Sign Up',
  description: '...',
}

export default async function SignupPage() {
  const session: AuthSession = await getServerSession(authOptions)
  if (session?.user?.tenantId) redirect('/')

  const provides = await getProviders()

  const providerNames = [
    'credentials',
    ...Object.keys(provides || {}).filter(
      (provider) => provider !== 'credentials'
    ),
  ]

  return (
    <main className="flex justify-center">
      <div className="flex flex-col w-72 text-center min-h-screen justify-center">
        <TypographyH1 className="mb-3">Create an account</TypographyH1>

        <SignupForm providers={providerNames} />

        <p className=" mt-3 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </main>
  )
}
SignupPage.displayName = 'SignupPage'
