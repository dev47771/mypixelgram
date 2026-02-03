'use client'

import { authStorage } from '@/features/auth/model/authStorage'
import { useLayoutEffect } from 'react'
type Props = {
   accessToken: string
}

export function SaveAccessToken({ accessToken }: Props) {
   useLayoutEffect(() => {
      if (accessToken && typeof window !== 'undefined') {
         authStorage.setToken(accessToken)
      }
   }, [accessToken])
   return null
}
