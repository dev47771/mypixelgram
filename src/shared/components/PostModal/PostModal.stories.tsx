import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostModal } from './PostModal'
import { PostOutlineIcon } from '@/shared/icons'
import { Button } from '../Button'
import Image from 'next/image'

const meta = {
   argTypes: {},
   component: PostModal,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   title: 'Components/PostModal',
} satisfies Meta<typeof PostModal>

export default meta
type Story = StoryObj<typeof meta>

export const AddPhoto: Story = {
   args: {
      size: 'image-upload',
      headerText: 'Add Photo',
      headerVariant: 'close-only',
      contentColumns: 'one',
      children: (
         <div className="flex flex-col gap-15 pt-[72px] pr-[135px] pb-[48px] pl-[135px]">
            <div
               className={
                  'bg-dark-500 flex h-[228px] w-[222px] items-center justify-center rounded-xs'
               }
            >
               <PostOutlineIcon className={'h-12 w-12'} />
            </div>
            <div className={'flex max-w-[219px] flex-col gap-6'}>
               <Button
               //onClick={addPhotoButtonHandler}
               >
                  Select from Computer
               </Button>
               <Button variant={'outlined'}>Open Draft</Button>
            </div>
            <input
               type="file"
               //ref={postPhotoRef}
               className={'hidden'}
               //onChange={fileLoaderHandler}
               //{...restPostPhoto}
            />
         </div>
      ),
   },
}

export const Cropping: Story = {
   args: {
      size: 'image-upload',
      headerText: 'Cropping',
      headerVariant: 'with-navigation',
      contentColumns: 'one',
      onBack: () => {},
      onNext: () => {},
      children: (
         <Image
            className="h-full w-full object-cover"
            src={`https://i.pinimg.com/736x/16/1f/7b/161f7b8d45c1e4fe4ad41fd42750de7a.jpg`}
            alt="Какая-то картинка"
            width={490}
            height={501}
            priority
         />
      ),
   },
}

export const Filters: Story = {
   args: {
      size: 'post-management',
      headerText: 'Filters',
      headerVariant: 'with-navigation',
      contentColumns: 'two',
      onBack: () => {},
      onNext: () => {},
      leftContent: (
         <Image
            className="h-full w-full object-cover"
            src={`https://i.pinimg.com/736x/16/1f/7b/161f7b8d45c1e4fe4ad41fd42750de7a.jpg`}
            alt="Какая-то картинка"
            width={490}
            height={501}
            priority
         />
      ),
      leftContentClassName: 'w-full h-full overflow-hidden rounded-[1px]',
      rightContent: (
         <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, eveniet voluptas
            pariatur hic distinctio ex nesciunt vitae quaerat fugiat expedita voluptatem ea eaque
            culpa fugit, dolor quod quibusdam dolorum harum.Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Sequi, eveniet voluptas pariatur hic distinctio ex nesciunt vitae
            quaerat fugiat expedita voluptatem ea eaque culpa fugit, dolor quod quibusdam dolorum
            harum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, eveniet voluptas
            pariatur hic distinctio ex nesciunt vitae quaerat fugiat expedita voluptatem ea eaque
            culpa fugit, dolor quod quibusdam dolorum harum.Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
         </div>
      ),
      rightContentClassName: 'p-5',
   },
}

export const Publication: Story = {
   args: {
      size: 'post-management',
      headerText: 'Publication',
      headerVariant: 'with-navigation',
      contentColumns: 'two',
      onBack: () => {},
      publish: () => {},
      leftContent: (
         <Image
            className="h-full w-full object-cover"
            src={`https://i.pinimg.com/736x/16/1f/7b/161f7b8d45c1e4fe4ad41fd42750de7a.jpg`}
            alt="Какая-то картинка"
            width={490}
            height={501}
            priority
         />
      ),
      leftContentClassName: 'w-full h-full overflow-hidden rounded-[1px]',
      rightContent: (
         <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, eveniet voluptas
            pariatur hic distinctio ex nesciunt vitae quaerat fugiat expedita voluptatem ea eaque
            culpa fugit, dolor quod quibusdam dolorum harum.Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Sequi, eveniet voluptas pariatur hic distinctio ex nesciunt vitae
            quaerat fugiat expedita voluptatem ea eaque culpa fugit, dolor quod quibusdam dolorum
            harum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, eveniet voluptas
            pariatur hic distinctio ex nesciunt vitae quaerat fugiat expedita voluptatem ea eaque
            culpa fugit, dolor quod quibusdam dolorum harum.Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
         </div>
      ),
      rightContentClassName: 'p-5',
   },
}

//для модалок MyPost и FriendPost
export const MyOrFriendPost: Story = {
   args: {
      size: 'post-management',
      contentColumns: 'two',
   },
}

export const EditPost: Story = {
   args: {
      size: 'post-management',
      headerText: 'Edit Post',
      headerVariant: 'close-only',
      contentColumns: 'two',
   },
}

export const AddProfilePhoto: Story = {
   args: {
      size: 'image-upload',
      headerText: 'Add a Profile Photo',
      headerVariant: 'close-only',
      contentColumns: 'one',
   },
}

export const AddProfilePhotoCropping: Story = {
   args: {
      size: 'profile-crop',
      headerText: 'Add a Profile Photo',
      headerVariant: 'close-only',
      contentColumns: 'one',
   },
}

//для модалок Subscribers, Followers, Likes
export const SubscribersFollowersLikes: Story = {
   args: {
      size: 'social-list',
      headerText: 'Likes',
      headerVariant: 'close-only',
      contentColumns: 'one',
   },
}
