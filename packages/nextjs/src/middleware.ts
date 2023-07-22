import { stackMiddleware } from './middleware/stackMiddleware'
import { withI18n } from './middleware/withI18n.middleware'

// withI18n should be last
export default stackMiddleware([withI18n])

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
