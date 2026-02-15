import { useEffect, useState } from 'react'
import { createSocketConnect, SocketNamespace } from '@/shared/socket'
import type { NewNotificationSocketPayload } from '@/entities/notification'

const NotificationSocketEvent = {
   NEW: 'notifications:new',
   UNREAD_COUNT: 'notifications:unread-count',
} as const

export const useNotificationsSocket = () => {
   const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0)

   useEffect(() => {
      const socket = createSocketConnect(SocketNamespace.NOTIFICATIONS)

      const handleUnreadCount = (data: { unreadCount: number }) => {
         setUnreadNotificationCount(data.unreadCount)
         console.log(data)
      }

      const handleNewNotification = (data: NewNotificationSocketPayload) => {
         console.log('notifications', data)
      }

      socket?.on(NotificationSocketEvent.UNREAD_COUNT, handleUnreadCount)
      socket?.on(NotificationSocketEvent.NEW, handleNewNotification)

      return () => {
         socket?.off(NotificationSocketEvent.UNREAD_COUNT, handleUnreadCount)
         socket?.off(NotificationSocketEvent.NEW, handleNewNotification)
      }
   }, [])

   return { unreadNotificationCount }
}
