import createMiddleware from 'next-intl/middleware'

import { MiddlewareFactory } from './middleware.types'

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
})

export const withI18n: MiddlewareFactory = (next) => {
  return intlMiddleware
}
