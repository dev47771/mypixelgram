export const NotificationsEndpoints = {
   list: '/notifications',
   markAllRead: '/notifications/read-all',
   markRead: (id: string) => `/notifications/${id}/read`,
} as const
