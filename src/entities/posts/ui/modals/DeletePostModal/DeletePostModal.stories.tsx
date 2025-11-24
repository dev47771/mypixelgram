import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DeletePostModal } from './DeletePostModal'

const meta: Meta<typeof DeletePostModal> = {
   title: 'Modals/DeletePostModal',
   component: DeletePostModal,
}

export default meta
type Story = StoryObj<typeof DeletePostModal>

export const DeletePostModalExample: Story = {
   args: {
      open: true,
   },
}
