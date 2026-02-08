'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authChannel } from '@/shared/lib/authBroadcast'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { ROUTES } from '@/shared/constants'
import { authService } from '@/features/auth/api'
import { baseApi } from '@/app/store'

export const useAuthSync = () => {
   const router = useRouter()
   const dispatch = useAppDispatch()

   useEffect(() => {
      const handler = (event: MessageEvent) => {
         const { type } = event.data

         if (type === 'LOGOUT') {
            dispatch(baseApi.util.resetApiState())
            router.replace(ROUTES.public.signIn)
         }

         if (type === 'LOGIN') {
            dispatch(authService.endpoints.me.initiate())
            router.replace(ROUTES.private.feed)
         }
      }

      authChannel.addEventListener('message', handler)

      return () => authChannel.removeEventListener('message', handler)
   }, [router, dispatch])
}
