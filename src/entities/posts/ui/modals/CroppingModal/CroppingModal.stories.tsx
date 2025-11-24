import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import picture1 from './../../../../../../public/404.jpg'
import picture2 from './../../../../../../public/logo-light.png'
import picture3 from './../../../../../../public/logo-dark.png'
import { useState } from 'react'
import { fn } from 'storybook/test'
import { PhotoState } from '@/features/post-creator/PostCreator'
import { CroppingModal } from './CroppingModal'

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
      onOpenChange: () => {},
      onNext: () => {},
      photos: [],
      onBack: () => {},
      currentIndex: 0,
      setCurrentIndex: () => {},
      onPhotosUpdate: () => {},
   },
   render: () => {
      return <CropModalWrapper />
   },
}

// Функция для создания mock File из статического изображения
const createMockFileFromStaticImage = (imageSrc: string, filename: string): File => {
   // В сторибуке мы не можем создать реальный File из статического импорта,
   // поэтому создаем mock объект с необходимыми свойствами
   return {
      name: filename,
      type: 'image/jpeg',
      size: 0,
      lastModified: Date.now(),
      arrayBuffer: async () => new ArrayBuffer(0),
      slice: () => new Blob(),
      stream: () => new ReadableStream(),
      text: async () => '',
   } as unknown as File
}

const CropModalWrapper = () => {
   const [photos, setPhotos] = useState<PhotoState[]>([
      {
         id: '1',
         currentFilter: 'filter-none',
         previewUrl: picture1.src,
         originalFile: createMockFileFromStaticImage(picture1.src, '404.jpg'),
         modifiedPreviewUrl: '',
         modifiedFile: null,
      },
      {
         id: '2',
         currentFilter: 'filter-none',
         previewUrl: picture2.src,
         originalFile: createMockFileFromStaticImage(picture2.src, 'logo-light.png'),
         modifiedPreviewUrl: '',
         modifiedFile: null,
      },
      {
         id: '3',
         currentFilter: 'filter-none',
         previewUrl: picture3.src,
         originalFile: createMockFileFromStaticImage(picture3.src, 'logo-dark.png'),
         modifiedPreviewUrl: '',
         modifiedFile: null,
      },
   ])
   const [currentIndex, setCurrentIndex] = useState(0)

   return (
      <CroppingModal
         onNext={fn()}
         onOpenChange={fn()}
         onBack={fn()}
         isOpen
         photos={photos}
         onPhotosUpdate={setPhotos}
         currentIndex={currentIndex}
         setCurrentIndex={setCurrentIndex}
      />
   )
}
