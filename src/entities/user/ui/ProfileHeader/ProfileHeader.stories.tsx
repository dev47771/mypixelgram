import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProfileHeader } from '@/entities/user/ui/ProfileHeader/ProfileHeader'

const meta = {
   title: 'entities/user/ProfileHeader',
   component: ProfileHeader,
} satisfies Meta<typeof ProfileHeader>

export default meta
type Story = StoryObj<typeof meta>

const mockUser = {
   id: '12',
   username: 'Username',
   avatarUrl: '',
   about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
   followers: 1000,
   following: 1000,
   publications: 1000,
}

export const OwnerPaid: Story = {
   args: {
      user: mockUser,
      isOwnerProfile: true,
      isPaidAccount: true,
   },
}

export const OwnerFree: Story = {
   args: {
      user: mockUser,
      isOwnerProfile: true,
      isPaidAccount: false,
   },
}

export const VisitorPaid: Story = {
   args: {
      user: mockUser,
      isOwnerProfile: false,
      isPaidAccount: true,
   },
}

export const VisitorFree: Story = {
   args: {
      user: mockUser,
      isOwnerProfile: false,
      isPaidAccount: false,
   },
}
