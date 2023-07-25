'use client'

import * as React from 'react'

import { NavigationMenu } from '@radix-ui/react-navigation-menu'

import { cn } from '@/lib/utils'
import { MenuItem } from '@/components/layouts/types.layouts'
import {
  Nav,
  NavMenuItem,
  NavMenuLink,
  NavMenuList,
} from '@/components/nav/nav'

export interface NavSidebarProps
  extends React.HtmlHTMLAttributes<typeof NavigationMenu> {
  items: MenuItem[]
}

export const NavSidebar = React.forwardRef<
  typeof NavigationMenu,
  NavSidebarProps
>(({ children, className, items, ...props }, ref) => {
  return (
    <aside
      className={cn('pr-6 hidden lg:flex', className)}
      // @ts-ignore
      ref={ref}
      {...props}
    >
      <div className={cn('flex-col w-56 lg:flex')}>
        <Nav stacked>
          <NavMenuList stacked>
            {items.map(({ id, label, href }) => (
              <NavMenuItem key={id} className="w-full">
                <NavMenuLink
                  key={id}
                  href={href}
                  data-radix-collection-item
                  className="!m-0 w-full rounded-md focus:outline-none focus:bg-accent focus:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none bg-background hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 h-10"
                >
                  {label}
                </NavMenuLink>
              </NavMenuItem>
            ))}
            {children}
          </NavMenuList>
        </Nav>
      </div>
    </aside>
  )
})
NavSidebar.displayName = 'NavSidebar'
