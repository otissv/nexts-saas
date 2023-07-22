import { NavSidebar } from '../nav/nav-sidebar'
import { NavSheet } from '../nav/nav-sheet'
import { NavMenuItem, NavMenuLink } from '../nav/nav'
import { MenuItem } from '../nav/types.nav'

export interface AdminLayoutProps {
  children: React.ReactNode
  menuItems: MenuItem[]
}

export const AdminLayout = ({
  children,
  menuItems,
}: {
  children: React.ReactNode
  menuItems: MenuItem[]
}) => {
  return (
    <div className="m-5">
      {/* mobile nav */}
      <NavSheet items={menuItems} position="left">
        <NavMenuLink
          href="/signout"
          data-radix-collection-item
          className="!m-0 font-semibold w-full rounded-md border border-white focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10"
        >
          Sign Out
        </NavMenuLink>
      </NavSheet>
      <div className="flex ">
        {/* desktop nav */}
        <NavSidebar items={menuItems}>
          <NavMenuItem className="w-full mt-8">
            <NavMenuLink
              href="/signout"
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
