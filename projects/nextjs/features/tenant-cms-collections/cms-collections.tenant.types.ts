import { z } from 'zod'
import {
  tenantCmsCollectionColumnValidator,
  tenantCmsCollectionDocumentInsertValidator,
  tenantCmsCollectionDocumentUpdateValidator,
  tenantCmsCollectionDocumentValidator,
  tenantCmsCollectionInsertValidator,
  tenantCmsCollectionUpdateValidator,
  tenantCmsCollectionValidator,
} from './cms-collections.tenant.validators'

export type TenantCmsCollectionColumn = z.infer<
  typeof tenantCmsCollectionColumnValidator
>

/** Tenant Cms Collection **/
export type TenantCmsCollection = z.infer<typeof tenantCmsCollectionValidator>
export type TenantCmsCollectionInsert = z.infer<
  typeof tenantCmsCollectionInsertValidator
>
export type TenantCmsCollectionUpdate = z.infer<
  typeof tenantCmsCollectionUpdateValidator
>

/** Tenant Cms Collection Document **/
export type TenantCmsCollectionDocument = z.infer<
  typeof tenantCmsCollectionDocumentValidator
>
export type TenantCmsCollectionDocumentInsert = z.infer<
  typeof tenantCmsCollectionDocumentInsertValidator
>
export type TenantCmsCollectionDocumentUpdate = z.infer<
  typeof tenantCmsCollectionDocumentUpdateValidator
>
