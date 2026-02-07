import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Post } from './Post'
import type { PostByIdType } from '@/features/post/api'
import { Provider } from 'react-redux'
import { store } from '@/app/store'

const meta = {
   title: 'Post',
   component: Post,
   parameters: {
      layout: 'centered',
   },
   decorators: [
      Story => (
         <Provider store={store}>
            <Story />
         </Provider>
      ),
   ],
} satisfies Meta<typeof Post>

export default meta
type Story = StoryObj<typeof meta>

// const mockComment = {
//    userAvatar:
//       'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
//    userName: 'UserName',
//    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//    date: '2 Hours ago',
// }

export const mockPost: PostByIdType = {
   postId: '1',
   user: {
      id: '23',
      login: 'hottabych',
      avatar:
         'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
   },
   images: [
      {
         url: 'https://i.pinimg.com/736x/be/39/7c/be397c91b8026b17f5f8a6ed98e23e9e.jpg',
         fileId: '1',
      },
      {
         url: 'https://cdn.fishki.net/upload/post/2021/02/16/3613245/tn/alberta-2297204-1280.jpg',
         fileId: '2',
      },
      {
         url: 'https://kulturologia.ru/files/u18172/181725398.jpg',
         fileId: '3',
      },
   ],
   description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
   //updatedAt: '2 Hours ago',
   updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
   // comments: [
   //    mockComment,
   //    {
   //       ...mockComment,
   //       likes: 1,
   //    },
   // ],
   likesCount: 2243,
   createdAt: 'July 3, 2021',
   location: null,
   userLikeStatus: 'None',
}

export const Default: Story = {
   args: {
      post: mockPost,
   },
}
