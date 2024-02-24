import { eq, ExtractTablesWithRelations } from 'drizzle-orm'
import { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'
import { PgTransaction } from 'drizzle-orm/pg-core'

import {
  oauthProviders as oauthProvidersSchema,
  users as usersSchema,
  tenants as tenantsSchema,
} from '@/schema/orm/app.schema'
import { OauthProvider, OauthProviderSignup } from './oauth-providers.types'
import {
  ErrorResponse,
  SelectProps,
  SuccessResponse,
} from '@/database/pg/types.pg'
import { PostgresDatabase } from '@/database/pg/connection.pg'
import { tenantsSql } from '@/schema/sql/tenant.sql'
import { dbController } from '@/database/pg/db-controller.pg'
import {
  oauthProviderSignupValidate,
  oauthProviderInsertValidate,
} from '@/features/app-oauth-providers/oauth-providers.validators'
import { errorResponse, serverResponse } from '@/database/utils.db'
import { isDev } from 'c-ufunc/libs/isDev'

type TenantId = number | null
type Provider = OauthProviderSignup['provider']
type ProviderUser = OauthProviderSignup['user']
type OauthId = number | null
type UserId = number | null

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
      db.transaction((tx) => {
        return selectTenantIdFromOauthProviderTransaction(tx)(data)
          .then(insertTenant(tx))
          .then(insertOauthProviderTransaction(tx))
          .then(findUserByEmailTransaction(tx))
          .then(insertUserTransaction(tx))
          .then(createTenantDb(tx))
          .catch((error: Error) => {
            isDev() && console.error('Oauth signup:', error)

            // remove cookie
            tx.rollback()
            return errorResponse(422)(error)
          })
      }).catch(errorResponse(422))
    },

    delete: ({
      where,
    }: {
      where?: SelectProps<OauthProvider>['where']
    } = {}) => {
      // TODO: delete user and tenant via transaction?
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

function selectTenantIdFromOauthProviderTransaction(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return (props: OauthProviderSignup) => {
    return tx
      .select({
        tenantId: oauthProvidersSchema.tenantId,
      })
      .from(oauthProvidersSchema)
      .where(eq(oauthProvidersSchema.providerId, props.provider.providerId))
      .then((result) => ({
        data: {
          ...props,
          tenantId: result[0].tenantId,
        },
      }))
      .catch((error: Error) => {
        isDev() && console.error(error)
        return { data: { ...props, tenantId: null }, error }
      })
  }
}

function insertTenant(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return ({
    data,
    error,
  }: {
    data: {
      tenantId: TenantId
      provider: Provider
      user: ProviderUser
    }
    error?: Error
  }) => {
    if (error) throw error

    return tx
      .insert(tenantsSchema)
      .values({})
      .returning({
        id: tenantsSchema.id,
      })
      .then((tenants) => {
        return {
          data: {
            ...data,
            tenantId: tenants[0]?.id,
          },
        }
      })
      .catch((error: Error) => {
        isDev() && console.error(error)
        return { data: { ...data, tenantId: null }, error }
      })
  }
}

function insertOauthProviderTransaction(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return ({
    data,
    error,
  }: {
    data: {
      tenantId: TenantId
      provider: Provider
      user: ProviderUser
    }
    error?: Error
  }) => {
    const { tenantId, provider } = data

    if (error || tenantId) throw error

    console.log('insertOauthProviderTransaction', { data, error })

    return tx
      .insert(oauthProvidersSchema)
      .values({
        tenantId: tenantId as number,
        ...provider,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
      .then((oauths) => {
        console.log('====insertOauthProviderTransaction', {
          data: {
            ...data,
            oauthId: oauths[0]?.id,
          },
        })

        return {
          data: {
            ...data,
            oauthId: oauths[0]?.id,
          },
        }
      })
      .catch((error: Error) => {
        isDev() && console.error(error)
        return { data: { ...data, oauthId: null }, error }
      })
  }
}

function findUserByEmailTransaction(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return async ({
    data,
    error,
  }: {
    data: {
      tenantId: TenantId
      provider: Provider
      user: ProviderUser
      oauthId: OauthId
    }
    error?: Error
  }) => {
    console.log('====findUserByEmailTransaction', { data, error })

    const { tenantId, oauthId, user } = data
    if (error || tenantId || oauthId) throw error

    return tx
      .select({
        id: usersSchema.id,
      })
      .from(usersSchema)
      .where(eq(usersSchema.email, user.email))
      .then((result) => ({
        data: {
          ...data,
          userId: result[0]?.id,
        },
      }))
      .catch((error: Error) => {
        isDev() && console.error(error)
        return { data: { ...data, userId: null }, error }
      })
  }
}

function insertUserTransaction(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return async ({
    data,
    error,
  }: {
    data: {
      tenantId: TenantId
      provider: Provider
      user: ProviderUser
      oauthId: OauthId
    }
    error?: Error
  }) => {
    const { tenantId, oauthId, user } = data
    if (error || tenantId || oauthId) throw error

    return tx
      .insert(usersSchema)
      .values({
        ...user,
        tenantId: tenantId as number,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning({
        id: usersSchema.id,
      })
      .then((result) => {
        return {
          data: {
            ...data,
            userId: result[0].id,
          },
        }
      })
      .catch((error: Error) => {
        isDev() && console.error(error)
        return { data: { ...data, userId: null }, error }
      })
  }
}

function createTenantDb(
  tx: PgTransaction<
    PostgresJsQueryResultHKT,
    Record<string, never>,
    ExtractTablesWithRelations<Record<string, never>>
  >
) {
  return ({
    data,
    error,
  }: {
    data: {
      tenantId: TenantId
      provider: Provider
      user: ProviderUser
      oauthId: OauthId
      userId: UserId
    }
    error?: Error
  }) => {
    const { tenantId } = data
    if (tenantId) throw error

    return tx
      .execute(tenantsSql(tenantId as number))
      .then(() => data)
      .catch((error: Error) => {
        isDev() && console.error(error)
        return { data, error }
      })
  }
}
