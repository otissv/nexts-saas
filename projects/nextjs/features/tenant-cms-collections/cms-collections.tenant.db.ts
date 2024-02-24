import { and, eq, sql } from 'drizzle-orm'
import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { checkHasTenantId } from '@/lib/utils-server-only'
import { SelectProps, SeverReturnType } from '@/database/pg/types.pg'
import { PostgresDatabase } from '@/database/pg//connection.pg'
import { tenantSchema } from '@/schema/orm/tenant.schema'
import {
  TenantCmsCollection,
  TenantCmsCollectionDocument,
  TenantCmsCollectionInsert,
  TenantCmsCollectionUpdate,
} from '@/features/tenant-cms-collections/cms-collections.tenant.types'
import { buildOrderBy, dbController } from '@/database/pg/db-controller.pg'
import {
  tenantCmsCollectionInsertValidate,
  tenantCmsCollectionUpdateValidate,
} from '@/features/tenant-cms-collections/cms-collections.tenant.validators'
import {
  errorResponse,
  groupByColumns,
  selectColumns,
  serverResponse,
} from '@/database/utils.db'

export function tenantCmsCollectionDb(db: PostgresDatabase) {
  return (tenantId: number) => {
    const tables = tenantSchema(tenantId)
    const tenantCmsCollectionsSchema = tables.cmsCollections

    type Schema = typeof tenantCmsCollectionsSchema
    type DBTables = typeof tables

    const tenantCmsCollectionDocumentsSchema =
      tenantSchema(tenantId).cmsCollectionDocuments

    const tenantCmsCollections = dbController(db)({
      tables,
      schema: tenantCmsCollectionsSchema,
      insertValidate: tenantCmsCollectionInsertValidate,
      updateValidate: tenantCmsCollectionUpdateValidate,
    })

    const maybeTenant = checkHasTenantId(tenantId)

    return {
      tables,
      schema: tenantCmsCollectionsSchema,

      /* Queries */

      select: async (props: SelectProps<any, any> = {}) => {
        const select = selectColumns<Schema, DBTables>({
          tables,
          schema: tenantCmsCollectionsSchema,
          columns: props?.columns as any,
        })

        const groupBy = groupByColumns<Schema, DBTables>({
          schema: tenantCmsCollectionsSchema,
          tables,
          columns: props?.groupBy as any,
        })

        const query = async (props: any) => {
          return (
            db
              .select(select as any)
              .from(tenantCmsCollectionsSchema)
              .leftJoin(
                tenantCmsCollectionDocumentsSchema,
                eq(
                  tenantCmsCollectionsSchema.id,
                  tenantCmsCollectionDocumentsSchema.collectionId
                )
              )
              .limit(props?.limit)
              // .orderBy(sql`${data_item} ->> 'services' DESC`)
              // .orderBy(sql.raw(`data_item ->> 'title' DESC`))
              // .orderBy(desc(data_item['services'], 'desc'))
              .groupBy(...groupBy)
              .then(serverResponse)
          )
        }

        return maybeTenant(query)(props)
      },

      selectById: (props: SelectProps<TenantCmsCollection, DBTables> = {}) => {
        const select = selectColumns<Schema, DBTables>({
          tables,
          schema: tenantCmsCollectionsSchema,
          columns: props?.columns as any,
        })

        const groupBy = groupByColumns<Schema, DBTables>({
          schema: tenantCmsCollectionsSchema,
          tables,
          columns: props?.groupBy as any,
        })

        const query = async (props: any) => {
          const data_item =
            sql`jsonb_array_elements(${tenantCmsCollectionDocumentsSchema.data})`.as(
              'data_item'
            )

          const orderBy = buildOrderBy(
            tenantCmsCollectionDocumentsSchema,
            props?.orderBy
          )

          const sq = db.$with('sq').as(
            db
              .select({
                id: tenantCmsCollectionDocumentsSchema.id,
                collectionId: tenantCmsCollectionDocumentsSchema.collectionId,
                displayName: tenantCmsCollectionsSchema.displayName,
                datasetId: tenantCmsCollectionsSchema.datasetId,
                type: tenantCmsCollectionsSchema.type,
                columns: tenantCmsCollectionsSchema.columns,
                columnFilters: tenantCmsCollectionsSchema.columnFilters,
                columnOrder: tenantCmsCollectionsSchema.columnOrder,
                columnSort: tenantCmsCollectionsSchema.columnSort,
                columnVisibility: tenantCmsCollectionsSchema.columnVisibility,
                data_item,
                createdAt: tenantCmsCollectionDocumentsSchema.createdAt,
                updatedAt: tenantCmsCollectionDocumentsSchema.updatedAt,
              })
              .from(tenantCmsCollectionDocumentsSchema)
              .leftJoin(
                tenantCmsCollectionsSchema,
                eq(
                  tenantCmsCollectionsSchema.id,
                  tenantCmsCollectionDocumentsSchema.collectionId
                )
              )
              .where(props?.where)
          )

          return (
            db
              .with(sq)
              .select({
                id: sq.id,
                collectionId: sq.collectionId,
                displayName: sq.displayName,
                datasetId: sq.datasetId,
                type: sq.type,
                columns: sq.columns,
                columnFilters: sq.columnFilters,
                columnOrder: sq.columnOrder,
                columnSort: sq.columnSort,
                columnVisibility: sq.columnVisibility,
                data: sq.data_item,
                createdAt: sq.createdAt,
                updatedAt: sq.updatedAt,
                ...select,
              })
              .from(sq)
              .groupBy(...groupBy)
              .limit(props?.limit)
              // .orderBy(sql`${data_item} ->> 'services' DESC`)
              // .orderBy(sql.raw(`data_item ->> 'title' DESC`))
              // .orderBy(desc(data_item['services'], 'desc'))
              .then((res) => {
                return [
                  res.reduce(
                    (acc, doc) => {
                      return {
                        ...doc,
                        data: [...acc.data, doc.data],
                      }
                    },
                    {
                      columns: [],
                      data: [],
                    }
                  ),
                ]
              })
              .then(serverResponse)
              .catch(errorResponse(422)) as SeverReturnType<TenantCmsCollection>
          )
        }

        return maybeTenant(query)(props)
      },

      selectDocumentByTitle: (props: {
        id: TenantCmsCollectionDocument['id']
        title: string
        limit?: SelectProps<TenantCmsCollectionDocument, DBTables>['limit']
        groupBy?: SelectProps<TenantCmsCollectionDocument, DBTables>['groupBy']
        orderBy?: SelectProps<TenantCmsCollectionDocument, DBTables>['orderBy']
      }) => {
        const groupBy = groupByColumns<Schema, DBTables>({
          schema: tenantCmsCollectionsSchema,
          tables,
          columns: props?.groupBy as any,
        })

        const orderBy = buildOrderBy(
          tenantCmsCollectionDocumentsSchema,
          props?.orderBy
        )

        // inArray(table.column, query)
        const query = async (props: any) => {
          //TODO: Fix use unwind to filter

          return db
            .select({
              id: tenantCmsCollectionsSchema.id,
              columns: tenantCmsCollectionsSchema.columns,
              data: tenantCmsCollectionDocumentsSchema.data,
              createdAt: tenantCmsCollectionDocumentsSchema.createdAt,
              updatedAt: tenantCmsCollectionDocumentsSchema.updatedAt,
            })
            .from(tenantCmsCollectionsSchema)
            .leftJoin(
              tenantCmsCollectionDocumentsSchema,
              eq(
                tenantCmsCollectionsSchema.id,
                tenantCmsCollectionDocumentsSchema.collectionId
              )
            )
            .where(
              and(
                sql`${tenantCmsCollectionDocumentsSchema.data} @> ${db.json([
                  { title: props.title },
                ])}`
              )
            )
            .limit(props.select?.limit)
            .orderBy(...orderBy)
            .groupBy(...groupBy)
            .then((res = []) => {
              return [
                {
                  ...res[0],
                  data:
                    res?.[0]?.data?.filter(
                      (d: any) => d.title === props.title
                    ) || [],
                },
              ]
            })
            .then(serverResponse)
            .catch(errorResponse(422)) as SeverReturnType<TenantCmsCollection>
        }

        return maybeTenant(query)(props)
      },

      /* Mutations */

      deleteById: (props: { id: TenantCmsCollection['id'] }) =>
        maybeTenant(tenantCmsCollections.deleteById)(props),

      insert: (props: {
        data: TenantCmsCollectionInsert
        columns?: SelectProps<TenantCmsCollectionInsert, DBTables>['columns']
      }) => maybeTenant(tenantCmsCollections.insert)(props),

      update: (props: {
        data: TenantCmsCollectionUpdate
        where?: SelectProps<TenantCmsCollectionUpdate, DBTables>['where']
        columns?: SelectProps<TenantCmsCollectionUpdate, DBTables>['columns']
      }) => maybeTenant(tenantCmsCollections.update)(props),

      updateById: (props: {
        id: TenantCmsCollection['id']
        data: TenantCmsCollectionUpdate
        columns?: SelectProps<TenantCmsCollectionUpdate, DBTables>['columns']
      }) =>
        maybeTenant(tenantCmsCollections.updateById)(props).catch(
          errorResponse(422)
        ) as SeverReturnType<TenantCmsCollection>,
    }
  }
}
