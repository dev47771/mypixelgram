// utils/dateFormatter.ts
export const dateFormatter = {
   // Сервер → Форма: "2002-05-10T00:00:00.000Z" → "10.05.2002"
   serverToForm: (serverDate: string): string => {
      if (!serverDate || typeof serverDate !== 'string') return ''

      // Если уже в формате dd.mm.yyyy
      if (/^\d{2}\.\d{2}\.\d{4}$/.test(serverDate)) {
         return serverDate
      }

      try {
         const cleanDateStr = serverDate.trim()
         const date = new Date(cleanDateStr)

         if (isNaN(date.getTime())) {
            return ''
         }

         // Используем UTC чтобы избежать проблем с часовыми поясами
         const day = date.getUTCDate().toString().padStart(2, '0')
         const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
         const year = date.getUTCFullYear()

         return `${day}.${month}.${year}`
      } catch {
         return ''
      }
   },

   // Форма → Сервер: "10.05.2002" → "2002-05-10T00:00:00.000Z"
   formToServer: (formDate: string): string => {
      if (!formDate || !formDate.includes('.')) return ''

      try {
         const [day, month, year] = formDate.split('.').map(Number)

         // Создаём дату в UTC чтобы избежать сдвигов
         const date = new Date(Date.UTC(year, month - 1, day))

         if (isNaN(date.getTime())) return ''

         // Возвращаем ISO строку
         return date.toISOString() // "2002-05-10T00:00:00.000Z"
      } catch {
         return ''
      }
   },

   // Парсинг строки в Date (для DatePicker)
   parseToDate: (str: string): Date | null => {
      if (!str) return null

      try {
         if (/^\d{2}\.\d{2}\.\d{4}$/.test(str)) {
            const [day, month, year] = str.split('.').map(Number)
            // Создаём локальную дату (для отображения в DatePicker)
            return new Date(year, month - 1, day)
         }

         if (str.includes('T') || str.includes('-')) {
            const date = new Date(str)
            return isNaN(date.getTime()) ? null : date
         }

         return null
      } catch {
         return null
      }
   },

   // Форматирование Date в строку (для DatePicker)
   formatDate: (date: Date | null): string => {
      if (!date || isNaN(date.getTime())) return ''

      // Используем локальное время для отображения
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()

      return `${day}.${month}.${year}`
   },

   // Проверка валидности даты
   isValid: (dateStr: string): boolean => {
      if (!dateStr) return false

      try {
         // Для dd.mm.yyyy
         if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) {
            const [day, month, year] = dateStr.split('.').map(Number)
            const date = new Date(year, month - 1, day)
            return !isNaN(date.getTime())
         }

         // Для ISO
         const date = new Date(dateStr)
         return !isNaN(date.getTime())
      } catch {
         return false
      }
   },
}
