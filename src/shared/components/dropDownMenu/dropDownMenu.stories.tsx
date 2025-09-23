import { DropDownMenu, DropDownMenuLabel } from '@/shared/components/dropDownMenu/index'
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
import { DropDownMenuArrow } from '@/shared/components/dropDownMenu/dropDownMenuArrow'

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
   },
   tags: ['autodocs'],
   title: 'Components/DropDownMenu',
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const NotificationDropDownWithScroll: Story = {
   render: () => {
      const trigger = <NotificationIcon count={3} />

      return (
         <DropDownMenu
            trigger={trigger}
            align={'end'}
            label={'Notification'}
            className={'px-2 py-1'}
            sideOffset={-5}
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
   render: () => {
      const trigger = <NotificationIcon count={2} />

      return (
         <DropDownMenu trigger={trigger} align={'end'} className={'px-2 py-1'} sideOffset={-5}>
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
