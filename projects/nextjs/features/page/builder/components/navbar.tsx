import * as React from "react"

import { NavAppBar } from "@/components/nav/nav-app-bar"

const Navigation = ({ id, items, ...props }) => {
  return <NavAppBar items={items} data-editor={`${id}-root`} {...props} />
}
Navigation.displayName = "Navigation"

export default Navigation
