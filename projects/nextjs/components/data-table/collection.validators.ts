import { z } from 'zod'

import { validate } from '@/lib/validate'
import {
  CmsCollection,
  CmsCollectionColumn,
  CmsCollectionInsert,
  CmsCollectionUpdate,
} from '@/components/data-table/collection.types'

export const cmsCollectionDocumentValidator = z.object({
  id: z.number().int().positive(),
  collectionId: z.number().int().positive(),
  data: z.array(z.record(z.string(), z.string())).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const cmsCollectionColumnDefaultValidator = z.object({
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

export const cmsCollectionColumnValidator = z.union([
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
      })
      .optional(),
  }),
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
      })
      .optional(),
  }),
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
      })
      .optional(),
  }),
])

export const cmsCollectionValidator = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  displayName: z.string().min(1).max(256),
  datasetId: z.string().min(1).max(50),
  type: z.enum(['multiple', 'single']),
  columns: z.array(cmsCollectionColumnValidator),
  columnOrder: z.array(z.string()).optional(),
  sortColumnsBy: z
    .array(
      z.union([
        z.object({ id: z.string(), asc: z.boolean() }),
        z.object({ id: z.string(), desc: z.boolean() }),
      ])
    )
    .optional(),
  visibleColumns: z.array(z.record(z.string(), z.boolean()).optional()),
  data: z.array(cmsCollectionDocumentValidator.optional()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const cmsCollectionInsertValidator = cmsCollectionValidator.omit({
  id: true,
})

export const cmsCollectionUpdateValidator = cmsCollectionDocumentValidator
  .omit({
    id: true,
  })
  .partial()

export async function cmsCollectionColumnValidate(data: CmsCollectionColumn) {
  return validate(cmsCollectionColumnValidator)(data)
}

export async function cmsCollectionValidate(data: CmsCollection) {
  return validate(cmsCollectionValidator)(data)
}

export async function cmsCollectionInsertValidate(data: CmsCollectionInsert) {
  return validate(cmsCollectionInsertValidator)(data)
}

export async function cmsCollectionUpdateValidate(data: CmsCollectionUpdate) {
  return validate(cmsCollectionUpdateValidator)(data)
}
