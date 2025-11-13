import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CroppingModal } from '.'
import picture from './../../../../../../public/puc.jpg'
import picture1 from './../../../../../../public/404.jpg'
import picture2 from './../../../../../../public/logo-light.png'
import picture3 from './../../../../../../public/logo-dark.png'
import { useState } from 'react'

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
      onOpenChange: x => x,
      onNext: () => {},
   },
   render: args => {

      const [images, setImages] = useState([picture, picture1, picture2, picture3])
      const [currentIndex, setCurrentIndex] = useState(0)

    return <CroppingModal
       {...args}
      images={images}
       setImages={setImages}
       currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}

      />
   },
}
