'use client'

import * as React from 'react'

import { NavigationMenu, NavigationMenuList } from './ui/navigation-menu'
import { UserSession } from '@/types'
import { cn } from '@/lib/utils'
import { MenuItem } from '@/app/[locale]/menu'
import { MenuLink } from './main-menu'
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'

export interface SidebarProps
  extends React.HtmlHTMLAttributes<typeof NavigationMenu> {
  items: MenuItem[]
  user: UserSession
  isOpen: boolean
}

export const Sidebar = React.forwardRef<typeof NavigationMenu, SidebarProps>(
  ({ className, items, isOpen, user, ...props }, ref) => {
    return (
      <aside
        className={cn('h-[calc(100vh-56px)] top-0 bottom-0', className)}
        // @ts-ignore
        ref={ref}
        {...props}
      >
        {/* mobile */}
        <div
          className={cn(
            'flex flex-col h-[calc(100vh-56px)] top-0 bottom-0  lg:hidden',
            isOpen ? 'animate-out slide-out-to-top slide-out-to-left' : ''
          )}
        >
          <div className="flex flex-col flex-1 invisible">
            <Nav items={items} />
          </div>
        </div>

        {/* desktop */}
        <div className=" flex-col h-[calc(100vh-56px)] top-0 bottom-0 lg:flex ">
          <Nav items={items} />
        </div>
      </aside>
    )
  }
)
Sidebar.displayName = 'Sidebar'

export interface NavProps extends NavigationMenuProps {
  items: {
    id: number
    label: string
    href: string
  }[]
}

export const Nav = React.forwardRef<HTMLHtmlElement, NavProps>(
  ({ children, className, items, ...props }, ref) => {
    return (
      <NavigationMenu
        className={cn('w-full block overflow-y-auto', className)}
        data-orientation="vertical"
        ref={ref}
        {...props}
      >
        <NavigationMenuList className="w-full flex-0 flex-col items-start justify-start">
          {items.map(({ id, label, href }) => (
            <SidebarLink key={id} href={href}>
              {label}
            </SidebarLink>
          ))}
          {children}
        </NavigationMenuList>
      </NavigationMenu>
    )
  }
)

export interface SidebarLinkProps extends React.HTMLAttributes<HTMLLIElement> {
  href: string
}

export const SidebarLink = React.forwardRef<HTMLLIElement, SidebarLinkProps>(
  ({ className, href, ...props }, ref) => {
    return (
      <MenuLink
        href={href}
        className={cn(
          'flex justify-start hover:underline focus:underline',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

export interface SidebarFooterLinkProps
  extends React.HTMLAttributes<HTMLLIElement> {
  href: string
}
