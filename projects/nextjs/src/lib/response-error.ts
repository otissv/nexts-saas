export interface ResponseErrorProps {
  message: string
  name: string
  code?: number
  issues?: Record<string, any>[]
  stack?: string
}

export function createErrorResponse({
  message,
  name,
  code,
  issues,
  stack,
}: ResponseErrorProps) {
  return {
    message: message,
    name: name || 'ResponseError',
    code: code || 422,
    issues: issues || [],
    stack: stack,
  }
}
