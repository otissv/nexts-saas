import { isDev } from '@/lib/utils'
import { z } from 'zod'
import { createErrorResponse } from './response-error'

export function validate<Validator extends z.ZodTypeAny>(
  validator: Validator,
  message: string = 'Invalid data',
  code: number = 422,
  type?: 'input' | 'system'
) {
  return <Data>(data: Data): Data => {
    try {
      return validator.parse(data)
    } catch (error) {
      const responseError = createErrorResponse({
        name: 'ValidationError',
        message,
        // @ts-ignore
        issues: error.issues || [],
        // @ts-ignore
        code: code,
        // @ts-ignore
        type: type,
        // @ts-ignore
        ...(isDev() ? { stack: error.stack } : {}),
      })

      throw responseError
    }
  }
}
