import { z } from 'zod'

import { validate } from '@/lib/validate'
import {
  TenantCompany,
  TenantCompanyInsert,
  TenantCompanyUpdate,
} from './companies.tenant.types'

export const tenantCompanyValidator = z.object({
  id: z.number().int().positive(),
  name: z.string().min(3).max(256),
  email: z
    .string()
    .email()
    .regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/),
  phone: z
    .string()
    .min(3)
    .max(256)
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .optional(),
  website: z
    .string()
    .min(3)
    .max(256)
    .regex(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    )
    .optional(),
  socialLinks: z
    .array(
      z.object({
        label: z.string().min(3).max(256),
        url: z
          .string()
          .min(3)
          .max(256)
          .regex(
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
          ),
        icon: z.string().min(3).max(256),
      })
    )
    .optional(),
  createdAt: z.coerce.date(),
  createdBy: z.number().int().positive(),
  updatedAt: z.coerce.date(),
  updatedBy: z.number().int().positive(),
})

export const tenantCompanyInsertValidator = tenantCompanyValidator.omit({
  id: true,
})

export const tenantCompanyUpdateValidator = tenantCompanyValidator
  .omit({
    id: true,
  })
  .partial()

export async function tenantCompanyValidate(data: TenantCompany) {
  return validate(tenantCompanyValidator)(data)
}

export async function tenantCompanyInsertValidate(data: TenantCompanyInsert) {
  return validate(tenantCompanyInsertValidator)(data)
}

export async function tenantCompanyUpdateValidate(data: TenantCompanyUpdate) {
  return validate(tenantCompanyUpdateValidator)(data)
}
