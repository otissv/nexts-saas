import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign Out',
  description: '...',
}

export default function Signout() {
  redirect('/api/auth/signout')
}
