'use client'

import * as React from 'react'

import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet'
import { MenuItem } from '../nav/types.nav'
import { MenuButton } from '../buttons/menu-button'
import { Nav, NavMenuItem, NavMenuLink, NavMenuList } from '../nav/nav'

export interface NavSheetProps extends React.HTMLProps<HTMLDivElement> {
  isLoggedIn?: boolean
  items: MenuItem[]
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const NavSheet = React.forwardRef<HTMLDivElement, NavSheetProps>(
  ({ items, children, isLoggedIn, position, ...props }, ref) => {
    return (
      <Sheet ref={ref} {...props}>
        <SheetTrigger asChild>
          <MenuButton
            className="lg:hidden h-10 w-10"
            title="toggle menu"
            variant="outline"
          />
        </SheetTrigger>
        <SheetContent className="w-[320px] pt-10" position={position}>
          <Nav className="w-full h-full overflow-y-auto" stacked>
            <NavMenuList
              className="w-full h-full flex-0 items-start justify-start"
              stacked
            >
              {items.map(({ id, label, href }) => {
                if (!isLoggedIn && id === 'admin') return null
                return (
                  <NavMenuItem key={id} className="!mx-0 !my-0.5 w-full">
                    <SheetClose asChild className="justify-start">
                      <NavMenuLink
                        href={href}
                        key={id}
                        data-radix-collection-item
                        className="text-sm font-medium rounded-md"
                      >
                        {label}
                      </NavMenuLink>
                    </SheetClose>
                  </NavMenuItem>
                )
              })}
              {children}
            </NavMenuList>
          </Nav>
        </SheetContent>
      </Sheet>
    )
  }
)
NavSheet.displayName = 'NavSheet'
