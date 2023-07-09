import { NextResponse } from 'next/server'

import { authSignup } from '@/features/app-auth/auth.actions'

// credentials sign up
const signupApi = async (request: Request) => {
  const body = await request.json()
  const result = await authSignup(body)

  return NextResponse.json(result)
}

export { signupApi as POST }
