import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CreateNewPassword } from './CreateNewPassword'

const meta = {
   component: CreateNewPassword,
   tags: ['autodocs'],
   title: 'Forms/CreateNewPassword',
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { onSubmit: x => x },
}
