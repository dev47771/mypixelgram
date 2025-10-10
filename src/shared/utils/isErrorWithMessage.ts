export function isErrorWithMessage(error: unknown): error is { message: string; field: string }[] {
   return (
      typeof error === 'object' &&
      Array.isArray(error) &&
      error.length === 1 &&
      error[0].message &&
      error[0].field
      // typeof error === 'object' && // Проверяем, что error – это объект
      // error != null && // Убеждаемся, что это не null
      // 'message' in error && // Проверяем, что у объекта есть свойство 'message'
      // typeof error.message === 'string' // Убеждаемся, что 'message' это строка
   )
}
