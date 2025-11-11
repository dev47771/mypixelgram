import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { YesAndNoModal } from './YesAndNoModal'

const meta: Meta<typeof YesAndNoModal> = {
   title: 'Modals/YesAndNoModal',
   component: YesAndNoModal,
}

export default meta
type Story = StoryObj<typeof YesAndNoModal>

export const LogoutExample: Story = {
   args: {
      open: true,
      title: 'Log Out',
      description: `Are you really want to log out of your account “Epam@epam.com”?`,
      confirmText: 'Yes',
      cancelText: 'No',
      onConfirm: () => alert('Confirmed!'),
      onCancel: () => alert('Cancelled!'),
   },
}
