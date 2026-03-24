'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PostModal } from '@/shared/components/PostModal'
import { Button } from '@/shared/components/Button'
import { PostOutlineIcon } from '@/shared/icons'

const meta: Meta = {
   title: 'Modals/Settings/AddAvatarModal',
}

export default meta
type Story = StoryObj

export const AddAvatarModalStory: Story = {
   render: () => (
      <PostModal
         open={true}
         size="image-upload"
         headerText="Add a Profile Photo"
         headerVariant="close-only"
         contentColumns="one"
         className="flex flex-col items-center p-[24px]"
      >
         <div className="bg-dark-500 mt-[64px] mb-[60px] flex h-[228px] w-[222px] items-center justify-center rounded-xs">
            <PostOutlineIcon className="h-12 w-12" />
         </div>

         <div className="text-center">
            <Button>Select from Computer</Button>
         </div>
      </PostModal>
   ),
}
