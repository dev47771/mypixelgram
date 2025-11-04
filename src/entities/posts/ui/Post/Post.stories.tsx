import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Post } from './Post'

const meta = {
   title: 'Post',
   component: Post,
   parameters: {
      layout: 'centered',
   },
} satisfies Meta<typeof Post>

export default meta
type Story = StoryObj<typeof meta>

const mockComment = {
   userAvatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
   userName: 'UserName',
   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
   date: '2 Hours ago',
}

const mockPost = {
   id: '1',
   userId: '23',
   images: [
      'https://i.pinimg.com/736x/be/39/7c/be397c91b8026b17f5f8a6ed98e23e9e.jpg',
      'https://cdn.fishki.net/upload/post/2021/02/16/3613245/tn/alberta-2297204-1280.jpg',
      'https://kulturologia.ru/files/u18172/181725398.jpg',
   ],

   userAvatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
   userName: 'UserName',
   description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
   date: '2 Hours ago',
   comments: [
      mockComment,
      {
         ...mockComment,
         likes: 1,
      },
   ],
   likesCount: 2243,
   dateCreated: 'July 3, 2021',
}

export const Default: Story = {
   args: {
      post: mockPost,
   },
}
