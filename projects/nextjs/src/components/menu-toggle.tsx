import * as React from 'react'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'

export interface MenuToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const MenuToggle = React.forwardRef<HTMLButtonElement, MenuToggleProps>(
  ({ ...props }, ref) => {
    return (
      <Button variant="ghost" ref={ref} {...props}>
        <Menu />
      </Button>
    )
  }
)
