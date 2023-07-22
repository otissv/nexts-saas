import { TypographyH1 } from '../typography/h1.typography'
import { Breadcrumb, BreadCrumbs } from '../breadcrumbs'
import { Maybe } from '../maybe'

export interface PageProps {
  heading?: string
  breadcrumbs?: Breadcrumb[]
}

export const PageHeader = ({ breadcrumbs, heading }: PageProps) => {
  return (
    <>
      <Maybe check={heading}>
        <TypographyH1 className="mb-4">{heading}</TypographyH1>
      </Maybe>
      <Maybe check={breadcrumbs}>
        <BreadCrumbs className="mb-8" crumbs={breadcrumbs as Breadcrumb[]} />
      </Maybe>
    </>
  )
}

PageHeader.displayName = 'PageHeader'
