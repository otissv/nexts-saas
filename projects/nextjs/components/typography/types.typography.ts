export interface TypographyBaseProps {
  muted?: boolean
  variant?: 'default' | 'uppercase' | 'lowercase' | 'capitalize'
}

// @ts-ignore override size
export interface TypographyHeadingProps
  extends React.InputHTMLAttributes<HTMLHeadingElement>,
    TypographyBaseProps {}

// @ts-ignore override size
export interface TypographyParagraphProps
  extends React.InputHTMLAttributes<HTMLParagraphElement>,
    TypographyBaseProps {}

// @ts-ignore override size
export interface TypographyBlockquoteProps
  extends React.InputHTMLAttributes<HTMLQuoteElement>,
    TypographyBaseProps {}

// @ts-ignore override size
export interface TypographyOListProps
  extends React.InputHTMLAttributes<HTMLOListElement>,
    TypographyBaseProps {}

// @ts-ignore override size
export interface TypographyUListProps
  extends React.InputHTMLAttributes<HTMLUListElement>,
    TypographyBaseProps {}

// @ts-ignore override size
export interface TypographyElementProps
  extends React.InputHTMLAttributes<HTMLElement>,
    TypographyBaseProps {}

// @ts-ignore override size
export interface TypographyDivProps
  extends React.InputHTMLAttributes<HTMLDivElement>,
    TypographyBaseProps {}
