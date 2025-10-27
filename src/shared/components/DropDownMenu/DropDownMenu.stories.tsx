import { DropDownMenu, DropDownMenuLabel } from '@/shared/components/DropDownMenu/index'
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
import { DropDownMenuItem } from '@/shared/components/DropDownMenu/DropDownMenuItem'
import { DropDownSeparator } from '@/shared/components/DropDownMenu/DropDownSeparator'
import { Typography } from '@/shared/components/Typography'
import { DropDownMenuArrow } from '@/shared/components/DropDownMenu/DropDownMenuArrow'
import { DropDownMenuTrigger } from '@/shared/components/DropDownMenu/DropDownMenuTrigger'

const meta = {
   component: DropDownMenu,
   parameters: {
      layout: 'centered',
   },
   argTypes: {
      align: {
         control: { type: 'radio' },
         options: ['end', 'start', 'center'],
      },
      trigger: {
         control: false,
      },
   },
   tags: ['autodocs'],
   title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const NotificationDropDownWithScroll: Story = {
   args: {
      trigger: (
         <DropDownMenuTrigger>
            <NotificationIcon count={3} />
         </DropDownMenuTrigger>
      ),
   },

   render: args => {
      return (
         <DropDownMenu
            trigger={args.trigger}
            align={'end'}
            label={'Notification'}
            className={'px-2 py-1'}
            sideOffset={-4}
         >
            <DropDownMenuArrow>
               <span></span>
            </DropDownMenuArrow>

            <DropDownSeparator />

            <DropDownMenuItem>
               <Typography variant="h3"> Новое уведомление!</Typography>
               <Typography as="span">новое</Typography>
               <Typography>Следующий платеж у вас спишется через 1 день</Typography>
               <Typography variant="captionRegular">1 час назад</Typography>
            </DropDownMenuItem>

            <DropDownSeparator />

            <DropDownMenuItem>
               <Typography variant="h3"> Новое уведомление!</Typography>
               <Typography as="span">новое</Typography>
               <Typography>Следующий платеж у вас спишется через 1 день</Typography>
               <Typography variant="captionRegular">1 час назад</Typography>
            </DropDownMenuItem>

            <DropDownSeparator />

            <DropDownMenuItem>
               <Typography variant="h3"> Новое уведомление!</Typography>
               <Typography as="span">новое</Typography>
               <Typography>Следующий платеж у вас спишется через 1 день</Typography>
               <Typography variant="captionRegular">1 час назад</Typography>
            </DropDownMenuItem>
         </DropDownMenu>
      )
   },
}

export const NotificationDropDown: Story = {
   args: {
      trigger: (
         <DropDownMenuTrigger>
            <NotificationIcon count={2} />
         </DropDownMenuTrigger>
      ),
   },

   render: args => {
      return (
         <DropDownMenu trigger={args.trigger} align={'end'} className={'px-2 py-1'} sideOffset={-4}>
            <DropDownMenuArrow>
               <span></span>
            </DropDownMenuArrow>

            <DropDownMenuLabel>Notification</DropDownMenuLabel>

            <DropDownSeparator />

            <DropDownMenuItem>
               <Typography variant="h3"> Новое уведомление!</Typography>
               <Typography as="span">новое</Typography>
               <Typography>Следующий платеж у вас спишется через 1 день</Typography>
               <Typography variant="captionRegular">1 час назад</Typography>
            </DropDownMenuItem>
         </DropDownMenu>
      )
   },
}

export const MoreDropDown: Story = {
   args: {
      trigger: (
         <DropDownMenuTrigger className={'data-[state=open]:text-accent-500'}>
            <MoreIcon />
         </DropDownMenuTrigger>
      ),
   },

   render: args => {
      const dropDownItems = [
         { icon: <EditIcon />, value: 'Edit post' },
         { icon: <TrashIcon />, value: 'Delete post' },
         { icon: <UnfollowIcon />, value: 'Unfollow' },
         { icon: <FollowIcon />, value: 'Follow' },
         { icon: <CopyIcon />, value: 'Copy link' },
      ]

      return (
         <DropDownMenu trigger={args.trigger} alignOffset={0}>
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
