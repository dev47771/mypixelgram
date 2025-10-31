import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PublicationModal } from './PublicationModal'

const meta: Meta<typeof PublicationModal> = {
   title: 'Features/Posts/PublicationModal',
   component: PublicationModal,
}
export default meta
type Story = StoryObj<typeof PublicationModal>

export const Default: Story = {
   args: {
      open: true,
      onConfirm: async () => {
         await Promise.resolve()
      },
      onCancel: () => {},
   },
}
