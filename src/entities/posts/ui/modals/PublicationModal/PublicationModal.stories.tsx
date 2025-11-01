'use client'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Image from 'next/image'
import { Modal, ModalBody, ModalTitle } from '@/shared/components/Modal'
import { Button } from '@/shared/components/Button'
import { Typography } from '@/shared/components/Typography'
import { ArrowLeftIcon } from '@/shared/icons'

const meta: Meta = {
   title: 'Modals/PublicationModal',
}

export default meta
type Story = StoryObj

export const Publication: Story = {
   render: () => {
      const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']
      const onBack = () => alert('Back clicked')

      return (
         <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
            <Modal open={true} onOpenChange={onBack} className="w-full max-w-[972px]">
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

                     <Button type="submit" variant="textButton">
                        Publish
                     </Button>
                  </ModalTitle>

                  <hr className="text-dark-100 h-[1px]" />

                  <ModalBody className="flex flex-row">
                     <div className="relative h-[503px] w-[490px] bg-gray-900">
                        {images.length > 0 && (
                           <Image src={images[0]} alt="Post image" fill className="object-cover" />
                        )}
                     </div>
                     <div className="flex flex-1 items-center justify-center bg-gray-950 text-white">
                        Right content area
                     </div>
                  </ModalBody>
               </form>
            </Modal>
         </div>
      )
   },
}
