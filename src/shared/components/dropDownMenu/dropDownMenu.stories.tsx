import { DropDownMenu, DropDownMenuProps } from '@/shared/components/dropDownMenu/index'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
   CopyIcon,
   EditIcon,
   FollowIcon,
   MoreIcon,
   NotificationIcon,
   TrashIcon,
   UnfollowIcon,
} from '@/shared/icons'
import { DropDownMenuItem } from '@/shared/components/dropDownMenu/dropDownMenuItem'
import { DropDownSeparator } from '@/shared/components/dropDownMenu/dropDownSeparator'
import { Typography } from '@/shared/components/Typography'
import { Fragment } from 'react'
import { DropDownMenuArrow } from '@/shared/components/dropDownMenu/dropDownMenuArrow'

const meta = {
   component: DropDownMenu,
   parameters: {
      layout: 'centered',
      controls: {
         exclude: ['trigger', 'children'],
      },
   },
   argTypes: {
      align: {
         control: { type: 'radio' },
         options: ['end', 'start', 'center'],
      },
      label: {
         control: { type: 'text' },
      },
   },
   tags: ['autodocs'],
   title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

const generateNotifications = (count: number) =>
   Array.from({ length: count }, (_, i) => ({
      id: i,
      title: 'Новое уведомление!',
      subtitle: 'Новое',
      description: 'Следующий платеж у вас спишется через 1 день',
      timestamp: '1 час назад',
   }))

const NotificationDropDownTemplate = ({
   count,
   label,
   align = 'end',
   className,
   ...rest
}: { count: number } & Omit<DropDownMenuProps, 'trigger'>) => {
   const trigger = <NotificationIcon count={count} />
   const notifications = generateNotifications(count)

   return (
      <DropDownMenu
         trigger={trigger}
         align={align}
         label={label}
         className={className}
         sideOffset={-5}
         {...rest}
      >
         <DropDownMenuArrow>
            <span></span>
         </DropDownMenuArrow>
         {notifications.map(({ id, title, subtitle, description, timestamp }) => (
            <Fragment key={id}>
               {label && <DropDownSeparator />}
               <DropDownMenuItem>
                  <Typography variant="h3">{title}</Typography>
                  <Typography as="span">{subtitle}</Typography>
                  <Typography>{description}</Typography>
                  <Typography variant="captionRegular">{timestamp}</Typography>
               </DropDownMenuItem>
            </Fragment>
         ))}
      </DropDownMenu>
   )
}

export const NotificationDropDownManyNotifications: Story = {
   args: {
      label: 'Notification',
   },
   render: args => NotificationDropDownTemplate({ count: 7, className: 'px-2 py-1', ...args }),
}

export const NotificationDropDown: Story = {
   args: {
      label: 'Notification',
   },
   render: args => NotificationDropDownTemplate({ count: 2, ...args }),
}

export const MoreDropDown: Story = {
   render: () => {
      const trigger = <MoreIcon />
      const dropDownItems = [
         { icon: <EditIcon />, value: 'Edit post' },
         { icon: <TrashIcon />, value: 'Delete post' },
         { icon: <UnfollowIcon />, value: 'Unfollow' },
         { icon: <FollowIcon />, value: 'Follow' },
         { icon: <CopyIcon />, value: 'Copy link' },
      ]

      return (
         <DropDownMenu trigger={trigger} alignOffset={0}>
            {dropDownItems.map(({ icon, value }) => (
               <DropDownMenuItem key={value} className={'flex items-center gap-3 p-3'}>
                  {icon}
                  <Typography variant={'captionRegular'} as={'span'}>
                     {value}
                  </Typography>
               </DropDownMenuItem>
            ))}
         </DropDownMenu>
      )
   },
}
