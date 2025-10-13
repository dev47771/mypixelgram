import { ForgotPasswordForm } from './ForgotPasswordForm'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   component: ForgotPasswordForm,
   tags: ['autodocs'],
   title: 'Forms/ForgotPasswordForm',
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { onSubmitAction: x => x },
}
export const DisabledButton: Story = {
   args: { onSubmitAction: x => x, disabled: true },
}
