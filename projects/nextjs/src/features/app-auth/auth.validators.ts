import { validate } from 'utils/validate'

import { SignIn, Signup } from '@/features/app-auth/auth.types'
import { userValidator } from '@/features/app-users/users.validators'

export const signInValidator = userValidator.omit({
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  imageUrl: true,
  rolesId: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
})

export const signupValidator = userValidator.omit({
  id: true,
  firstName: true,
  lastName: true,
  phone: true,
  imageUrl: true,
  rolesId: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
})

export async function signInValidate(data: SignIn) {
  return validate(signInValidator)(data)
}

export async function signupValidate(data: Signup) {
  return validate(signupValidator)(data)
}
