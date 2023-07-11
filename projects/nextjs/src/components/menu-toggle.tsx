import * as React from 'react'
import { Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'

export interface MenuToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
}

export const MenuToggle = React.forwardRef<HTMLButtonElement, MenuToggleProps>(
  ({ variant, ...props }, ref) => {
    return (
      <Button variant={variant || 'ghost'} ref={ref} {...props}>
        <Menu />
      </Button>
    )
  }
)
MenuToggle.displayName = 'MenuToggle'
