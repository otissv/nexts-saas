import { connection } from '../../database/pg/connection.pg'
import { oauthProviders, tenants, users } from '../../schema/orm/app.schema'
import { appData } from './app-data'
import { tenantData } from './tenant-data'
import { tenantSchema } from '../../schema/orm/tenant.schema'
import { tenantsSql } from '../../schema/sql/tenant.sql'
import { appSql } from '../../schema/sql/app.sql'

const db = connection()

async function seed() {
  await db.transaction(async (tx) => {
    try {
      // TODO: see if schema exits to stop 'NOTICE' messages

      // App Schema
      await tx.execute(appSql())
      await tx.insert(users).values(appData.users).onConflictDoNothing()
      await tx
        .insert(oauthProviders)
        .values(appData.oauthProviders)
        .onConflictDoNothing()

      await tx.insert(tenants).values(appData.tenants).onConflictDoNothing()

      console.log('App schema inserted')

      // Tenant Schema
      for (const index in appData.tenants) {
        const tenantId = parseInt(index, 10) + 1
        const { addresses, companies, cmsCollections, cmsCollectionDocuments } =
          tenantSchema(tenantId)

        // TODO: see if schema exits to stop 'NOTICE' messages

        await tx.execute(tenantsSql(tenantId))
        await tx
          .insert(addresses)
          .values(tenantData.addresses)
          .onConflictDoNothing()
        await tx
          .insert(companies)
          .values(tenantData.companies)
          .onConflictDoNothing()

        await tx
          .insert(cmsCollections)
          .values(tenantData.cmsCollection)
          .onConflictDoNothing()

        await tx
          .insert(cmsCollectionDocuments)
          .values(tenantData.CmsCollectionDocument)
          .onConflictDoNothing()

        console.log('Tenant schema inserted')
      }
    } catch (error) {
      console.error(error)
      tx.rollback()
    }
  })

  db.end()
}

seed()
