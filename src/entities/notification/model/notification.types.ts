export type NotificationType = {
   id: string
   userId: string
   title: string
   description: string
   status: 'readed' | 'unreaded'
   createdAt: string
   updatedAt: string
}

export type NotificationsResponse = {
   items: NotificationType[]
   hasMore: boolean
   nextCursor: string | null
}

export type NewNotificationSocketPayload = Pick<
   NotificationType,
   'id' | 'title' | 'description' | 'createdAt'
>
