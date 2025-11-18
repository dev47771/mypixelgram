'use client'

import { Button } from '@/shared/components/Button'
import { Modal, ModalBody, ModalTitle } from '@/shared/components/Modal'
import { Slider } from '@/shared/components/Slider'
import { Typography } from '@/shared/components/Typography'
import { ArrowLeftIcon } from '@/shared/icons'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PublicationModal } from './PublicationModal'
import { useState } from 'react'
import { PhotoState } from '@/features/post-creator/PostCreator'
import { Provider } from 'react-redux'
import { store } from '@/shared/store'

const withRedux = (Story: any) => (
  <Provider store={store}>
    <Story />
  </Provider>
)

const meta: Meta = {
   title: 'Modals/PublicationModal',
   decorators: [withRedux], 
} 

export default meta
type Story = StoryObj

export const Publication: Story = {
   render: () => {
      const images = ['./public/404.jpg', './public/logo-light.png', './public/logo-dark.png']
      const onBack = () => alert('Back')

      return (
         <Modal open className="w-full max-w-[972px]">
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
         </Modal>
      )
   },
}


// export type PhotoState = {
//     id: string id: 1,
//     originalFile: File // Исходный файл
//     previewUrl: string // URL.createObjectURL(file)
//     currentFilter: string // Текущий активный фильтр
// }

export const PublicationModalStory: Story = {
   render: () => {

      const mockFile = new File([], 'placeholder.jpg', {
         type: 'image/jpeg'
      })

      const photos: PhotoState[] = [
         { id: '1', originalFile: mockFile, previewUrl: './public/404.jpg', currentFilter: 'filter-moon' },
         { id: '2', originalFile: mockFile, previewUrl: './public/logo-light.png', currentFilter: 'filter-moon' },
         { id: '3', originalFile: mockFile, previewUrl: './public/logo-dark.png', currentFilter: 'filter-moon' }
      ]

      const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

      return (
         <PublicationModal
            onBack={() => { }}
            photos={photos}
            onClose={() => { }}
            onSlideChange={setCurrentPhotoIndex}
            currentPhotoIndex={currentPhotoIndex}
         />
      )
   }
}