import { getRequestConfig } from 'next-intl/server'
import yaml from 'js-yaml'
import fs from 'fs'

export function getTranslation(locale: string) {
  try {
    if (locale === 'favicon.ico') return {}

    // load yaml file and convert to json
    return yaml.load(
      fs.readFileSync(`./translations/${locale}.yml`, 'utf8')
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
