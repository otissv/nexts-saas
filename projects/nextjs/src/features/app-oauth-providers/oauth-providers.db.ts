import { eq, ExtractTablesWithRelations } from 'drizzle-orm'
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import { PgTransaction } from 'drizzle-orm/pg-core'

import {
  oauthProviders as oauthProvidersSchema,
  users as usersSchema,
  tenants as tenantsSchema,
  TenantSchema,
} from '@/schema/app.schema'
import {
  OauthProvider,
  OauthProviderSignup,
  OauthProviderInsert,
} from './oauth-providers.types'
import { ErrorResponse, SelectProps, SuccessResponse } from '@/types'
import { PostgresDatabase } from '@/database/connection'
import { serverResponse, errorResponse } from '@/lib/utils-server-only'
import { tenantsSql } from '@/schema/tenant.sql'
import { dbController } from '@/database/db.module'
import {
  oauthProviderSignupValidate,
  oauthProviderInsertValidate,
} from '@/features/app-oauth-providers/oauth-providers.validators'

export function oauthProvidersDb(db: PostgresDatabase) {
  const oauthProviders = dbController(db)({
    schema: oauthProvidersSchema,
    insertValidate: oauthProviderSignupValidate,
    updateValidate: oauthProviderInsertValidate,
  })

  return {
    schema: oauthProvidersSchema,

    /* Queries */
    select: oauthProviders.select,

    /* Mutations */

    signup: ({ data }: { data: OauthProviderSignup }) => {
      db.transaction((tx) =>
        selectProviderTransaction(tx)(data)
          .then(insertUserTransaction(tx))
          .then(insertProviderTransaction(tx))
          .then((result) => insertTenant(tx)(result).then(createTenantDb(tx)))
          .catch((error: Error) => {
            tx.rollback()
            return errorResponse(422)(error)
          })
      ).catch(errorResponse(422))
    },

    delete: ({
      where,
    }: {
      where?: SelectProps<OauthProvider>['where']
    } = {}) => {
      // TODO: delete user and tenant via transaction
      return db
        .delete(oauthProvidersSchema)
        .where(where as any)
        .returning()
        .then(serverResponse)
        .catch(errorResponse(422)) as Promise<
        SuccessResponse<Partial<OauthProvider>> | ErrorResponse
      >
    },
  }
}

function selectProviderTransaction(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return (data: OauthProviderSignup) =>
    tx
      .select({
        providerId: oauthProvidersSchema.providerId,
      })
      .from(oauthProvidersSchema)
      .where(eq(oauthProvidersSchema.providerId, data.provider.providerId))
      .then((result) => {
        if (result.length) {
          throw new Error('Provider already exists')
        }

        return data
      })
      .catch((error) => {
        console.error(error)
        return error
      })
}

function insertUserTransaction(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  //TODO: if email already exists, use that user

  return ({ user, provider }: OauthProviderSignup) =>
    tx
      .insert(usersSchema)
      .values(user)
      .returning({
        id: usersSchema.id,
      })
      .then((result) => ({
        userId: result[0].id,
        ...provider,
      }))
      .catch((error) => {
        console.error(error)
        return error
      })
}
function insertProviderTransaction(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return (data: OauthProviderInsert) =>
    tx
      .insert(oauthProvidersSchema)
      .values(data)
      .returning({
        userId: oauthProvidersSchema.userId,
        provider: oauthProvidersSchema.provider,
        providerId: oauthProvidersSchema.providerId,
      })
      .catch((error) => {
        console.log(error)
        return error
      })
}

function insertTenant(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return (data: OauthProvider[]) =>
    tx
      .insert(tenantsSchema)
      .values({ ownerId: data[0].userId })
      .returning({ id: tenantsSchema.id })
      .catch((error) => {
        console.error(error)
        return error
      })
}

function createTenantDb(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return (data: { id: TenantSchema['id'] }[]) =>
    tx.execute(tenantsSql(`t_${data[0].id}`)).catch((error) => {
      console.error(error)
      return error
    })
}
