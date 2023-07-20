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
}

export const NavBar = ({
  className,
  items,
  children,
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
                  className="justify-center"
                >
                  {label}
                </NavMenuLink>
              </NavMenuItem>
            )
          })}

          {children}
        </NavMenuList>
      </Nav>
    </div>
  )
}
NavBar.displayName = 'NavBar'
