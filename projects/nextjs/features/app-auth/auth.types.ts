import { z } from 'zod'
import { Session } from 'next-auth'

import {
  signInValidator,
  signupValidator,
} from '@/features/app-auth/auth.validators'

export type SignIn = z.infer<typeof signInValidator>
export type Signup = z.infer<typeof signupValidator>

interface SessionWithTenantId extends Session {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    tenantId?: number | null
    userId?: number
    accessToken?: string
  }
}

export type AuthSession = SessionWithTenantId | null
export type UserSession = SessionWithTenantId['user'] | null
