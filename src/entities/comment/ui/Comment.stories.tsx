import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Comment } from './Comment'
import { Provider } from 'react-redux'
import { store } from '@/app/store'

const meta = {
   title: 'Comment',
   component: Comment,
   tags: ['autodocs'],
   parameters: {
      layout: 'centered',
   },
   globals: {
      backgrounds: { value: 'dark' },
   },
   decorators: [
      Story => (
         <Provider store={store}>
            <Story />
         </Provider>
      ),
   ],
} satisfies Meta<typeof Comment>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      comment: {
         userName: 'UserName',
         userAvatar:
            'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
         date: '2 Hours ago',
         likes: 1,
      },
   },
}
