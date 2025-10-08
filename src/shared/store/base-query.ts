import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
   baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
   prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken')
      if (token) {
         headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
   },
   credentials: 'include',
})
