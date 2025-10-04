import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Header } from './Header'

const meta = {
   title: 'widgets/Header',
   component: Header,
   parameters: {
      backgrounds: { default: 'dark' },
   },
   tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {}
