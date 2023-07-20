import * as React from 'react'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { Provider as BalancerProvider } from 'react-wrap-balancer'

import '@/app/[locale]/global.css'
import { PageParams } from '@/types'
import { menu } from './menu'
import { TranslationProvider } from '@/components/translate/translations-provider'
import { Toaster } from '@/components/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { NavMenuItem, NavMenuLink } from '@/components/nav/nav'
import { cn } from '@/lib/utils'
import { NavSheet } from '@/components/nav/nav-sheet'
import { Maybe } from '@/components/maybe'
import { getHeaders } from '@/lib/getHeaders'
import { SheetClose } from '@/components/ui/sheet'
import { NavBar } from '@/components/nav/nav-bar'
import { Indicators } from '@/components/indicators/indicator'
import { serverUseTranslate } from '@/components/translate/translate-server'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export interface RootLayoutProps {
  children: React.ReactNode
  params: PageParams
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  /* TODO: if local not exist redirect to default.
   * Can't use useLocal from next-inlt.
   * May read files in translation folder
   */

  const menuItems = await menu()
  const { pathname } = getHeaders()

  //TODO: value not updating
  const hideMenu = ['/login', '/signup', '/admin'].includes(
    `/${pathname.split('/')[1]}`
  )

  const session = await getServerSession()
  const isLoggedIn = Boolean(session)
  const T = await serverUseTranslate('ui.pages.authentication')

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          'w-full min-h-screen bg-background font-sans antialiased'
        )}
      >
        <TranslationProvider locale={params.locale}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <BalancerProvider>
              <div className="flex flex-col">
                <Maybe check={!hideMenu}>
                  {/* mobile nav */}
                  <NavSheet
                    items={menuItems.marketing}
                    isLoggedIn={isLoggedIn}
                    position="left"
                  >
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
                          <NavMenuLink
                            href="/signup"
                            data-radix-collection-item
                          >
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
                  <NavBar items={menuItems.marketing}>
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
                          <NavMenuLink
                            href="/signup"
                            data-radix-collection-item
                          >
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
                </Maybe>
                {children}
              </div>
              <Toaster />
              <Indicators isLoggedIn={isLoggedIn} />
            </BalancerProvider>
          </ThemeProvider>
        </TranslationProvider>
      </body>
    </html>
  )
}
