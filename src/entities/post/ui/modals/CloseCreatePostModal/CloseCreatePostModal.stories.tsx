import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CloseCreatePostModal } from '@/entities/post/ui/modals/CloseCreatePostModal/CloseCreatePostModal'

const meta: Meta<typeof CloseCreatePostModal> = {
   title: 'Modals/CloseCreatePostModal',
   component: CloseCreatePostModal,
}

export default meta
type Story = StoryObj<typeof CloseCreatePostModal>

export const Default: Story = {
   args: {
      onSaveDraft: () => alert('save post to drafts'),
      onDiscard: () => alert('close postCreator'),
      onCloseModal: () => alert('close CloseCreatePostModal'),
   },
   render: args => {
      return (
         <>
            <CloseCreatePostModal {...args} />
         </>
      )
   },
}
