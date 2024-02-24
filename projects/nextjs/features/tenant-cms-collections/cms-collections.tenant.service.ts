import 'server-only'

import { PostgresDatabase } from '@/database/pg/connection.pg'
import { tenantCmsCollectionDb } from '@/features/tenant-cms-collections/cms-collections.tenant.db'

import { SelectProps, SeverReturnType } from '@/database/pg/types.pg'
import {
  TenantCmsCollection,
  TenantCmsCollectionDocument,
  TenantCmsCollectionInsert,
  TenantCmsCollectionUpdate,
} from '@/features/tenant-cms-collections/cms-collections.tenant.types'
import { errorResponse } from '@/database/utils.db'

export function tenantCmsCollectionsService(db: PostgresDatabase) {
  return (tenantId: number) => {
    const tenantCmsCollections = tenantCmsCollectionDb(db)(tenantId)
    type DBTables = typeof tenantCmsCollections.tables

    return {
      tables: tenantCmsCollections.tables,
      schema: tenantCmsCollections.schema,

      /* Queries */

      select: async (
        props: SelectProps<TenantCmsCollection, DBTables> = {}
      ) => {
        return tenantCmsCollections
          .select(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCmsCollection>
      },

      selectById: (props: SelectProps<TenantCmsCollection, DBTables> = {}) => {
        return tenantCmsCollections
          .selectById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCmsCollection>
      },

      selectDocumentByTitle: (props: {
        id: TenantCmsCollectionDocument['id']
        title: string
        limit?: SelectProps<TenantCmsCollectionDocument, DBTables>['limit']
        groupBy?: SelectProps<TenantCmsCollectionDocument, DBTables>['groupBy']
        orderBy?: SelectProps<TenantCmsCollectionDocument, DBTables>['orderBy']
      }) => {
        return tenantCmsCollections
          .selectDocumentByTitle(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCmsCollection>
      },
      /* Mutations */

      // TODO: also delete users
      deleteById: (props: { id: TenantCmsCollection['id'] }) =>
        tenantCmsCollections
          .deleteById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCmsCollection>,

      insert: (props: {
        data: TenantCmsCollectionInsert
        columns?: SelectProps<TenantCmsCollectionInsert, DBTables>['columns']
      }) =>
        tenantCmsCollections
          .insert(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCmsCollection>,

      update: (props: {
        data: TenantCmsCollectionUpdate
        where?: SelectProps<TenantCmsCollectionUpdate, DBTables>['where']
        columns?: SelectProps<TenantCmsCollectionUpdate, DBTables>['columns']
      }) =>
        tenantCmsCollections
          .update(props)
          .catch(
            errorResponse(422)
          ) as SeverReturnType<TenantCmsCollectionUpdate>,

      updateById: (props: {
        id: TenantCmsCollection['id']
        data: TenantCmsCollectionUpdate
        columns?: SelectProps<TenantCmsCollectionUpdate, DBTables>['columns']
      }) =>
        tenantCmsCollections
          .updateById(props)
          .catch(errorResponse(422)) as SeverReturnType<TenantCmsCollection>,
    }
  }
}
