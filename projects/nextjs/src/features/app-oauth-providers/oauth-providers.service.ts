import 'server-only'

import { eq, SQL } from 'drizzle-orm'
import { SelectedFieldsFlat } from 'drizzle-orm/pg-core'

import { PostgresDatabase } from '@/database/pg/connection.pg'
import { oauthProvidersDb } from './oauth-providers.db'
import { errorResponse } from '@/lib/utils-server-only'
import { SelectProps } from '@/database/pg/types.pg'
import { OauthProvider, OauthProviderSignup } from './oauth-providers.types'
import { oauthProviderSignupValidate } from '@/features/app-oauth-providers/oauth-providers.validators'
import { OauthProviderSchema } from '@/schema/app.schema'

export function oauthProvidersService(db: PostgresDatabase) {
  const oauthProviders = oauthProvidersDb(db)

  return {
    /* Queries */

    select: (props: SelectProps<OauthProvider>) =>
      oauthProviders.select(props).catch(errorResponse(422)),

    selectByProviderId: ({
      providerId,
      columns,
    }: {
      providerId: string
      columns?: SelectProps<OauthProvider>['columns']
    }) =>
      oauthProviders
        .select({
          columns,
          where: (schema: OauthProviderSchema) =>
            eq(schema.providerId, providerId) as SQL<OauthProvider>,
        })
        .catch(errorResponse(422)),

    /* Mutations */

    signup: ({ data }: { data: OauthProviderSignup }) => {
      return oauthProviderSignupValidate(data)
        .then((data) => ({ data }))
        .then(oauthProviders.signup)
        .catch(errorResponse(422))
    },

    delete: (props: {
      where?: SelectProps<OauthProvider>['where']
      returning?: SelectedFieldsFlat
    }) => oauthProviders.delete(props).catch(errorResponse(422)),
  }
}
