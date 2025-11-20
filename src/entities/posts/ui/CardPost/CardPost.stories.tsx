import { CardPost } from '@/entities/posts/ui/CardPost'
import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LastPostProps } from '../schemas'

const samplePost: LastPostProps = {
   postId: '1',
   description:
      'Second long hardcoded post. This text is intentionally verbose and extensive to demonstrate how a description in a social media post can contain much more detail, reflections, and personal impressions about the visited location, weather, events that happened during the This text is intentionally verbose and extensive to demonstrate how a description',
   location: 'Minsk',
   file: [
      {
         url: './public/404.jpg',
         fileId: 'file-123', // ← добавить fileId
      },
   ],
   createdAt: new Date().toISOString(),
   user: {
      userId: '123',
      login: 'John Doe',
      avatar: null,
   },
}

const meta = {
   title: 'UI/CardPost',
   component: CardPost,
   parameters: {
      layout: 'centered',
   },
} satisfies Meta<typeof CardPost>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      ...samplePost,
   },
}
