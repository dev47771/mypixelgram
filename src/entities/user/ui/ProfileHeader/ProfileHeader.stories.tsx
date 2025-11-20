import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProfileHeader } from '@/entities/user/ui/ProfileHeader/ProfileHeader'

const meta = {
   title: 'entities/user/ProfileHeader',
   component: ProfileHeader,
} satisfies Meta<typeof ProfileHeader>

export default meta
type Story = StoryObj<typeof meta>

const mockUser = {
   user: {
      id: '12',
      login: 'Username',
      avatar: '',
   },
   description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
   followers: 1000,
   following: 1000,
   publicationCount: 1000,
}

export const OwnerPaid: Story = {
   args: {
      userProfile: mockUser,
      isOwnerProfile: true,
      isPaidAccount: true,
   },
}

export const OwnerFree: Story = {
   args: {
      userProfile: mockUser,
      isOwnerProfile: true,
      isPaidAccount: false,
   },
}

export const VisitorPaid: Story = {
   args: {
      userProfile: mockUser,
      isOwnerProfile: false,
      isPaidAccount: true,
   },
}

export const VisitorFree: Story = {
   args: {
      userProfile: mockUser,
      isOwnerProfile: false,
      isPaidAccount: false,
   },
}
