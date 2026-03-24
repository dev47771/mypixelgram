import { Scroll } from '@/shared/components/Scroll'
import { DropDownSeparator } from '@/shared/components/DropDownMenu'
import { Loader } from '@/shared/components/Loader'
import { useAppDispatch, useInfiniteScroll } from '@/shared/hooks'
import { useCallback, useRef } from 'react'
import {
   decrementUnreadCount,
   useGetNotificationsInfiniteQuery,
   useMarkNotificationReadMutation,
} from '@/entities/notification'
import { Notification } from './Notification'
import { alert } from '@/shared/components/Alert'

type Props = {
   open: boolean
}

export const NotificationsList = ({ open }: Props) => {
   const [markRead] = useMarkNotificationReadMutation()
   const dispatch = useAppDispatch()

   const { data, isLoading, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
      useGetNotificationsInfiniteQuery(undefined, { skip: !open, refetchOnMountOrArgChange: true })

   const loadMore = useCallback(() => {
      if (hasNextPage && !isFetching) {
         fetchNextPage()
      }
   }, [hasNextPage, isFetching, fetchNextPage])

   const scrollRef = useRef<HTMLDivElement>(null)
   const observerRef = useInfiniteScroll(loadMore, { root: scrollRef.current, rootMargin: '100px' })
   const allNotifications = data?.pages.flatMap(page => page.items)

   const onReadSelect = async (id: string, status: 'readed' | 'unreaded') => {
      if (status !== 'readed') {
         try {
            await markRead(id).unwrap()
            dispatch(decrementUnreadCount())
         } catch {
            alert.error('Failed to mark notification as read')
         }
      }
   }

   if (isLoading) {
      return (
         <div className={'mt-3'}>
            <DropDownSeparator />
            <Loader fullscreen={false} size={'30px'} />
         </div>
      )
   }

   return (
      <Scroll ref={scrollRef} className={'h-[376px]'}>
         <DropDownSeparator />
         {!isLoading && allNotifications?.length === 0 && (
            <div className="py-4 text-center text-gray-500">No notifications yet</div>
         )}
         {allNotifications?.map(n => (
            <Notification
               key={n.id}
               notification={n}
               onSelect={() => onReadSelect(n.id, n.status)}
            />
         ))}
         {hasNextPage && isFetchingNextPage ? (
            <Loader fullscreen={false} size={'24px'} />
         ) : (
            <div ref={observerRef} className={'h-1'}></div>
         )}
      </Scroll>
   )
}
