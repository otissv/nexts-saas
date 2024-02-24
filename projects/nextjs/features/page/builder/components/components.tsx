export const components = {
  section: require('./sections/section')
    .default,
  section01:
    require('./sections/section01')
      .default,
  section02:
    require('./sections/section02')
      .default,
  section03:
    require('./sections/section03')
      .default,
  scrollable:
    require('./sections/scrollable')
      .default,
  slider: require('./sections/slider')
    .default,

  typography: require('./text').default,
  blockquote: require('./text').default,
  code: require('./text').default,
  h1: require('./text').default,
  h2: require('./text').default,
  h3: require('./text').default,
  h4: require('./text').default,
  p: require('./text').default,
  navbar1: require('./navbar').default,
  row: (props: any) => <div {...props} />,
  column: (props: any) => <div {...props} />,
  // row: require('@/features/page/builder/components/blocks').RowBlock,
  // column: require('./blocks')
  //   .ColumnBlock,
} as const