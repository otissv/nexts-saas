import { z } from 'zod'
import { validate } from 'utils/validate'

import { User, UserInsert, UserUpdate } from '@/features/app-users/users.types'

export const userValidator = z.object({
  id: z.number().int().positive(),
  username: z
    .string()
    .regex(/^[a-z0-9_-]{3,30}$/)
    .min(3)
    .max(30),
  email: z
    .string()
    .email()
    .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
  emailVerified: z.boolean().optional(),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)
    .min(8)
    .max(256),
  firstName: z.string().min(1).max(256).optional(),
  lastName: z.string().min(1).max(256).optional(),
  phone: z
    .string()
    .min(3)
    .max(256)
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .optional(),
  imageUrl: z
    .string()
    .url()
    .regex(
      /^(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*))|$/
    )
    .optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const userInsertValidator = userValidator.omit({
  id: true,
  password: true,
  firstName: true,
  lastName: true,
  phone: true,
  imageUrl: true,
  emailVerified: true,
  createdAt: true,
  updatedAt: true,
})

export const userUpdateValidator = userValidator
  .omit({
    id: true,
    password: true,
    firstName: true,
    lastName: true,
    phone: true,
    imageUrl: true,
    emailVerified: true,
    createdAt: true,
  })
  .partial()

export async function userValidate(data: User) {
  return validate(userValidator)(data)
}

export async function userInsertValidate(data: UserInsert) {
  return validate(userInsertValidator)(data)
}

export async function userUpdateValidate(data: UserUpdate) {
  return validate(userUpdateValidator)(data)
}
