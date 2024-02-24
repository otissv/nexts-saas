import { notFound } from 'next/navigation'

import { getRequestConfig } from 'next-intl/server'
import yaml from 'js-yaml'
import fs from 'fs'

export const defaultLocale = 'en'

export const locales = ['en', 'de']

export function getTranslation(locale: string) {
  try {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound()

    // load yaml file and convert to json
    return yaml.load(
      fs.readFileSync(`./translations/${locale || defaultLocale}.yml`, 'utf8')
    ) as any
  } catch (e) {
    console.error(e)
    return {}
  }
}

export default getRequestConfig(({ locale }: { locale: string }) => {
  return {
    messages: getTranslation(locale),
  }
})
