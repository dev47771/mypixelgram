import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AddPhotoModal } from '.'

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
      onOpenChange: x => x,
   },
   render: args => {
      return (
         <>
            <AddPhotoModal {...args} />
         </>
      )
   },
}
