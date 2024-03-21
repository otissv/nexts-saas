import context from 'server-only-context'

import { connection } from '@/database/pg/connection.pg'
import { usersService } from '@/features/app-users/users.service'
import { authService } from '@/features/app-auth/auth.service'
import { oauthProvidersService } from '@/features/app-oauth-providers/oauth-providers.service'
import { tenantsService } from '@/features/app-tenants/tenants.service'
import { tenantCompaniesService } from '@/features/tenant-companies/companies.tenant.service'
import { tenantAddressService } from '@/features/tenant-addresses/addresses.tenant.service'
import { cmsCollectionsService } from '@/features/cms/cms.service'

const db = connection()

class Locale {
  private locale = ''

  constructor(locale: string = '') {
    this.locale = locale
  }

  get() {
    return this.locale
  }

  set(locale: string) {
    this.locale = locale
    return this.locale
  }
}

export const [serverContext] = context({
  usersService: usersService(db),
  authService: authService(db),
  oauthProvidersService: oauthProvidersService(db),
  tenantCompaniesService: tenantCompaniesService(db),
  tenantsService: tenantsService(db),
  tenantAddressService: tenantAddressService(db),
  cmsCollectionsService: cmsCollectionsService(db),
  localeService: new Locale(),
})
