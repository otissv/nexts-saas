'use client'

import React from 'react'

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { MenuItem } from '@/app/[locale]/menu'
import { MenuButton } from '@/components/buttons/menu-button'
import {
  Nav,
  NavMenuItem,
  NavMenuLink,
  NavMenuList,
} from '@/components/nav/nav'
export interface NavSheetProps extends React.HTMLProps<HTMLDivElement> {
  position?: 'top' | 'bottom' | 'left' | 'right'
  items: MenuItem[]
}

export const NavSheet = React.forwardRef<HTMLDivElement, NavSheetProps>(
  ({ items, children, position, ...props }, ref) => {
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
          <Nav className="w-full overflow-y-auto" stacked>
            <NavMenuList
              className="w-full flex-0 items-start justify-start"
              stacked
            >
              {items.map(({ id, label, href }) => {
                return (
                  <NavMenuItem key={id} className="!mx-0 !my-0.5">
                    <SheetClose asChild className="justify-start">
                      <NavMenuLink
                        href={href}
                        key={id}
                        data-radix-collection-item
                        className="!m-0 w-full h-10 justify-stretch  text-sm font-medium rounded-md focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50"
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
