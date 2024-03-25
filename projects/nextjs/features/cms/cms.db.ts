import { and, eq, sql } from 'drizzle-orm'

import {
  checkHasTenantId,
  maybeDeleteMutation,
  maybeInsertMutation,
  maybeUpdateMutation,
} from '@/lib/utils-server-only'
import { SelectProps, SeverReturnType } from '@/database/pg/types.pg'
import { PostgresDatabase } from '@/database/pg//connection.pg'
import { tenantSchema } from '@/schema/orm/tenant.schema'
import {
  CmsCollection,
  CmsCollectionColumn,
  CmsCollectionColumnInsert,
  CmsCollectionColumnUpdate,
  CmsCollectionDocument,
  CmsCollectionInsert,
  CmsCollectionUpdate,
} from '@/features/cms/cms.types'
import {
  buildQueryProps,
  dbController,
  getTotalPages,
} from '@/database/pg/db-controller.pg'
import {
  cmsCollectionColumnInsertValidate,
  cmsCollectionColumnUpdateValidate,
  cmsCollectionInsertValidate,
  cmsCollectionUpdateValidate,
} from '@/features/cms/cms.validators'
import {
  errorResponse,
  selectColumns,
  serverResponse,
} from '@/database/utils.db'

export function maybeQuery(tenantId: number) {
  return checkHasTenantId(tenantId)
}

export function cmsCollectionDb(db: PostgresDatabase) {
  return (tenantId: number) => {
    const tables = tenantSchema(tenantId)
    const schema = tables.cmsCollections

    type Schema = typeof schema
    type DBTables = typeof tables

    const cmsCollections = dbController(db)({
      tables,
      schema,
      insertValidate: cmsCollectionInsertValidate,
      updateValidate: cmsCollectionUpdateValidate,
    })

    const cmsCollectionColumns = dbController(db)({
      tables,
      schema: tables.cmsCollectionColumns,
      insertValidate: cmsCollectionColumnInsertValidate,
      updateValidate: cmsCollectionColumnUpdateValidate,
    })

    const maybeTenantQuery = maybeQuery(tenantId)
    const maybeTenantDeleteMutation = maybeDeleteMutation(tenantId)
    const maybeTenantInsertMutation = maybeInsertMutation(tenantId)
    const maybeTenantUpdateMutation = maybeUpdateMutation(tenantId)

    return {
      tables,
      schema,

      /* Queries */

      selectCollection: async (
        props: SelectProps<CmsCollection, DBTables> = {}
      ) => {
        const query = async (props: any) => {
          const total = await db
            .select({
              count: sql<number>`count(${(schema as any).id})`,
            })
            .from(schema)
            .where(props?.where)

          return buildQueryProps({
            db,
            schema,
            tables,
            ...props,
          }).then(async ({ select, where, limit, orderBy, groupBy }) => {
            return db
              .select(select as any)
              .from(schema)
              .where(where)
              .leftJoin(
                tables.cmsCollectionDocuments,
                eq(schema.datasetId, tables.cmsCollectionDocuments.datasetId)
              )
              .limit(limit)
              .orderBy(...orderBy)
              .groupBy(...groupBy)
              .then(serverResponse)
              .then((res) => ({
                ...res,
                totalPages: total[0]?.count ?? 0,
              }))
          })
        }

        return maybeTenantQuery(query)(props)
      },

      selectDocumentsByDatasetId: (
        datasetId: CmsCollection['datasetId'],
        props: SelectProps<
          Omit<CmsCollectionDocument, 'columns'>,
          DBTables
        > = {}
      ) => {
        const select = selectColumns<Schema, DBTables>({
          tables,
          schema,
          columns: props?.columns as any,
        })

        const query = async (props: any) => {
          return buildQueryProps({
            db,
            schema,
            tables,
            ...props,
          }).then(async ({ limit, groupBy }) => {
            const data =
              sql`jsonb_array_elements(${tables.cmsCollectionDocuments.data})`.as(
                'data_item'
              )

            const columns = await db
              .select()
              .from(tables.cmsCollectionColumns)
              .where(eq(tables.cmsCollectionColumns.datasetId, datasetId))

            const documents = await db
              .select({
                id: tables.cmsCollectionDocuments.id,
                data,
                createdAt: tables.cmsCollectionDocuments.createdAt,
                createdBy: tables.cmsCollectionDocuments.createdBy,
                updatedAt: tables.cmsCollectionDocuments.updatedAt,
                updatedBy: tables.cmsCollectionDocuments.updatedBy,
                totalPages:
                  sql`jsonb_array_length(${tables.cmsCollectionDocuments.data})`.as(
                    'totalPages'
                  ),
              })
              .from(tables.cmsCollectionDocuments)

              .where(eq(tables.cmsCollectionDocuments.datasetId, datasetId))
              .limit(limit)

            // const documentsSq = db.$with('sq').as(
            //   db
            //     .select({
            //       // id: tables.cmsCollectionDocuments.id,
            //       collectionName: schema.collectionName,
            //       datasetId: schema.datasetId,
            //       type: schema.type,
            //       columnOrder: schema.columnOrder,
            //       // data,
            //       // createdAt: tables.cmsCollectionDocuments.createdAt,
            //       // createdBy: tables.cmsCollectionDocuments.createdBy,
            //       // updatedAt: tables.cmsCollectionDocuments.updatedAt,
            //       // updatedBy: tables.cmsCollectionDocuments.updatedBy,
            //       // totalPages:
            //       //   sql`jsonb_array_length(${tables.cmsCollectionDocuments.data})`.as(
            //       //     'totalPages'
            //       //   ),
            //     })
            //     .from(schema)
            //     .leftJoin(
            //       tables.cmsCollectionDocuments,
            //       eq(tables.cmsCollectionDocuments.datasetId, datasetId)
            //     )
            //     .where(eq(schema.datasetId, datasetId))
            //     .limit(limit)
            // )

            const totalPages = await db
              .select({
                count: sql<number>`jsonb_array_length(${tables.cmsCollectionDocuments.data})`,
              })
              .from(schema)
              .leftJoin(
                tables.cmsCollectionDocuments,
                eq(schema.datasetId, tables.cmsCollectionDocuments.datasetId)
              )
              .where(eq(schema.datasetId, datasetId))

            return db
              .select({
                collectionName: schema.collectionName,
                datasetId: schema.datasetId,
                type: schema.type,
                columnOrder: schema.columnOrder,
              })
              .from(schema)
              .where(eq(schema.datasetId, datasetId))
              .limit(limit)
              .then((res) => {
                return [
                  {
                    ...res[0],
                    datasetId,
                    columns,
                    data: documents.reduce(
                      (acc: Record<string, any[]>[], { data, ...doc }) => [
                        ...acc,
                        { ...doc, ...(data as any) },
                      ],
                      []
                    ),
                  },
                ]
              })
              .then(serverResponse)
              .then(getTotalPages(totalPages))
              .catch(
                errorResponse(422)
              ) as SeverReturnType<CmsCollectionDocument>

            // return (
            //   db
            //     .with(documentsSq)
            //     .select(select as any)
            //     .from(documentsSq)
            //     .groupBy(...groupBy)
            //     // .orderBy(sql`${data_item} ->> 'services' DESC`)
            //     // .orderBy(sql.raw(`data_item ->> 'title' DESC`))
            //     // .orderBy(desc(data_item['services'], 'desc'))
            //     .then((res) => {
            //       console.log('========res: ', res)
            //       // return [
            //       //   res.reduce(
            //       //     (acc, doc) => {
            //       //       return {
            //       //         ...doc,
            //       //         columns,
            //       //         data: [...acc.data, doc.data],
            //       //       }
            //       //     },
            //       //     { columns, data: [] }
            //       //   ),
            //       // ]
            //     })
            //     .then(serverResponse)

            //     .then(getTotalPages(totalPages))
            //     .catch(
            //       errorResponse(422)
            //     ) as SeverReturnType<CmsCollectionDocument>
            // )
          })
        }

        return maybeTenantQuery(query)(props)
      },

      selectOneDocumentByTitle: (props: {
        id: CmsCollectionDocument['id']
        title: string
        limit?: SelectProps<CmsCollectionDocument, DBTables>['limit']
        groupBy?: SelectProps<CmsCollectionDocument, DBTables>['groupBy']
        orderBy?: SelectProps<CmsCollectionDocument, DBTables>['orderBy']
      }) => {
        // inArray(table.column, query)
        const query = async (props: any) => {
          //TODO: Fix use unwind to filter

          return (
            db
              .select({
                id: schema.id,
                type: schema.type,
                data: tables.cmsCollectionDocuments.data,
                createdAt: tables.cmsCollectionDocuments.createdAt,
                updatedAt: tables.cmsCollectionDocuments.updatedAt,
              })
              .from(schema)
              .leftJoin(
                tables.cmsCollectionDocuments,
                eq(schema.datasetId, tables.cmsCollectionDocuments.datasetId)
              )
              //TODO: join collection column
              .where(
                and(
                  sql`${tables.cmsCollectionDocuments.data} @> ${db.json([
                    { title: props.title },
                  ])}`
                )
              )
              .limit(1)
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
              .catch(errorResponse(422)) as SeverReturnType<CmsCollection>
          )
        }

        return maybeTenantQuery(query)(props)
      },

      /* Mutations */

      deleteCollectionById: (props: { id: CmsCollection['id'] }) => {
        return maybeTenantDeleteMutation(cmsCollections.deleteById)(props)
      },

      insertCollection: ({
        userId,
        ...props
      }: {
        userId: CmsCollectionColumn['userId']
        data: CmsCollectionInsert
        columns?: SelectProps<CmsCollectionInsert, DBTables>['columns']
      }) => {
        return maybeTenantInsertMutation(userId)(cmsCollections.insert)(props)
      },

      insertColumn: ({
        userId,
        ...props
      }: {
        userId: CmsCollectionColumn['userId']
        data: CmsCollectionColumnInsert
        columns?: SelectProps<CmsCollectionColumnInsert, DBTables>['columns']
      }) => {
        return maybeTenantInsertMutation(userId)(cmsCollectionColumns.insert)(
          props
        )
      },

      updateCollection: ({
        userId,
        ...props
      }: {
        userId: CmsCollection['userId']
        data: CmsCollectionUpdate
        where: SelectProps<CmsCollectionUpdate, DBTables>['where']
        columns?: SelectProps<CmsCollectionUpdate, DBTables>['columns']
      }) => {
        return maybeTenantUpdateMutation(userId)(cmsCollections.update)(props)
      },

      updateCollectionById: ({
        userId,
        ...props
      }: {
        userId: CmsCollection['userId']
        id: CmsCollection['id']
        data: CmsCollectionUpdate
        columns?: SelectProps<CmsCollectionUpdate, DBTables>['columns']
      }) => {
        return maybeTenantUpdateMutation(userId)(cmsCollections.updateById)(
          props
        )
      },

      UpdateColumnByDatasetId: async ({
        userId,
        data,
        ...props
      }: {
        userId: CmsCollectionColumn['userId']
        data: CmsCollectionColumnUpdate
        columns?: SelectProps<CmsCollectionColumnUpdate, DBTables>['columns']
        where: SelectProps<CmsCollectionUpdate, DBTables>['where']
      }) => {
        return maybeTenantUpdateMutation(userId)(cmsCollectionColumns.update)({
          ...props,
          data: {
            ...data,
            ...((data.fieldOptions
              ? { fieldOptions: [data.fieldOptions] }
              : {}) as any),
            ...(data.filter ? { fieldOptions: [data.filter] } : {}),
          },
        })
      },
    }
  }
}
