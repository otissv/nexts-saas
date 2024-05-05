import { z } from 'zod'

import { validate } from '@/lib/validate'
import {
  CmsCollection,
  CmsCollectionColumn,
  CmsCollectionColumnInsert,
  CmsCollectionColumnUpdate,
  CmsCollectionDocument,
  CmsCollectionDocumentInsert,
  CmsCollectionDocumentUpdate,
  CmsCollectionInsert,
  CmsCollectionUpdate,
} from '@/features/cms/cms.types'
import { cmsColumnTypes } from '@/features/cms/cms-column-types'

/** Tenant Cms Collection Column **/
export const cmsCollectionColumnDefaultValidator = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  columnName: z.string().min(1).max(100),
  datasetId: z.string().min(1).max(50),
  fieldId: z.string().min(1).max(15),
  type: z.enum(cmsColumnTypes),
  fieldOptions: z.record(z.string(), z.any()).optional(),
  validation: z.record(z.string(), z.any()).optional(),
  help: z.string().optional(),
  enableDelete: z.boolean().optional(),
  enableSort: z.boolean().optional(),
  enableHide: z.boolean().optional(),
  enableFilter: z.boolean().optional(),
  filter: z.union([z.string(), z.number(), z.boolean()]).optional(),
  sortBy: z.enum(['asc', 'desc']).optional().default('asc').optional(),
  visibility: z.boolean().optional().default(true).optional(),
  index: z
    .object({
      direction: z.enum(['asc', 'desc']),
      nulls: z.enum(['first', 'last']),
    })
    .optional(),
  createdAt: z.coerce.date(),
  createdBy: z.number().int().positive(),
  updatedAt: z.coerce.date(),
  updatedBy: z.number().int().positive(),
})

export const cmsCollectionRequiredColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
      })
      .optional(),
  })
export const cmsCollectionEmailColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
        disallowCharacters: z.string().optional(),
      })
      .optional(),
  })
export const cmsCollectionTextColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
        disallowCharacters: z.string().optional(),
      })
      .optional(),
  })
export const cmsCollectionNumberColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
      })
      .optional(),
  })
export const cmsCollectionFileColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        size: z.number().optional(),
      })
      .optional(),
  })
export const cmsCollectionFilesColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        size: z.number(),
        minItems: z.number().optional(),
        maxItems: z.number().optional(),
      })
      .optional(),
  })
export const cmsCollectionDateColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        before: z.coerce.date().optional(),
        after: z.coerce.date().optional(),
        start: z.coerce.date().optional(),
        end: z.coerce.date().optional(),
      })
      .optional(),
  })
export const cmsCollectionTimeColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        start: z.coerce.date().optional(),
        end: z.coerce.date().optional(),
      })
      .optional(),
  })
export const cmsCollectionTagsColumnValidator =
  cmsCollectionColumnDefaultValidator.extend({
    validation: z
      .object({
        required: z.boolean().optional(),
        minItems: z.number().optional(),
        maxItems: z.number().optional(),
        minLength: z.number().optional(),
        maxLength: z.number().optional(),
        disallowCharacters: z.string().optional(),
      })
      .optional(),
  })

export const cmsCollectionColumnValidator = z.union([
  cmsCollectionRequiredColumnValidator,
  cmsCollectionTextColumnValidator,
  cmsCollectionNumberColumnValidator,
  cmsCollectionFileColumnValidator,
  cmsCollectionFilesColumnValidator,
  cmsCollectionDateColumnValidator,
  cmsCollectionTimeColumnValidator,
  cmsCollectionTagsColumnValidator,
])
export const cmsCollectionColumnInsertValidator = z.union([
  cmsCollectionRequiredColumnValidator.omit({
    id: true,
    fieldId: true,
  }),
  cmsCollectionTextColumnValidator.omit({
    id: true,
    fieldId: true,
  }),
  cmsCollectionNumberColumnValidator.omit({
    id: true,
    fieldId: true,
  }),
])
export const cmsCollectionColumnUpdateValidator = z.union([
  cmsCollectionRequiredColumnValidator
    .omit({
      id: true,
      fieldId: true,
      updatedAt: true,
      updatedBy: true,
    })
    .partial(),
  cmsCollectionTextColumnValidator
    .omit({
      id: true,
      fieldId: true,
      updatedAt: true,
      updatedBy: true,
    })
    .partial(),
  cmsCollectionNumberColumnValidator
    .omit({
      id: true,
      fieldId: true,
      createdAt: true,
      updatedAt: true,
      updatedBy: true,
    })
    .partial(),
])

export async function cmsCollectionColumnValidate(data: CmsCollectionColumn) {
  return validate(cmsCollectionColumnValidator)(data)
}
export async function cmsCollectionColumnInsertValidate(
  data: CmsCollectionColumnInsert
) {
  return validate(cmsCollectionColumnInsertValidator)(data)
}
export async function cmsCollectionColumnUpdateValidate(
  data: CmsCollectionColumnUpdate
) {
  return validate(cmsCollectionColumnUpdateValidator)(data)
}

/** Tenant Cms Collection Document **/
export const cmsCollectionDocumentValidator = z.object({
  id: z.number().int().positive(),
  collectionName: z.string().min(1).max(100),
  datasetId: z.string().min(1).max(50),
  userId: z.number().int().positive(),
  data: z.array(z.record(z.string(), z.string())).optional(),
  createdAt: z.coerce.date(),
  createdBy: z.number().int().positive(),
  updatedAt: z.coerce.date(),
  updatedBy: z.number().int().positive(),
})

export const cmsCollectionDocumentInsertValidator =
  cmsCollectionDocumentValidator.omit({
    id: true,
  })

export const cmsCollectionDocumentUpdateValidator =
  cmsCollectionDocumentValidator
    .omit({
      id: true,
      updatedAt: true,
      updatedBy: true,
    })
    .partial()

export async function cmsCollectionDocumentValidate(
  data: CmsCollectionDocument
) {
  return validate(cmsCollectionDocumentValidator)(data)
}
export async function cmsCollectionDocumentInsertValidate(
  data: CmsCollectionDocumentInsert
) {
  return validate(cmsCollectionInsertValidator)(data)
}
export async function cmsCollectionDocumentUpdateValidate(
  data: CmsCollectionDocumentUpdate
) {
  return validate(cmsCollectionUpdateValidator)(data)
}

/** Tenant Cms Collection **/

export const cmsCollectionValidator = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  collectionName: z.string().min(1).max(100),
  datasetId: z.string().min(1).max(50),
  type: z.enum(['multiple', 'single']),
  data: z.array(cmsCollectionDocumentValidator).optional(),
  columns: z.array(cmsCollectionColumnValidator).optional(),
  columnOrder: z.array(z.string()).default([]).optional(),
  createdAt: z.coerce.date(),
  createdBy: z.number().int().positive(),
  updatedAt: z.coerce.date(),
  updatedBy: z.number().int().positive(),
})
export const cmsCollectionInsertValidator = cmsCollectionValidator.omit({
  id: true,
})
export const cmsCollectionUpdateValidator = cmsCollectionValidator
  .omit({
    id: true,
    updatedAt: true,
    updatedBy: true,
  })
  .partial()

export async function cmsCollectionValidate(data: CmsCollection) {
  return validate(cmsCollectionValidator)(data)
}
export async function cmsCollectionInsertValidate(data: CmsCollectionInsert) {
  return validate(cmsCollectionInsertValidator)(data)
}
export async function cmsCollectionUpdateValidate(data: CmsCollectionUpdate) {
  return validate(cmsCollectionUpdateValidator)(data)
}
