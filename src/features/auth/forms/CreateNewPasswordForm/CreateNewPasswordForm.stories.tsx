import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CreateNewPasswordForm } from './CreateNewPasswordForm'

const meta = {
   component: CreateNewPasswordForm,
   tags: ['autodocs'],
   title: 'Forms/CreateNewPasswordForm',
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { onSubmitAction: x => x },
}
