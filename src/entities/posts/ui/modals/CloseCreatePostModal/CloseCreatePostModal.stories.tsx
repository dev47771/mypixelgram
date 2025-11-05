import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CloseCreatePostModal } from '@/entities/posts/ui/modals/CloseCreatePostModal/CloseCreatePostModal'

const meta: Meta<typeof CloseCreatePostModal> = {
   title: 'Modals/CloseCreatePostModal',
   component: CloseCreatePostModal,
}

export default meta
type Story = StoryObj<typeof CloseCreatePostModal>

export const Default: Story = {
   args: {
      isOpen: true,
      onSaveDraft: () => alert('close postCreator'),
      onDiscard: () => alert('close this modal'),
   },
   render: args => {
      return (
         <>
            <CloseCreatePostModal {...args} />
         </>
      )
   },
}
