import { Avatar } from './Avatar'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   title: 'Components/Avatar',
   component: Avatar,
   parameters: {
      layout: 'centered',
   },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithAvatar: Story = {
   args: {
      src: './public/logo-light.png',
      alt: 'John Doe',
      size: 48,
   },
}

export const Default: Story = {
   args: {
      size: 48,
   },
}
