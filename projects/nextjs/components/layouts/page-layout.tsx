import { MenuItem } from '@/components/layouts/types.layouts'

export interface AdminLayoutProps {
  children: React.ReactNode
  menuItems: MenuItem[]
}

export const PageLayout = ({
  children,
  menuItems,
}: {
  children: React.ReactNode
  menuItems: MenuItem[]
}) => {
  return <main className="flex-1">{children}</main>
}
