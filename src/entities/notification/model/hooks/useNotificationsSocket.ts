import { useEffect } from 'react'
import { createSocketConnect, SocketNamespace } from '@/shared/socket'
import {
   updateUnreadCount,
   NewNotificationSocketPayload,
   selectUnreadCount,
} from '@/entities/notification'

import { useAppDispatch } from '@/shared/hooks'
import { useAppSelector } from '@/app/store'

const NotificationSocketEvent = {
   NEW: 'notifications:new',
   UNREAD_COUNT: 'notifications:unread-count',
} as const

export const useNotificationsSocket = (
   addToast?: (toast: NewNotificationSocketPayload) => void
) => {
   const dispatch = useAppDispatch()

   const unreadNotificationCount = useAppSelector(selectUnreadCount)

   useEffect(() => {
      const socket = createSocketConnect(SocketNamespace.NOTIFICATIONS)

      const handleUnreadCount = (data: { unreadCount: number }) => {
         dispatch(updateUnreadCount(data.unreadCount))
      }

      const handleNewNotification = (data: NewNotificationSocketPayload) => {
         if (addToast) {
            addToast(data)
         }
      }

      socket?.on(NotificationSocketEvent.UNREAD_COUNT, handleUnreadCount)
      socket?.on(NotificationSocketEvent.NEW, handleNewNotification)

      return () => {
         socket?.off(NotificationSocketEvent.UNREAD_COUNT, handleUnreadCount)
         socket?.off(NotificationSocketEvent.NEW, handleNewNotification)
      }
   }, [addToast, dispatch])

   return { unreadNotificationCount }
}
