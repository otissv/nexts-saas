import 'server-only'
import { and, eq } from 'drizzle-orm'

import { PostgresDatabase } from '@/database/pg/connection.pg'
import { cmsCollectionDb } from '@/features/cms/cms.db'

import { SelectProps, SeverReturnType } from '@/database/pg/types.pg'
import {
  CmsCollection,
  CmsCollectionColumn,
  CmsCollectionColumnInsert,
  CmsCollectionColumnUpdate,
  CmsCollectionDocument,
  CmsCollectionInsert,
  CmsCollectionUpdate,
} from '@/features/cms/cms.types'
import { errorResponse } from '@/database/utils.db'

export function cmsCollectionsService(db: PostgresDatabase) {
  return (tenantId: number) => {
    const cmsCollections = cmsCollectionDb(db)(tenantId)
    type DBTables = typeof cmsCollections.tables

    const { schema, tables } = cmsCollections

    return {
      tables,
      schema,

      /* Queries */

      selectCollection: async (
        props: SelectProps<CmsCollection, DBTables> = {}
      ) => {
        return cmsCollections
          .selectCollection({
            ...props,
            orderBy: [['collectionName', 'asc']],
          })
          .catch(errorResponse(422)) as SeverReturnType<CmsCollection>
      },

      selectDocumentsByDatasetId: ({
        datasetId,
        props,
      }: {
        datasetId: CmsCollection['datasetId']
        props?: SelectProps<CmsCollectionDocument, DBTables>
      }) => {
        return cmsCollections
          .selectDocumentsByDatasetId(datasetId, props)
          .catch(errorResponse(422)) as SeverReturnType<CmsCollection>
      },

      selectOneDocumentByTitle: (props: {
        id: CmsCollectionDocument['id']
        title: string
      }) => {
        return cmsCollections
          .selectOneDocumentByTitle(props)
          .catch(errorResponse(422)) as SeverReturnType<CmsCollection>
      },
      /* Mutations */

      // TODO: also delete users
      deleteCollectionById: (props: { id: CmsCollection['id'] }) => {
        return cmsCollections
          .deleteCollectionById(props)
          .catch(errorResponse(422)) as SeverReturnType<CmsCollection>
      },

      insertCollection: (props: {
        userId: CmsCollectionInsert['userId']
        data: CmsCollectionInsert
        columns?: SelectProps<CmsCollectionInsert, DBTables>['columns']
      }) => {
        return cmsCollections
          .insertCollection(props)
          .catch(errorResponse(422)) as SeverReturnType<CmsCollection>
      },

      insertColumn: (props: {
        userId: CmsCollectionColumnInsert['userId']
        data: CmsCollectionColumnInsert
        columns?: SelectProps<CmsCollectionColumnInsert, DBTables>['columns']
      }) => {
        return cmsCollections
          .insertColumn(props)
          .catch(errorResponse(422)) as SeverReturnType<CmsCollection>
      },

      updateCollection: (props: {
        userId: CmsCollection['userId']
        data: CmsCollectionUpdate
        where: SelectProps<CmsCollectionUpdate, DBTables>['where']
        columns?: SelectProps<CmsCollectionUpdate, DBTables>['columns']
      }) => {
        return cmsCollections
          .updateCollection(props)
          .catch(errorResponse(422)) as SeverReturnType<CmsCollectionUpdate>
      },

      updateCollectionById: (props: {
        userId: CmsCollection['userId']
        id: CmsCollection['id']
        data: CmsCollectionUpdate
        columns?: SelectProps<CmsCollectionUpdate, DBTables>['columns']
      }) => {
        return cmsCollections
          .updateCollectionById(props)
          .catch(errorResponse(422)) as SeverReturnType<CmsCollection>
      },

      updateCollectionByDatasetId: ({
        datasetId,
        ...props
      }: {
        userId: CmsCollection['userId']
        datasetId: CmsCollectionColumn['datasetId']
        data: CmsCollectionUpdate
        where: SelectProps<CmsCollectionUpdate, DBTables>['where']
        columns?: SelectProps<CmsCollectionUpdate, DBTables>['columns']
      }) => {
        return cmsCollections
          .updateCollection({
            ...props,
            where: eq(schema.datasetId, datasetId) as any,
          })
          .catch(
            errorResponse(422)
          ) as SeverReturnType<CmsCollectionColumnUpdate>
      },

      UpdateColumnByDatasetId: ({
        datasetId,
        fieldId,
        ...props
      }: {
        userId: CmsCollectionColumn['userId']
        datasetId: CmsCollectionColumn['datasetId']
        fieldId: CmsCollectionColumn['fieldId']
        data: CmsCollectionColumnUpdate
        columns?: SelectProps<CmsCollectionColumnUpdate, DBTables>['columns']
      }) => {
        return cmsCollections
          .UpdateColumnByDatasetId({
            ...props,
            where: and(
              eq(tables.cmsCollectionColumns.datasetId, datasetId),
              eq(tables.cmsCollectionColumns.fieldId, fieldId)
            ) as any,
          })
          .catch(
            errorResponse(422)
          ) as SeverReturnType<CmsCollectionColumnUpdate>
      },
    }
  }
}
