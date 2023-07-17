import { MenuItem } from '@/app/[locale]/menu'
import { cn } from '@/lib/utils'
import {
  Nav,
  NavMenuList,
  NavMenuItem,
  NavMenuLink,
  NavProps,
} from '@/components/nav/nav'

export interface LoggedOutNavProps extends NavProps {
  items: MenuItem[]
  className?: string
  isLoggedIn: boolean
}

export const NavBar = ({
  className,
  items,
  isLoggedIn,
  ...props
}: LoggedOutNavProps) => {
  return (
    <div>
      <Nav
        {...props}
        className={cn('mx-6 my-2 lg:m-0 hidden lg:!block', className)}
      >
        <NavMenuList className="justify-start">
          {items.map(({ id, label, href }) => {
            return (
              <NavMenuItem key={id} className="mx-2 my-2 xl:first:m-0">
                <NavMenuLink
                  href={href}
                  data-radix-collection-item
                  className={`
                    !m-0
                    w-full 
                    h-10
                    font-semibold 
                    rounded-md 
                    justify-center
                    focus:outline-none 
                    focus:bg-accent 
                    focus:text-accent-foreground 
                    disabled:opacity-50 
                    disabled:pointer-events-none 
                    bg-background hover:bg-accent 
                    hover:text-accent-foreground 
                    data-[state=open]:bg-accent/50 
                    data-[active]:bg-accent/50 
                    `}
                >
                  {label}
                </NavMenuLink>
              </NavMenuItem>
            )
          })}

          {isLoggedIn ? (
            <NavMenuItem className="!mx-2 !ml-auto xl:last:!mr-0">
              <NavMenuLink
                href="/login"
                data-radix-collection-item
                className="!m-0 font-semibold w-full rounded-md border border-white focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10"
              >
                Login
              </NavMenuLink>
            </NavMenuItem>
          ) : (
            <NavMenuItem className="!mx-2 !ml-auto xl:last:!mr-0">
              <NavMenuLink
                href="/signout"
                data-radix-collection-item
                className="!m-0 font-semibold w-full rounded-md border border-white focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10"
              >
                Sign Out
              </NavMenuLink>
            </NavMenuItem>
          )}
        </NavMenuList>
      </Nav>
    </div>
  )
}
NavBar.displayName = 'NavBar'
