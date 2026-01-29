import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { OkModal } from '@/entities/common/ui'

const meta: Meta<typeof OkModal> = {
   title: 'Modals/OkModal',
   component: OkModal,
}

export default meta
type Story = StoryObj<typeof OkModal>

export const SuccessPayment: Story = {
   args: {
      open: true,
      title: 'Success',
      description: `Payment was successful!`,
      buttonText: 'OK',
   },
}

export const ErrorPayment: Story = {
   args: {
      open: true,
      title: 'Error',
      description: `Transaction failed. Please, write to support`,
      buttonText: 'Back to payment',
   },
}
