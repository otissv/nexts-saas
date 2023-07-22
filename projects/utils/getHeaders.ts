import { headers } from 'next/headers'

export function getHeaders() {
  const headersList = headers()
  const domain = headersList.get('x-forwarded-host') || ''
  const protocol = headersList.get('x-forwarded-proto') || ''
  const pathname = headersList.get('x-invoke-path') || ''
  const local = pathname.split('/')[1]

  return {
    domain,
    protocol,
    pathname: pathname.split(`/${local}`)[1],
    fullUrl: headersList.get('referer'),
    local,
  }
}
