import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { EditPostModal } from '@/entities/posts/ui/modals/EditPostModal'
import { mockPost } from '@/entities/posts/ui/Post/Post.stories'

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
