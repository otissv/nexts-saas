'use server'

import { User } from 'next-auth'

import { serverContext } from '@/app/context-server-only'
import { SignIn, Signup } from '@/features/app-auth/auth.types'

const { authService } = serverContext()

/* Mutations */

export async function authSignIn({ username, password }: SignIn) {
  const result = (await authService.signIn({
    username,
    password,
  })) as { data: User[] }

  const [user] = result.data
  return {
    ...user,
    id: user.id?.toString(),
  }
}

export async function authSignup(data: Signup) {
  const result = await authService.signup({ data })
  const [{ id, username }] = result.data
  return { ...result, data: [{ id, username }] }
}
