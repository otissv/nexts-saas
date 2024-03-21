import { connection } from '../../database/pg/connection.pg'
import { oauthProviders, tenants, users } from '../../schema/orm/app.schema'
import { appData } from './app-data'
import { tenantData } from './tenant-data'
import { tenantSchema } from '../../schema/orm/tenant.schema'
import { tenantsSql } from '../../schema/sql/tenant.sql'
import { appSql } from '../../schema/sql/app.sql'

import minimist from 'minimist'

const { data, schema } = minimist(process.argv.slice(2))

const db = connection()

async function seed() {
  const runAll = !data && !schema

  await db.transaction(async (tx) => {
    try {
      if (runAll || schema?.includes('app')) {
        // TODO: see if schema exits to stop 'NOTICE' messages
        await tx.execute(appSql())
        console.log('App schema added')
      }

      if (runAll || data?.includes('app')) {
        await tx.insert(users).values(appData.users).onConflictDoNothing()
        await tx
          .insert(oauthProviders)
          .values(appData.oauthProviders)
          .onConflictDoNothing()
        await tx.insert(tenants).values(appData.tenants).onConflictDoNothing()
        console.log('App data inserted')
      }

      for (const index in appData.tenants) {
        const tenantId = parseInt(index, 10) + 1
        const {
          addresses,
          companies,
          cmsCollections,
          cmsCollectionDocuments,
          cmsCollectionColumns,
        } = tenantSchema(tenantId)

        if (runAll || schema?.includes('tenant')) {
          // TODO: see if schema exits to stop 'NOTICE' messages
          await tx.execute(tenantsSql(tenantId))
          console.log('Tenant schema added')
        }

        if (runAll || data?.includes('tenant')) {
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
            .insert(cmsCollectionColumns)
            .values(tenantData.cmsCollectionColumn)
          await tx
            .insert(cmsCollectionDocuments)
            .values(tenantData.cmsCollectionDocument)
            .onConflictDoNothing()
          console.log('Tenant data inserted')
        }
      }
    } catch (error) {
      console.error(error)
      tx.rollback()
    }
  })

  db.end()
}

seed()
