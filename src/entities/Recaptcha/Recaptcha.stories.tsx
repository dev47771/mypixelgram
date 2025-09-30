import { Recaptcha } from '@/entities/Recaptcha/Recaptcha'
import { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
   component: Recaptcha,
   tags: ['autodocs'],
   title: 'Components/Recaptcha',
} satisfies Meta<typeof Recaptcha>

export default meta
type Story = StoryObj<typeof meta>

export const InitState: Story = {
   args: {
      status: 'init',
   },
}

export const LoadingState: Story = {
   args: {
      status: 'loading',
   },
}

export const SuccessState: Story = {
   args: {
      status: 'success',
   },
}
export const ErrorState: Story = {
   args: {
      status: 'error',
   },
}
export const ExpiredState: Story = {
   args: {
      status: 'expired',
   },
}
