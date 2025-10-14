import type { ErrorResponse } from '@/features/auth/api'

export function isErrorInArray(error: unknown): error is ErrorResponse {
   return (
      typeof error === 'object' &&
      error != null &&
      'errorsMessages' in error &&
      Array.isArray(error.errorsMessages) &&
      error.errorsMessages.length >= 1
   )
}
