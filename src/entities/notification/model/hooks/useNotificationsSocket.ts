import { useEffect } from 'react'
import { createSocketConnect, SocketNamespace } from '@/shared/socket'
import {
   updateUnreadCount,
   NewNotificationSocketPayload,
   selectUnreadCount,
} from '@/entities/notification'
import { useAppSelector } from '@/shared/store'
import { useAppDispatch } from '@/shared/hooks'

const NotificationSocketEvent = {
   NEW: 'notifications:new',
   UNREAD_COUNT: 'notifications:unread-count',
} as const

export const useNotificationsSocket = () => {
   const dispatch = useAppDispatch()

   const unreadNotificationCount = useAppSelector(selectUnreadCount)

   useEffect(() => {
      const socket = createSocketConnect(SocketNamespace.NOTIFICATIONS)

      const handleUnreadCount = (data: { unreadCount: number }) => {
         dispatch(updateUnreadCount(data.unreadCount))
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
