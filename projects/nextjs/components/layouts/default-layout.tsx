import { NavSheet } from '@/components/nav/nav-sheet'

import { NavMenuItem, NavMenuLink } from '@/components/nav/nav'
import { SheetClose } from '@/components/ui/sheet'
import { NavBar } from '@/components/nav/nav-bar'
import { MenuItem } from '@/components/layouts/types.layouts'

export interface MarketingLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  menuItems: MenuItem[]
  isLoggedIn: boolean
  T: ({ children }: { children: string }) => JSX.Element
}

export function DefaultLayout({
  children,
  isLoggedIn,
  menuItems,
  T,
}: MarketingLayoutProps) {
  return (
    <div className="flex flex-col">
      {/* mobile nav */}
      <NavSheet items={menuItems} isLoggedIn={isLoggedIn} position="left">
        {isLoggedIn ? (
          <NavMenuItem className="!mx-0 w-full">
            <NavMenuLink
              href="/signout"
              variant="outline"
              data-radix-collection-item
            >
              <T>buttons.signout.content</T>
            </NavMenuLink>
          </NavMenuItem>
        ) : (
          <>
            <NavMenuItem className="!mx-0 w-full">
              <NavMenuLink href="/signup" data-radix-collection-item>
                <T>buttons.signup.content</T>
              </NavMenuLink>
            </NavMenuItem>
            <NavMenuItem className="!mx-0 w-full">
              <SheetClose asChild className="justify-start">
                <NavMenuLink
                  href="/login"
                  variant="outline"
                  data-radix-collection-item
                >
                  <T>buttons.login.content</T>
                </NavMenuLink>
              </SheetClose>
            </NavMenuItem>
          </>
        )}
      </NavSheet>

      {/* desktop nav */}
      <NavBar items={menuItems} isLoggedIn={isLoggedIn}>
        {isLoggedIn ? (
          <NavMenuItem className="!mx-2 !ml-auto xl:last:!mr-0">
            <NavMenuLink
              href="/signout"
              variant="outline"
              data-radix-collection-item
            >
              <T>buttons.signout.content</T>
            </NavMenuLink>
          </NavMenuItem>
        ) : (
          <div className="flex !mx-2  !ml-auto xl:last:!mr-0">
            <NavMenuItem className="mr-2">
              <NavMenuLink href="/signup" data-radix-collection-item>
                <T>buttons.signup.content</T>
              </NavMenuLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavMenuLink
                href="/login"
                variant="outline"
                data-radix-collection-item
              >
                <T>buttons.login.content</T>
              </NavMenuLink>
            </NavMenuItem>
          </div>
        )}
      </NavBar>
      <main className="flex-1">{children}</main>
    </div>
  )
}
DefaultLayout.displayName = 'DefaultLayout'
