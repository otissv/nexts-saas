import { connection } from '../../database/pg/connection.pg'
import { oauthProviders, tenants, users } from '../../schema/app.schema'
import { data } from './data'

import { tenantSchema } from '../../schema/tenant.schema'
import { tenantsSql } from '../../schema/tenant.sql'
import { appSql } from '@/schema/app.sql'

const db = connection()

async function seed() {
  await db.transaction(async (tx) => {
    try {
      // TODO: see if schema exits to stop 'NOTICE' messages
      await tx.execute(appSql())

      await tx.insert(users).values(data.users).onConflictDoNothing()
      await tx
        .insert(oauthProviders)
        .values(data.oauthProviders)
        .onConflictDoNothing()
      await tx.insert(tenants).values(data.tenants).onConflictDoNothing()

      for (const schema of data.tenants) {
        const tenantId = `t_${schema.ownerId}`
        const {
          addresses,
          companies,
          menus,
          pages,
          seos,
          sections,
          contents,
          medias,
          companyAddresses,
          users,
        } = tenantSchema(tenantId)

        // TODO: see if schema exits to stop 'NOTICE' messages
        await tx.execute(tenantsSql(tenantId))

        await tx.insert(addresses).values(data.addresses).onConflictDoNothing()
        await tx.insert(companies).values(data.companies).onConflictDoNothing()
        await tx
          .insert(companyAddresses)
          .values(data.companyAddresses)
          .onConflictDoNothing()
        await tx.insert(menus).values(data.menus).onConflictDoNothing()
        await tx.insert(pages).values(data.pages).onConflictDoNothing()
        await tx.insert(seos).values(data.seos).onConflictDoNothing()
        await tx.insert(sections).values(data.sections).onConflictDoNothing()
        await tx.insert(contents).values(data.contents).onConflictDoNothing()
        await tx.insert(medias).values(data.medias).onConflictDoNothing()
        await tx.insert(users).values(data.users).onConflictDoNothing()
      }
    } catch (error) {
      console.error(error)
      tx.rollback()
    }
  })

  // TODO: move to a separate function and run separately
  // await db.transaction(async (tx) => {
  //   try {
  //     await tx.execute(appSqlAlter())
  //     for (const schema of data.tenants) {
  //       const tenantId = `t_${schema.ownerId}`
  //       await tx.execute(tenantsSqlAfter(tenantId))
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     tx.rollback()
  //   }
  // })

  db.end()
}

seed()
