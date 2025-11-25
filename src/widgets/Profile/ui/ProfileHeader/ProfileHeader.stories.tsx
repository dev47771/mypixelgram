import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProfileHeader } from '@/widgets/Profile'

const meta = {
   title: 'entities/user/ProfileHeader',
   component: ProfileHeader,
} satisfies Meta<typeof ProfileHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      login: 'login',
   },
}
