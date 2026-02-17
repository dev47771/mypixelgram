// export type ToastType = {
//    id: string
//    status: 'read' | 'unread'
//    title: string
//    description: string
//    createdAt: string
// }

import { NewNotificationSocketPayload } from '@/entities/notification'

export type ToastUIType = NewNotificationSocketPayload & {
   timerId?: NodeJS.Timeout
}
