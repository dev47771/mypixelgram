import { DropDownMenu } from '@/shared/components/DropDownMenu'
import { DropDownMenuTrigger } from '@/shared/components/DropDownMenu/DropDownMenuTrigger'
import { NotificationIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'
import {
   updateUnreadCount,
   useMarkAllNotificationsReadMutation,
   useNotificationsSocket,
   setDropdownOpen,
   selectIsDropdownOpen,
} from '@/entities/notification'
import { DropDownMenuArrow } from '@/shared/components/DropDownMenu/DropDownMenuArrow'
import { NotificationsList } from './NotificationsList'
import { alert } from '@/shared/components/Alert'
import { useAppDispatch } from '@/shared/hooks'
import { useAppSelector } from '@/shared/store'

export const NotificationsDropdown = () => {
   const dispatch = useAppDispatch()
   const isDropdownOpen = useAppSelector(selectIsDropdownOpen)

   const { unreadNotificationCount } = useNotificationsSocket()
   const [markAllRead] = useMarkAllNotificationsReadMutation()

   const onReadAllClick = async () => {
      try {
         await markAllRead().unwrap()
         dispatch(updateUnreadCount(0))
      } catch {
         alert.error('Failed to mark notifications as read')
      }
   }

   return (
      <DropDownMenu
         trigger={
            <DropDownMenuTrigger>
               <NotificationIcon count={unreadNotificationCount} />
            </DropDownMenuTrigger>
         }
         align={'end'}
         className={'w-[355px] px-2 py-1'}
         sideOffset={-4}
         label="Notifications"
         headerContent={
            <Button
               variant={'textButton'}
               onClick={onReadAllClick}
               disabled={unreadNotificationCount === 0}
            >
               Read all
            </Button>
         }
         open={isDropdownOpen} //
         onOpenChange={open => dispatch(setDropdownOpen(open))}
      >
         <DropDownMenuArrow>
            <span></span>
         </DropDownMenuArrow>

         <NotificationsList open={isDropdownOpen} />
      </DropDownMenu>
   )
}
