import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CancelEditModal } from './CancelEditModal'

const meta: Meta<typeof CancelEditModal> = {
   title: 'Modals/CancelEditModal',
   component: CancelEditModal,
}

export default meta
type Story = StoryObj<typeof CancelEditModal>

export const CancelEditModalExample: Story = {
   args: {},
}
