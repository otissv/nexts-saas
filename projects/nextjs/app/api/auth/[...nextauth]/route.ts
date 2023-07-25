import NextAuth from 'next-auth'

import { authOptions } from '@/features/app-auth/auth.options'

const authApi = NextAuth(authOptions)

export { authApi as GET, authApi as POST }
