'use client'

import { Button } from '@/shared/components/Button'
import { ModalBody, ModalTitle } from '@/shared/components/Modal'
import { PostModal } from '@/shared/components/PostModal'
import { Slider } from '@/shared/components/Slider'
import { Typography } from '@/shared/components/Typography'
import { ArrowLeftIcon } from '@/shared/icons'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta = {
   title: 'Modals/PublicationModal',
}

export default meta
type Story = StoryObj

export const Publication: Story = {
   render: () => {
      const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']
      const onBack = () => alert('Back')

      return (
         <PostModal
            size="post-management"
            headerText="Publication"
            headerVariant="with-navigation"
            contentColumns="two"
            rightContentClassName="p-5"
         >
            <form>
               <ModalTitle className="flex items-center justify-between px-[0px]">
                  <Button
                     variant="textButton"
                     className="text-light-100"
                     type="button"
                     onClick={onBack}
                  >
                     <ArrowLeftIcon />
                  </Button>

                  <Typography variant="h1">Publication</Typography>

                  <Button type="button" variant="textButton" onClick={() => alert('Publish')}>
                     Publish
                  </Button>
               </ModalTitle>

               <hr className="text-dark-100 h-[1px]" />

               <ModalBody className="flex flex-row">
                  <Slider images={images} className={'h-[501px] w-[490px]'} />
                  <div className="flex flex-1 items-center justify-center bg-gray-950 text-white">
                     Right content area
                  </div>
               </ModalBody>
            </form>
         </PostModal>
      )
   },
}
