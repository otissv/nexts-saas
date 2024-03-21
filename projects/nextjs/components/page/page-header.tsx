import { Breadcrumb, BreadCrumbs } from '@/components/breadcrumbs'
import { Maybe } from '@/components/maybe'
import { Typography } from '@/components/typography/typography'

export interface PageProps {
  heading?: string
  breadcrumbs?: Breadcrumb[]
  as?: 'h1' | 'h2' | 'h3' | 'h4'
}

export const PageHeader = ({ as = 'h1', breadcrumbs, heading }: PageProps) => {
  return (
    <>
      <Maybe check={heading}>
        <Typography as={as} className="mb-4">
          {heading}
        </Typography>
      </Maybe>
      <Maybe check={breadcrumbs}>
        <BreadCrumbs className="mb-8" crumbs={breadcrumbs as Breadcrumb[]} />
      </Maybe>
    </>
  )
}

PageHeader.displayName = 'PageHeader'
