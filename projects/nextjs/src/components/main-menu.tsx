'use client'

import Link from 'next/link'
import * as React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { translateClient } from '@/components/translate-client'
import { MenuToggle } from './menu-toggle'
import { UserSession } from '@/types'

export interface LoggedInMenuProps extends React.RefAttributes<HTMLElement> {
  user: UserSession
}

export const LoggedInMenu = React.forwardRef<HTMLElement, LoggedInMenuProps>(
  ({ user, ...props }, ref) => {
    return (
      <NavigationMenu
        className="flex-1 mx-3 py-2"
        ref={ref}
        {...props}
      ></NavigationMenu>
    )
  }
)
LoggedInMenu.displayName = 'LoggedInMenu'

export interface LoggedOutMenuProps extends React.RefAttributes<HTMLElement> {}

export const LoggedOutMenu = React.forwardRef<HTMLElement, LoggedOutMenuProps>(
  (props, ref) => {
    const T = translateClient('ui.menu')

    return (
      <NavigationMenu className="flex-1 mx-3 py-2" ref={ref} {...props}>
        <MenuToggle title="toggle menu" />

        <div>
          <Link href="/" className="inline-flex mr-6">
            App Name
          </Link>

          <NavigationMenuList>
            <MenuLink href="/about">
              <T>about.a.content</T>
            </MenuLink>
            <MenuLink href="/contact">
              <T>contact.a.content</T>
            </MenuLink>
            <MenuLink href="/pricing">
              <T>pricing.a.content</T>
            </MenuLink>
            <MenuLink href="/blog">
              <T>blog.a.content</T>
            </MenuLink>
          </NavigationMenuList>

          <Link
            className={cn(buttonVariants({ variant: 'outline' }), 'ml-auto')}
            href="/api/auth/signin"
          >
            <T>login.a.content</T>
          </Link>
        </div>
      </NavigationMenu>
    )
  }
)
LoggedOutMenu.displayName = 'LoggedOutMenu'

export interface MenuLinkProps extends React.HTMLAttributes<HTMLLIElement> {
  href: string
}

export const MenuLink = React.forwardRef<HTMLLIElement, MenuLinkProps>(
  ({ children, className, href, ...props }, ref) => {
    return (
      <NavigationMenuItem
        className=" w-full justify-stretch !m-0"
        ref={ref}
        {...props}
      >
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              'w-full hover:bg-transparent focus:bg-transparent',
              className
            )}
          >
            {children}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    )
  }
)
MenuLink.displayName = 'MenuLink'
