import { z } from 'zod'

import { validate } from '@/lib/validate'
import {
  TenantCmsCollection,
  TenantCmsCollectionColumn,
  TenantCmsCollectionDocument,
  TenantCmsCollectionDocumentInsert,
  TenantCmsCollectionDocumentUpdate,
  TenantCmsCollectionInsert,
  TenantCmsCollectionUpdate,
} from './cms-collections.tenant.types'

/** Tenant Cms Collection Document **/
export const tenantCmsCollectionDocumentValidator = z.object({
  id: z.number().int().positive(),
  collectionId: z.number().int().positive(),
  data: z.array(z.record(z.string(), z.string())).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export const tenantCmsCollectionDocumentInsertValidator =
  tenantCmsCollectionDocumentValidator.omit({
    id: true,
  })
export const tenantCmsCollectionDocumentUpdateValidator =
  tenantCmsCollectionDocumentValidator
    .omit({
      id: true,
    })
    .partial()
export async function tenantCmsCollectionDocumentValidate(
  data: TenantCmsCollectionDocument
) {
  return validate(tenantCmsCollectionDocumentValidator)(data)
}
export async function tenantCmsCollectionDocumentInsertValidate(
  data: TenantCmsCollectionDocumentInsert
) {
  return validate(tenantCmsCollectionInsertValidator)(data)
}
export async function tenantCmsCollectionDocumentUpdateValidate(
  data: TenantCmsCollectionDocumentUpdate
) {
  return validate(tenantCmsCollectionUpdateValidator)(data)
}

/** Tenant Cms Collection Column **/
export const tenantCmsCollectionColumnDefaultValidator = z.object({
  displayName: z.string().min(1).max(256),
  fieldId: z.string().min(1).max(15),
  type: z.enum([
    'text',
    'multi-reference',
    'reference',
    'number',
    'rich-text',
    'rich-content',
    'private',
  ]),
  defaultValue: z.string().optional(),
  help: z.string().optional(),
  enableDelete: z.boolean().optional(),
  enableSort: z.boolean().optional(),
  enableHide: z.boolean().optional(),
  enableFilter: z.boolean().optional(),
  index: z
    .object({
      direction: z.enum(['asc', 'desc']),
      nulls: z.enum(['first', 'last']),
    })
    .optional(),
})

export const tenantCmsCollectionColumnValidator = z.union([
  tenantCmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
      })
      .optional(),
  }),
  tenantCmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
      })
      .optional(),
  }),
  tenantCmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
      })
      .optional(),
  }),
])
export async function tenantCmsCollectionColumnValidate(
  data: TenantCmsCollectionColumn
) {
  return validate(tenantCmsCollectionColumnValidator)(data)
}
/** Tenant Cms Collection **/

export const tenantCmsCollectionValidator = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  displayName: z.string().min(1).max(256),
  datasetId: z.string().min(1).max(50),
  type: z.enum(['multiple', 'single']),
  columns: z.array(tenantCmsCollectionColumnValidator),
  columnFilters: z
    .array(z.object({ id: z.string(), value: z.any() }))
    .optional(),
  columnOrder: z.array(z.string()).optional(),
  columnSort: z
    .array(
      z.union([
        z.object({ id: z.string(), asc: z.boolean() }),
        z.object({ id: z.string(), desc: z.boolean() }),
      ])
    )
    .optional(),
  columnVisibility: z.array(z.record(z.string(), z.boolean()).optional()),
  data: z.array(tenantCmsCollectionDocumentValidator.optional()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export const tenantCmsCollectionInsertValidator =
  tenantCmsCollectionValidator.omit({
    id: true,
  })
export const tenantCmsCollectionUpdateValidator = tenantCmsCollectionValidator
  .omit({
    id: true,
  })
  .partial()

export async function tenantCmsCollectionValidate(data: TenantCmsCollection) {
  return validate(tenantCmsCollectionValidator)(data)
}
export async function tenantCmsCollectionInsertValidate(
  data: TenantCmsCollectionInsert
) {
  return validate(tenantCmsCollectionInsertValidator)(data)
}
export async function tenantCmsCollectionUpdateValidate(
  data: TenantCmsCollectionUpdate
) {
  return validate(tenantCmsCollectionUpdateValidator)(data)
}
