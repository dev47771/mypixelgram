import { Typography } from '@/shared/components/Typography'
import { DropDownMenuItem, DropDownSeparator } from '@/shared/components/DropDownMenu'
import type { NotificationType } from '@/entities/notification'
import React from 'react'
import { useRelativeTime } from '@/shared/hooks'

type Props = {
   notification: NotificationType
   onSelect?: () => void
}

export const Notification = ({ notification, onSelect }: Props) => {
   const relativeTime = useRelativeTime(notification.createdAt)

   return (
      <>
         <DropDownMenuItem
            onSelect={e => {
               e.preventDefault()
               onSelect?.()
            }}
         >
            <Typography variant="captionBold" className="mr-2 inline-block">
               {notification.title}
            </Typography>
            <Typography
               variant="captionRegular"
               as="span"
               className="text-accent-500 font-semiBold"
            >
               {notification.status === 'unreaded' && 'New'}
            </Typography>
            <Typography variant="captionRegular">{notification.description}</Typography>
            <Typography variant="smallRegular" as="span" className="text-light-900">
               {relativeTime}
            </Typography>
         </DropDownMenuItem>
         <DropDownSeparator />
      </>
   )
}
