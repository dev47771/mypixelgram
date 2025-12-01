'use client'
import type { SignInResponse } from '@/features/auth/api'
import { AuthEndpoints, PublicRoutes } from '@/shared/enums'
import { handleError } from '@/shared/utils'
import {
   type BaseQueryFn,
   type FetchArgs,
   fetchBaseQuery,
   type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { TOKEN } from '../constants'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
   baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
   credentials: 'include',

   prepareHeaders: headers => {
      if (typeof window !== 'undefined') {
         const token = localStorage.getItem(TOKEN)
         if (token) {
            headers.set('Authorization', `Bearer ${token}`)
         }
      }
      return headers
   },
})

export const baseQueryWithReAuth: BaseQueryFn<
   FetchArgs | string,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   await mutex.waitForUnlock()

   let result = await baseQuery(args, api, extraOptions)

   if (result.error && result.error.status === 401) {
      const token = localStorage.getItem(TOKEN)

      if (!token) return result

      if (!mutex.isLocked()) {
         const release = await mutex.acquire()
         // try to get a new token

         const refreshResult = await baseQuery(
            {
               method: 'POST',
               url: AuthEndpoints.refreshToken,
            },
            api,
            extraOptions
         )

         if (refreshResult.meta?.response?.status === 200) {
            // retry the initial query
            const data = refreshResult.data as SignInResponse
            if (data.accessToken) {
               localStorage.setItem(TOKEN, data.accessToken)
            }
            result = await baseQuery(args, api, extraOptions)
         } else {
            if (typeof window !== 'undefined') {
               localStorage.removeItem(TOKEN)
               const isSignInPage = window.location.pathname === PublicRoutes.signIn
               const isHomePage = window.location.pathname === PublicRoutes.main

               if (!isSignInPage && !isHomePage) {
                  window.location.href = PublicRoutes.signIn
               }
            }
         }
         release()
      } else {
         // wait until the mutex is available without locking it
         await mutex.waitForUnlock()
         result = await baseQuery(args, api, extraOptions)
      }
   }

   if (result.error) {
      handleError(api, result)
   }

   return result
}
