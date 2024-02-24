import { z } from 'zod'
import {
  cmsCollectionColumnValidator,
  cmsCollectionInsertValidator,
  cmsCollectionUpdateValidator,
  cmsCollectionValidator,
  cmsCollectionDocumentValidator,
} from '@/components/data-table/collection.validators'

export type CmsCollectionColumn = z.infer<typeof cmsCollectionColumnValidator>
export type CmsCollection = z.infer<typeof cmsCollectionValidator>
export type CmsCollectionInsert = z.infer<typeof cmsCollectionInsertValidator>
export type CmsCollectionUpdate = z.infer<typeof cmsCollectionUpdateValidator>

export type CmsCollectionDocument = z.infer<
  typeof cmsCollectionDocumentValidator
>
