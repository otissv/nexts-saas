export type UserSession = {
  id?: string | null
  name?: string | null
  email?: string | null
  image?: string | null
  tenantId?: string
  accessToken?: string
}

export type PageParams = {
  locale: string
}
