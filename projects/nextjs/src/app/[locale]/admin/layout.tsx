import { NavSheet } from '@/components/nav-sheet'
import { NavSidebar } from '@/components/nav-sidebar'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { menu } from '../menu'
import { NavMenuItem, NavMenuLink } from '@/components/nav'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) redirect('/login')

  const menuItems = await menu()

  return (
    <div className="m-5">
      {/* mobile nav */}
      <NavSheet items={menuItems.admin} position="left">
        <NavMenuLink
          href="/api/auth/signout"
          data-radix-collection-item
          className="!m-0 font-semibold w-full rounded-md border border-white focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10"
        >
          Sign Out
        </NavMenuLink>
      </NavSheet>
      <div className="flex ">
        {/* desktop nav */}
        <NavSidebar items={menuItems.admin}>
          <NavMenuItem className="w-full mt-8">
            <NavMenuLink
              href="/api/auth/signout"
              data-radix-collection-item
              className="!m-0 font-semibold w-full rounded-md border border-white focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10"
            >
              Sign Out
            </NavMenuLink>
          </NavMenuItem>
        </NavSidebar>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
