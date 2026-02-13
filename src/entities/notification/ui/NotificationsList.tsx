import { Scroll } from '@/shared/components/Scroll'
import { DropDownSeparator } from '@/shared/components/DropDownMenu'
import { Loader } from '@/shared/components/Loader'
import { useInfiniteScroll } from '@/shared/hooks'
import { useCallback, useEffect, useRef } from 'react'
import {
   useGetNotificationsInfiniteQuery,
   useMarkNotificationReadMutation,
} from '@/entities/notification'
import { Notification } from './Notification'

type Props = {
   open: boolean
}

export const NotificationsList = ({ open }: Props) => {
   const [markRead] = useMarkNotificationReadMutation()

   const { data, isLoading, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, refetch } =
      useGetNotificationsInfiniteQuery(undefined, { skip: !open })

   const loadMore = useCallback(() => {
      if (hasNextPage && !isFetching) {
         fetchNextPage()
      }
   }, [hasNextPage, isFetching, fetchNextPage])

   const scrollRef = useRef<HTMLDivElement>(null)
   const observerRef = useInfiniteScroll(loadMore, { root: scrollRef.current, rootMargin: '100px' })
   const allNotifications = data?.pages.flatMap(page => page.items)

   const onReadSelect = (id: string, status: 'readed' | 'unreaded') => {
      if (status !== 'readed') {
         markRead(id)
      }
   }

   useEffect(() => {
      if (open) {
         // refetch()
      }
   }, [open, refetch])

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
