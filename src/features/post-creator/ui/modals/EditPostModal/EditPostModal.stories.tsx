import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EditPostModal } from '@/features/post-creator/ui/modals/EditPostModal'
import { mockPost } from '@/entities/post/ui/Post/Post.stories'

const meta = {
   component: EditPostModal,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Modals/EditPostModal',
} satisfies Meta<typeof EditPostModal>

export default meta
type Story = StoryObj<typeof meta>

export const EditPost: Story = {
   args: {
      post: mockPost,
      onCloseAction: () => {},
   },
}
