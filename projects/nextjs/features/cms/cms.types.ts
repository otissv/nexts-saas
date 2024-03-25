import { z } from 'zod'
import {
  cmsCollectionColumnInsertValidator,
  cmsCollectionColumnUpdateValidator,
  cmsCollectionColumnValidator,
  cmsCollectionDocumentInsertValidator,
  cmsCollectionDocumentUpdateValidator,
  cmsCollectionDocumentValidator,
  cmsCollectionInsertValidator,
  cmsCollectionUpdateValidator,
  cmsCollectionValidator,
} from '@/features/cms/cms.validators'

/** Tenant Cms Collection **/
export type CmsCollection = z.infer<typeof cmsCollectionValidator>
export type CmsCollectionInsert = z.infer<typeof cmsCollectionInsertValidator>
export type CmsCollectionUpdate = z.infer<typeof cmsCollectionUpdateValidator>

/** Tenant Cms Collection Document **/
export type CmsCollectionDocument = z.infer<
  typeof cmsCollectionDocumentValidator
>
export type CmsCollectionDocumentInsert = z.infer<
  typeof cmsCollectionDocumentInsertValidator
>
export type CmsCollectionDocumentUpdate = z.infer<
  typeof cmsCollectionDocumentUpdateValidator
>

/** Tenant Cms Collection Column **/
export type CmsCollectionColumn = z.infer<typeof cmsCollectionColumnValidator>
export type CmsCollectionColumnInsert = z.infer<
  typeof cmsCollectionColumnInsertValidator
>
export type CmsCollectionColumnUpdate = z.infer<
  typeof cmsCollectionColumnUpdateValidator
>

export type CmsStateInsert = {
  fieldId: CmsCollectionColumn['fieldId']
  columnName: CmsCollectionColumn['columnName']
  type: CmsCollectionColumn['type']
  fieldOptions?: CmsCollectionColumn['fieldOptions']
  help?: CmsCollectionColumn['help']
  enableDelete?: CmsCollectionColumn['enableDelete']
  enableSort?: CmsCollectionColumn['enableSort']
  enableHide?: CmsCollectionColumn['enableHide']
  enableFilter?: CmsCollectionColumn['enableFilter']
  filter?: CmsCollectionColumn['filter']
  sortBy?: CmsCollectionColumn['sortBy']
  visibility?: CmsCollectionColumn['visibility']
  index?: CmsCollectionColumn['index']
}

export type CmsStateUpdateCollection = {
  collectionName?: CmsCollection['collectionName']
  type?: CmsCollection['type']
  data?: CmsCollection['data']
  columnOrder?: CmsCollection['columnOrder']
}

export type CmsStateUpdateColumn = {
  fieldId: CmsCollectionColumn['fieldId']
  columnName?: CmsCollectionColumn['columnName']
  type?: CmsCollectionColumn['type']
  fieldOptions?: CmsCollectionColumn['fieldOptions']
  help?: CmsCollectionColumn['help']
  enableDelete?: CmsCollectionColumn['enableDelete']
  enableSort?: CmsCollectionColumn['enableSort']
  enableHide?: CmsCollectionColumn['enableHide']
  enableFilter?: CmsCollectionColumn['enableFilter']
  filter?: CmsCollectionColumn['filter']
  sortBy?: CmsCollectionColumn['sortBy']
  visibility?: CmsCollectionColumn['visibility']
  index?: CmsCollectionColumn['index']
}

export type CmsStateUpdate = CmsStateUpdateCollection | CmsStateUpdateColumn
