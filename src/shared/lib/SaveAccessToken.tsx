'use client'

import { authStorage } from '@/shared/lib/authStorage'
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
