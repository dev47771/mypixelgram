import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AddPhotoModal } from '.'
import { Alert } from '@/shared/components/Alert'

const meta = {
   component: AddPhotoModal,
   tags: ['autodocs'],
   title: 'Modals/AddPhotoModal',
} satisfies Meta<typeof AddPhotoModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      isOpen: true,
      onClose: () => {},
      onPhotoSelected: x => x,
   },
   render: args => {
      return (
         <>
            <Alert />
            <AddPhotoModal {...args} />
         </>
      )
   },
}
