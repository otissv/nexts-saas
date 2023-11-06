import { MenuItem } from "@/components/layouts/types.layouts"
import { cn } from "@/lib/utils"
import {
  Nav,
  NavMenuList,
  NavMenuItem,
  NavMenuLink,
  NavProps,
} from "@/components/nav/nav"

export interface NavBarProps extends NavProps {
  className?: string
  isLoggedIn?: boolean
  items: MenuItem[]
}

export const NavBar = ({
  className,
  items,
  isLoggedIn,
  children,
  ...props
}: NavBarProps) => {
  return (
    <div>
      <Nav
        {...props}
        className={cn("mx-6 my-2 lg:m-0 hidden lg:!block", className)}
      >
        <NavMenuList className="justify-start">
          {items.map(({ id, label, href }) => {
            if (!isLoggedIn && id === "admin") return null
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
NavBar.displayName = "NavBar"
