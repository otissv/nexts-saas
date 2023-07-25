import { z } from 'zod'

import {
  signInValidator,
  signupValidator,
} from '@/features/app-auth/auth.validators'

export type SignIn = z.infer<typeof signInValidator>
export type Signup = z.infer<typeof signupValidator>
