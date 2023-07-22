import { NextIntlClientProvider } from 'next-intl'

export const TranslationProvider = ({
  locale,
  getTranslation,
  ...props
}: {
  locale: string
  children: React.ReactNode
  getTranslation: (locale: string) => any
}) => {
  const messages = getTranslation(locale)

  return (
    <NextIntlClientProvider locale={locale} messages={messages} {...props} />
  )
}
TranslationProvider.displayName = 'TranslationProvider'
