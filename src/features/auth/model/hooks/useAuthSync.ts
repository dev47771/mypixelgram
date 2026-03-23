'use client'

import { baseApi } from '@/app/store'
import { userService } from '@/entities/user'
import { ROUTES } from '@/shared/constants'
import { useAppDispatch } from '@/shared/hooks/useAppDispatch'
import { authChannel } from '@/shared/lib/authBroadcast'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
            dispatch(userService.endpoints.me.initiate())
            router.replace(ROUTES.private.feed)
         }
      }

      authChannel.addEventListener('message', handler)

      return () => authChannel.removeEventListener('message', handler)
   }, [router, dispatch])
}
