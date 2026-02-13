'use client'

import { useEffect } from 'react'
import { ToastType } from '..'
import { createSocketConnect, SocketNamespace } from '@/shared/socket'

export const useToastNotifications = (addToast: (toast: ToastType) => void) => {
   useEffect(() => {
      const socket = createSocketConnect(SocketNamespace.NOTIFICATIONS)

      socket?.on('notifications:new', data => {
         addToast(data)
      })

      return () => {
         socket?.off('notifications:new')
      }
   }, [addToast])
}
