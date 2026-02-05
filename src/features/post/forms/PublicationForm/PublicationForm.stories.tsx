import { PhotoState } from '@/features/post-creator/PostCreator'
import { PublicationForm } from '@/features/post/forms/PublicationForm'
import { Modal } from '@/shared/components/Modal'
import { store } from '@/shared/store'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Provider } from 'react-redux'

// Создаем компонент-обёртку с состоянием
const PublicationFormWithState = () => {
   const onBack = () => alert('Back')
   const isLoading = false
   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

   const mockFile = new File([], 'placeholder.jpg', {
      type: 'image/jpeg',
   })

   const photos: PhotoState[] = [
      {
         id: '1',
         originalFile: mockFile,
         previewUrl: './public/404.jpg',
         modifiedFile: null,
         modifiedPreviewUrl: '',
         currentFilter: 'filter-moon',
      },
      {
         id: '2',
         originalFile: mockFile,
         previewUrl: './public/logo-light.png',
         modifiedFile: null,
         modifiedPreviewUrl: '',
         currentFilter: 'filter-moon',
      },
      {
         id: '3',
         originalFile: mockFile,
         previewUrl: './public/logo-dark.png',
         modifiedFile: null,
         modifiedPreviewUrl: '',
         currentFilter: 'filter-moon',
      },
   ]

   return (
      <Modal open className="w-full max-w-[972px]">
         <PublicationForm
            onSubmit={async () => alert('Publish')}
            onBack={onBack}
            isLoading={isLoading}
            images={photos.map(photo => photo.previewUrl)}
            filters={photos.map(photo => photo.currentFilter)}
            onSlideChange={setCurrentPhotoIndex}
            currentSlide={currentPhotoIndex}
         />
      </Modal>
   )
}

const meta: Meta<typeof PublicationFormWithState> = {
   title: 'Forms/PublicationForm',
   component: PublicationFormWithState,
   decorators: [
      Story => (
         <Provider store={store}>
            <Story />
         </Provider>
      ),
   ],
}

export default meta
type Story = StoryObj<typeof PublicationFormWithState>

export const Default: Story = {
   render: () => <PublicationFormWithState />,
}
