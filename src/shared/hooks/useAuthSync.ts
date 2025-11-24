'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authChannel } from '@/shared/lib/authBroadcast'
import { baseApi } from '@/shared/store'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { PublicRoutes } from '@/shared/enums'
import { authService } from '@/features/auth/api'

export const useAuthSync = () => {
   const router = useRouter()
   const dispatch = useAppDispatch()

   useEffect(() => {
      const handler = (event: MessageEvent) => {
         const { type } = event.data

         if (type === 'LOGOUT') {
            dispatch(baseApi.util.resetApiState())
            window.location.href = PublicRoutes.signIn
         }

         if (type === 'LOGIN') {
            dispatch(authService.endpoints.me.initiate())
         }
      }

      authChannel.addEventListener('message', handler)

      return () => authChannel.removeEventListener('message', handler)
   }, [router, dispatch])
}
