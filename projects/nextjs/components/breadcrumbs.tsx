import * as React from 'react'

import { cn } from '@/lib/utils'
import { AppLink } from '@/components/app-link'

export interface Breadcrumb {
  label: React.ReactNode
  crumb?: string
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  crumbs: Breadcrumb[]
  separator?: React.ReactNode
}

export const BreadCrumbs = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, crumbs = [], separator, ...props }, ref) => {
    let url = ''

    const breadcrumbs = crumbs.map(({ crumb, label }) => {
      if ((url === '/' || url === '') && crumb) {
        url = url + crumb
      } else if (crumb) {
        url = `${url}/${crumb}`
      }

      return (
        <React.Fragment key={crumb}>
          {crumb ? (
            <li className="inline-flex items-center">
              {separator ? separator : <span className="text-xs  mr-1">/</span>}
              <AppLink
                href={url}
                className="inline-flex items-center text-sm font-medium ml-1 whitespace-nowrap"
              >
                {label}
              </AppLink>
            </li>
          ) : (
            <li className="inline-flex items-center">
              {separator ? separator : <span className="text-xs mr-1">/</span>}

              <span className="inline-flex text-sm font-medium ml-1 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {label}
              </span>
            </li>
          )}
        </React.Fragment>
      )
    })

    return (
      <nav
        className={cn(className)}
        aria-label="Breadcrumb"
        ref={ref}
        {...props}
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          {breadcrumbs}
        </ol>
      </nav>
    )
  }
)
BreadCrumbs.displayName = 'BreadCrumbMenu'
