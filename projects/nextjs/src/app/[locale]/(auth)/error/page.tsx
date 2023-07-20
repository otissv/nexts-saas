import { PageParams } from '@/types'
import { redirect } from 'next/navigation'

export default function AuthError({
  searchParams,
}: {
  params: PageParams
  searchParams: { error: string }
}) {
  redirect(`/login?error=${searchParams.error}`)
}
