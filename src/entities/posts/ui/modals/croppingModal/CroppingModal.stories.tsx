import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import picture1 from './../../../../../../public/404.jpg'
import picture2 from './../../../../../../public/logo-light.png'
import picture3 from './../../../../../../public/logo-dark.png'
import { useState } from 'react'
import { CroppingModal } from './'
import { fn } from 'storybook/test'

const meta = {
   component: CroppingModal,
   tags: ['autodocs'],
   title: 'Modals/CroppingModal',
} satisfies Meta<typeof CroppingModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      isOpen: true,
      onOpenChange: (x: boolean) => x,
      onNext: () => {},
      images: [],
      onBack: () => {},
      currentIndex: 0,
      setCurrentIndex: () => {},
      setImages: () => {},
   },
   render: () => {
      return <CropModalWrapper />
   },
}

const CropModalWrapper = () => {
   const [images, setImages] = useState([picture1, picture2, picture3])
   const [currentIndex, setCurrentIndex] = useState(0)

   return (
      <CroppingModal
         onNext={fn()}
         onOpenChange={fn()}
         onBack={fn()}
         isOpen
         images={images}
         setImages={setImages}
         currentIndex={currentIndex}
         setCurrentIndex={setCurrentIndex}
      />
   )
}
