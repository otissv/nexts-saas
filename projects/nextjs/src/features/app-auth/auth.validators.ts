import { userValidator } from '@/features/app-users/users.validators'
import { validate } from '@/lib/validate'
import { SignIn, Signup } from './auth.types'

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
  debugger
  console.log({signupValidator})
  console.log({data})
  return validate(signupValidator)(data)
}
