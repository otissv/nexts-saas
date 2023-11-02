import { cn } from "@/lib/utils"

export interface PropertyLabelProps
  extends React.HTMLAttributes<HTMLLabelElement> {}

export const PropertyLabel = ({
  className,
  children,
  ...props
}: PropertyLabelProps) => {
  return (
    <label
      className={cn(
        "inline-flex w-28 text-xs font-medium items-center text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
PropertyLabel.displayName = "PropertyLabel"

export interface PropertiesContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string
}

export const PropertiesContainer = ({
  heading,
  children,
  className,
  ...props
}: PropertiesContainerProps) => {
  return (
    <div className={cn("mb-1", className)} {...props}>
      {heading && <div className="my-4 text-xs font-medium">{heading}</div>}
      {children}
    </div>
  )
}
PropertiesContainer.displayName = "PropertiesContainer"
