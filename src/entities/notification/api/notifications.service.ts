import { baseApi } from '@/shared/store'
import type { NotificationsResponse } from '@/entities/notification'
import { NotificationsEndpoints } from '@/shared/enums'

export const notificationService = baseApi.injectEndpoints({
   endpoints: builder => ({
      getNotifications: builder.infiniteQuery<NotificationsResponse, void, string | undefined>({
         infiniteQueryOptions: {
            initialPageParam: undefined,
            getNextPageParam: lastPage => lastPage.nextCursor,
         },
         query: ({ pageParam }) => ({
            url: NotificationsEndpoints.list,
            params: { cursor: pageParam },
         }),
         providesTags: ['Notification'],
      }),
      markAllNotificationsRead: builder.mutation<void, void>({
         query: () => ({
            url: NotificationsEndpoints.markAllRead,
            method: 'POST',
         }),
         invalidatesTags: ['Notification'],
      }),
      markNotificationRead: builder.mutation<void, string>({
         query: id => ({
            url: NotificationsEndpoints.markRead(id),
            method: 'POST',
         }),
         invalidatesTags: ['Notification'],
      }),
   }),
})

export const {
   useGetNotificationsInfiniteQuery,
   useMarkAllNotificationsReadMutation,
   useMarkNotificationReadMutation,
} = notificationService
