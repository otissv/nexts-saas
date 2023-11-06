import { NavSheet } from "@/components/nav/nav-sheet"
import { NavMenuItem, NavMenuLink } from "@/components/nav/nav"
import { SheetClose } from "@/components/ui/sheet"
import { NavBar } from "@/components/nav/nav-bar"
import { MenuItem } from "@/components/layouts/types.layouts"

export interface NavAppBarProps {
  isLoggedIn?: boolean
  items: MenuItem[]
  login?: React.ReactNode
  signOut?: React.ReactNode
  signUp?: React.ReactNode
}

export const NavAppBar = ({
  isLoggedIn,
  items = [],
  login = "Login",
  signOut = "Sign Out",
  signUp = "Sign Up",
}: NavAppBarProps) => {
  return (
    <div className="flex flex-col">
      {/* mobile nav */}
      <NavSheet items={items} isLoggedIn={isLoggedIn} position="left">
        {isLoggedIn ? (
          <NavMenuItem className="!mx-0 w-full">
            <NavMenuLink
              href="/signout"
              variant="outline"
              data-radix-collection-item
            >
              {signOut}
            </NavMenuLink>
          </NavMenuItem>
        ) : (
          <>
            <NavMenuItem className="!mx-0 w-full">
              <NavMenuLink href="/signup" data-radix-collection-item>
                {signUp}
              </NavMenuLink>
            </NavMenuItem>
            <NavMenuItem className="!mx-0 w-full">
              <SheetClose asChild className="justify-start">
                <NavMenuLink
                  href="/login"
                  variant="outline"
                  data-radix-collection-item
                >
                  {login}
                </NavMenuLink>
              </SheetClose>
            </NavMenuItem>
          </>
        )}
      </NavSheet>

      {/* desktop nav */}
      <NavBar items={items} isLoggedIn={isLoggedIn}>
        {isLoggedIn ? (
          <NavMenuItem className="!mx-2 !ml-auto xl:last:!mr-0">
            <NavMenuLink
              href="/signout"
              variant="outline"
              data-radix-collection-item
            >
              {signOut}
            </NavMenuLink>
          </NavMenuItem>
        ) : (
          <div className="flex !mx-2  !ml-auto xl:last:!mr-0">
            <NavMenuItem className="mr-2">
              <NavMenuLink href="/signup" data-radix-collection-item>
                {signUp}
              </NavMenuLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavMenuLink
                href="/login"
                variant="outline"
                data-radix-collection-item
              >
                {login}
              </NavMenuLink>
            </NavMenuItem>
          </div>
        )}
      </NavBar>
    </div>
  )
}
