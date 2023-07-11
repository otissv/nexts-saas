'use client'

import React from 'react'
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'

import { NavigationMenuItem } from './ui/navigation-menu'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { usePathname } from 'next/navigation'

export interface NavProps extends NavigationMenuProps {
  stacked?: boolean
}

export const Nav = React.forwardRef<HTMLHtmlElement, NavProps>(
  ({ children, className, stacked, ...props }, ref) => {
    return (
      <NavigationMenu
        className={cn(stacked ? 'block' : '', className)}
        data-orientation="vertical"
        ref={ref}
        {...props}
      >
        {children}
      </NavigationMenu>
    )
  }
)

export interface NavMenuList extends React.HTMLAttributes<HTMLOListElement> {
  stacked?: boolean
}
export const NavMenuList = React.forwardRef<HTMLOListElement, NavMenuList>(
  ({ children, className, stacked, ...props }, ref) => {
    return (
      <NavigationMenuList
        className={cn(stacked ? 'flex flex-col align-stretch' : '', className)}
        ref={ref}
        {...props}
      >
        {children}
      </NavigationMenuList>
    )
  }
)

export interface NavMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export const NavMenuItem = React.forwardRef<HTMLLIElement, NavMenuItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <NavigationMenuItem
        className={className}
        data-radix-collection-item
        ref={ref}
        {...props}
      >
        {children}
      </NavigationMenuItem>
    )
  }
)
NavMenuItem.displayName = 'NavMenuItem'

export interface NavMenuLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
}

export const NavMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavMenuLinkProps
>(({ href, children, className, ...props }, ref) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      data-active={isActive || undefined}
      aria-current={isActive || 'page'}
      href={href}
      data-radix-collection-item
      className={cn(
        'inline-flex border-transparent py-2 px-4 transition-colors  group',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Link>
  )
})
NavMenuLink.displayName = 'NavMenuLink'
