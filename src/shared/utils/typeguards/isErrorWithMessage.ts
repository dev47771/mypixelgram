export function isErrorWithMessage(error: unknown): error is { message: string; meta: string } {
   return (
      typeof error === 'object' &&
      error != null &&
      'message' in error &&
      typeof error.message === 'string'
   )
}
