import { redirect } from 'next/navigation'

export default function Signout() {
  redirect('/api/auth/signout')
}
