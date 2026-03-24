import { TOKEN } from '@/shared/constants'

export const authStorage = {
   getToken() {
      if (typeof window === 'undefined') {
         return null
      }

      try {
         return localStorage.getItem(TOKEN)
      } catch (error) {
         console.error('Error getting token from localStorage:', error)
         return null
      }
   },

   setToken(token: string) {
      if (typeof window === 'undefined') {
         return
      }

      try {
         localStorage.setItem(TOKEN, token)
      } catch (error) {
         console.error('Error setting token in localStorage:', error)
      }
   },

   removeToken() {
      if (typeof window === 'undefined') {
         return
      }

      try {
         localStorage.removeItem(TOKEN)
      } catch (error) {
         console.error('Error removing token from localStorage:', error)
      }
   },

   hasToken() {
      if (typeof window === 'undefined') {
         return false
      }
      return this.getToken() !== null
   },
}
