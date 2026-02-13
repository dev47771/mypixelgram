import { DropDownMenu } from '@/shared/components/DropDownMenu'
import { DropDownMenuTrigger } from '@/shared/components/DropDownMenu/DropDownMenuTrigger'
import { NotificationIcon } from '@/shared/icons'
import { Button } from '@/shared/components/Button'
import {
   useMarkAllNotificationsReadMutation,
   useNotificationsSocket,
} from '@/entities/notification'
import { useState } from 'react'
import { DropDownMenuArrow } from '@/shared/components/DropDownMenu/DropDownMenuArrow'
import { NotificationsList } from './NotificationsList'
import { alert } from '@/shared/components/Alert'

export const NotificationsDropdown = () => {
   const [openMenu, setOpenMenu] = useState(false)

   const { unreadNotificationCount } = useNotificationsSocket()

   const [markAllRead] = useMarkAllNotificationsReadMutation()

   const onReadAllClick = async () => {
      try {
         await markAllRead().unwrap()
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
            <Button variant={'textButton'} onClick={onReadAllClick}>
               Read all
            </Button>
         }
         open={openMenu}
         onOpenChange={open => setOpenMenu(open)}
      >
         <DropDownMenuArrow>
            <span></span>
         </DropDownMenuArrow>

         <NotificationsList open={openMenu} />
      </DropDownMenu>
   )
}
