import { getTranslation } from '@/i18n'
import { NextIntlClientProvider } from 'next-intl'

export const TranslationProvider = ({
  locale,
  ...props
}: {
  locale: string
  children: React.ReactNode
}) => {
  const messages = getTranslation(locale)

  return (
    <NextIntlClientProvider locale={locale} messages={messages} {...props} />
  )
}
TranslationProvider.displayName = 'TranslationProvider'
