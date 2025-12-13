export const dateFormatter = {
   serverToForm: (serverDate: string | null | undefined): string => {
      if (!serverDate || typeof serverDate !== 'string') return ''

      if (/^\d{2}\.\d{2}\.\d{4}$/.test(serverDate)) {
         return serverDate
      }

      try {
         const cleanDateStr = serverDate.trim()
         const date = new Date(cleanDateStr)

         if (isNaN(date.getTime())) {
            return ''
         }

         return new Intl.DateTimeFormat('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC',
         })
            .format(date)
            .replace(/[/]/g, '.')
      } catch {
         return ''
      }
   },

   formToServer: (formDate: string): string => {
      if (!formDate || typeof formDate !== 'string') return ''

      try {
         const cleanDate = formDate.trim()

         if (!/^\d{2}\.\d{2}\.\d{4}$/.test(cleanDate)) {
            return ''
         }

         const [day, month, year] = cleanDate.split('.').map(Number)

         if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
            return ''
         }

         const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0))

         if (
            date.getUTCFullYear() !== year ||
            date.getUTCMonth() !== month - 1 ||
            date.getUTCDate() !== day
         ) {
            return ''
         }

         return date.toISOString()
      } catch {
         return ''
      }
   },

   parseToDate: (str: string): Date | null => {
      if (!str || typeof str !== 'string') return null

      try {
         if (/^\d{2}\.\d{2}\.\d{4}$/.test(str.trim())) {
            const [day, month, year] = str.split('.').map(Number)
            return new Date(year, month - 1, day, 12, 0, 0)
         }

         if (str.includes('T') || /^\d{4}-\d{2}-\d{2}$/.test(str.trim())) {
            const date = new Date(str)
            return isNaN(date.getTime()) ? null : date
         }

         return null
      } catch {
         return null
      }
   },

   formatDate: (date: Date | null): string => {
      if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
         return ''
      }

      return new Intl.DateTimeFormat('ru-RU', {
         day: '2-digit',
         month: '2-digit',
         year: 'numeric',
      })
         .format(date)
         .replace(/[/]/g, '.')
   },

   isValid: (dateStr: string): boolean => {
      if (!dateStr || typeof dateStr !== 'string') return false

      try {
         if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr.trim())) {
            const [day, month, year] = dateStr.split('.').map(Number)

            if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1000) {
               return false
            }

            const date = new Date(year, month - 1, day)
            return (
               date.getFullYear() === year &&
               date.getMonth() === month - 1 &&
               date.getDate() === day
            )
         }

         const date = new Date(dateStr)
         return !isNaN(date.getTime())
      } catch {
         return false
      }
   },
}
